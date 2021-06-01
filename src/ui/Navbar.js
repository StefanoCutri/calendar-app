import React from 'react'
import './ui.css'

export const Navbar = () => {
    return (
        <div className='navbar navbar-dark bg-dark'>

            <span className='navbar-brand'>Stefano</span>

            <button className='btn btn-outline-danger'>
                <i className="fas fa-sign-out-alt logout-icon"></i>
                <span >Log out</span>
            </button>


        </div>
    )
}
