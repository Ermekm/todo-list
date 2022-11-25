import React, { useMemo } from 'react'
import cl from './MyModal.module.css'

const MyModal = ({ children, isModalVisible, setIsModalVisible }) => {

    let modalClasses = useMemo(() => {
        return (isModalVisible ? [cl.MyModal, cl.active] : [cl.MyModal]).join(' ')
    }, [isModalVisible])

    return (
        <div className={modalClasses} onClick={() => setIsModalVisible(false)}>
            <div className={cl.MyModalContent} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    )
}

export default MyModal