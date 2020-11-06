import React, { useContext, useEffect } from "react"
import { modalsContext } from "../context/modalsContext.js"
import useHover from "../hooks/useHover.js"

export default function({ children }) {
  const { setCurrentModal } = useContext(modalsContext)
  const [ isHovered, hoverRef ] = useHover()

  const closeModal = () => setCurrentModal()

  useEffect(() => {
    const handleKeyPress = event => {
      if(event.key === "Escape" || event.keyCode === 27) closeModal()
    }

    window.addEventListener('keydown', handleKeyPress)

    return () => {
      window.removeEventListener('keydown', handleKeyPress)
    }
  }, [])

  return (
      <div className="modal-container">
        <div className="modal">
          <i ref={hoverRef} className={`btn-close-modal interactive ${isHovered ? "ri-close-circle-fill" : "ri-close-circle-line"}`} onClick={closeModal} />
          {children}
        </div>
      </div>
    )
}