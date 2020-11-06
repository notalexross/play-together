import React, { useContext } from "react"
import { modalsContext } from "../context/modalsContext.js"
import NicknameModal from "../components/NicknameModal.js"

export default function() {
    const { setCurrentModal } = useContext(modalsContext)
    
    const closeModal = () => {
        setCurrentModal()
    }

    const displayNicknameModal = (onComplete = () => {}) => {
        setCurrentModal(<NicknameModal onComplete={() => {
            closeModal()
            onComplete()
        }} />)
    }

    return { displayNicknameModal }
}