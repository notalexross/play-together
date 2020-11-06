import React from "react"
import useHover from "../hooks/useHover.js"
import useModal from "../hooks/useModal.js"

export default function() {
  const [ isHovered, hoverRef ] = useHover()
  const { displayNicknameModal } = useModal()

  return (
    <>
      <i ref={hoverRef} className={`interactive ${isHovered ? "ri-edit-box-fill" : "ri-edit-box-line"}`} onClick={() => displayNicknameModal()} />
    </>
  )
}