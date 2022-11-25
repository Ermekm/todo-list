import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Header.css'

const Header = () => {
    const navigate = useNavigate();



    return (
        <header className='header'>
            <div className='wrapper'>
                <div className='header__wrap'>
                    <h1
                        className='header__title btn'
                        onClick={() => { navigate('/') }}
                    >Todo list</h1>
                </div>
            </div>
        </header >
    )
}

export default Header
