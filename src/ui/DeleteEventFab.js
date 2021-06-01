import React from 'react'
import { useDispatch } from 'react-redux'
import { DeleteEvent } from '../actions/events';

export const DeleteEventFab = () => {

    const dispatch = useDispatch();

    const handleDelete = () => {
        dispatch(DeleteEvent());
    }

    return (
        <button 
        className='btn btn-danger fab-danger'
        onClick={handleDelete}
        >
            <i class="far fa-trash-alt"></i>
            <span>Delete</span>
        </button>
    )
}
