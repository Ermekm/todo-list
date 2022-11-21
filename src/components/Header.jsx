import React from 'react'
import './Header.css'

const Header = ({ setIsModalVisible }) => {
    return (
        <header className='header'>
            <div className='wrapper'>
                <div className='header__wrap'>
                    <h1 className='header__title'>Todo list</h1>
                    <button
                        className='header__create-todo btn'
                        onClick={() => { 
                            console.log(true)
                            setIsModalVisible(true) }}
                    >Добавить задачу</button>
                </div>
            </div>
        </header >
    )
}

export default Header
