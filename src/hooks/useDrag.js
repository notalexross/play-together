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

  const drag = (item, mouseX, mouseY) => {
    const [positionX, positionY] = getRelativePosition(mouseX, mouseY)
    let movingItem = { ...item, positionX, positionY }
    updateItem(movingItem)

    const handleMouseMove = event => {
      const [positionX, positionY] = getRelativePosition(event.clientX, event.clientY)
      movingItem = { ...item, positionX, positionY }
      updateItem(movingItem)
    }

    window.addEventListener('mousemove', handleMouseMove)

    window.addEventListener('mouseup', () => {
      window.removeEventListener('mousemove', handleMouseMove)
      if (restrictToParent && (movingItem.positionX > 100 || movingItem.positionX < 0 || movingItem.positionY > 100 || movingItem.positionY < 0)) {
        removeDragItem(movingItem)
      }
    }, { once: true})

  }

  const addDragItem = (componentData, startX, startY) => {
    const [startRelativeX, startRelativeY] = getRelativePosition(startX, startY)
    const newComponentData = { ...componentData, dragId: count, positionX: startRelativeX, positionY: startRelativeY }
    setCount(count => count + 1)
    setItems(prev => [ ...prev, newComponentData ])

    drag(newComponentData, startX, startY)
  }

  const removeDragItem = componentData => {
    setItems(children => children.filter(child => child.dragId !== componentData.dragId))
  }

  const clearDragItems = () => {
    setItems([])
  }

  return { parentRef, items, addDragItem, drag, removeDragItem, clearDragItems }

}