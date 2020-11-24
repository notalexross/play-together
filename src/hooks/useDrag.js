import { useState, useRef, useEffect } from 'react'

export default function useDrag(parentRef, { restrictToParent = true } = {}) {
  const [ items, setItems ] = useState([])
  const [ count, setCount ] = useState(0)
  const defaultRef = useRef(null)

  parentRef = parentRef || defaultRef

  useEffect(() => {
    parentRef.current.style.position = 'relative'
  }, [])

  const getRelativePosition = (mouseX, mouseY) => {
    const parentRect = parentRef.current.getBoundingClientRect()
    const relativeX = (mouseX - parentRect.left) / parentRect.width * 100
    const relativeY = (mouseY - parentRect.top) / parentRect.height * 100
    return [relativeX, relativeY]
  }

  const updateItem = item => {
    setItems(children => ([
      ...children.filter(child => child.dragId !== item.dragId),
      item
    ]))
  }

  let movingItem
  
  const handleMouseMove = event => {
    event.preventDefault()
    const mouseX = event.clientX || event.touches[0].clientX
    const mouseY = event.clientY || event.touches[0].clientY
    const [positionX, positionY] = getRelativePosition(mouseX, mouseY)
    movingItem = { ...movingItem, positionX, positionY, isBeingDragged: true }
    updateItem(movingItem)
  }

  const handleMouseUp = (event) => {
    console.log('mouse up')
    event.preventDefault()
    window.removeEventListener('mousemove', handleMouseMove)
    window.removeEventListener('touchmove', handleMouseMove)

    if (restrictToParent && (movingItem.positionX > 100 || movingItem.positionX < 0 || movingItem.positionY > 100 || movingItem.positionY < 0)) {
      removeDragItem(movingItem)
    } else {
      movingItem = { ...movingItem, isBeingDragged: false}
      updateItem(movingItem)
    }
  }

  const drag = (item, mouseX, mouseY, isTouch) => {
    const [positionX, positionY] = getRelativePosition(mouseX, mouseY)
    movingItem = { ...item, positionX, positionY, isBeingDragged: true }
    updateItem(movingItem)

    console.log('adding event listeners')
    // TODO the touchstart event triggers before hold down menu (right click) triggers... so these listeners are here after the delete happens

    if (isTouch) {
      window.addEventListener('touchmove', handleMouseMove)
      window.addEventListener('touchend', handleMouseUp, { once: true})
    } else {
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseup', handleMouseUp, { once: true})
    }
  }

  const cancelTracking = () => {
    // TODO this doesn't work?? for either up end or move
    // is it because of "let movingItem" defined outside?
    // or could be because handleMouseMove no longer defined at same point in memory since useDrag called again.
    // add a contextmenu listener within drag instead?
    // just switch to context...
    console.log('removing event listener')
    window.removeEventListener('mousemove', handleMouseMove)
    window.removeEventListener('touchmove', handleMouseMove)
    window.removeEventListener('mouseup', handleMouseUp, { once: true})
    window.removeEventListener('touchend', handleMouseUp, { once: true})
  }

  const addDragItem = (item, startX, startY, isTouch) => {
    const [startRelativeX, startRelativeY] = getRelativePosition(startX, startY)
    const newItem = { ...item, dragId: count, positionX: startRelativeX, positionY: startRelativeY }
    setCount(count => count + 1)
    setItems(prev => [ ...prev, newItem ])

    drag(newItem, startX, startY, isTouch)
  }

  const removeDragItem = componentData => {
    setItems(children => children.filter(child => child.dragId !== componentData.dragId))
  }

  const clearDragItems = () => {
    setItems([])
  }

  return { parentRef, items, addDragItem, drag, removeDragItem, clearDragItems, cancelTracking }

}