import React, { useContext } from 'react'
import { modalsContext } from '../context/modalsContext'
import NicknameModal from '../containers/NicknameModal'

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