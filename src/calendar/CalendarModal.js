import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';

import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment';
import Swal from 'sweetalert2'

import {customStyles} from '../components/helpers/centredModal'
import { uiCloseModal } from '../actions/ui';
import { addNewEvent, RemoveActive, SetActive, UpdateEvent } from '../actions/events';

Modal.setAppElement('#root');

const now = moment().minutes(0).seconds(0).add( 1,'hours');

let nowPlus1 = now.clone().add(1, 'hours');

const initEvent = {
    title: '',
    notes: '',
    start:now.toDate() ,
    end: nowPlus1.toDate()
}


export const CalendarModal = () => {

    const [startingDate, setStartingDate] = useState(now.toDate());
    const [endingDate, setEndingDate] = useState(nowPlus1.toDate());
    const [validTitle, setValidTitle] = useState(true);

    const dispatch = useDispatch();
    const {isModalOpen} = useSelector(state => state.ui)
    const {activeEvent} = useSelector(state => state.calendar)


    const [formValues, setFormValues] = useState(initEvent);

    const {title, notes, start, end} = formValues;
   
    useEffect(() => {
        
        if (activeEvent) {
            setFormValues(activeEvent)
        } else {
            setFormValues(initEvent)
        }

    }, [activeEvent, setFormValues])

    const handleInputChange = ({target}) => {
        
        setFormValues({
            ...formValues,
            [target.name]: target.value
        })
    }
    const closeModal = () => {
        
        setFormValues(initEvent);
        dispatch(RemoveActive())
        dispatch(uiCloseModal());
        
    }

    const handleStartingDate = (e) => {
        setStartingDate(e)
        setFormValues({
            ...formValues,
            start: e
        })
    }

    const handleEndingDate = (e) => {
        setEndingDate(e)
        setFormValues({
            ...formValues,
            end: e
        })
    }


    const handleSubmit = (e) => {
        e.preventDefault();

        const momentStart = moment(start);
        const momentEnd = moment(end);

        if (momentStart.isSameOrAfter(momentEnd)) {
          return  Swal.fire('Error', 'Starting date should be greater than ending date', 'error')
        }

        if (title.trim() < 3) {
            return setValidTitle(false);
        }

        if (activeEvent) {
            dispatch(UpdateEvent(formValues))
        } else {

            dispatch(addNewEvent({
                ...formValues,
                id: new Date().getTime(),
                user: {
                    _id: '123',
                    name: 'Stefano'
                }
            }))

        }


        setValidTitle(true);
        closeModal();

    }

    return (
        <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={customStyles}
        closeTimeoutMS={200}
        className='modal'
        overlayClassName='modal-fondo'
    >

            <h1> {(activeEvent) ? 'Edit event' : 'New Event'} </h1>
            <hr />
            <form 
                className="container"
                onSubmit={handleSubmit}
            >

                <div className="form-group">
                    <label>Starting date and time</label>

                    <DateTimePicker
                        onChange={handleStartingDate}
                        value={start}
                        className='form-control'
                    />
                </div>

                <div className="form-group">
                    <label>Ending date and time</label>
                    <DateTimePicker
                        onChange={handleEndingDate}
                        value={end}
                        className='form-control'
                        minDate={start}
                    />
                </div>

                <hr />
                <div className="form-group">
                    <label>Title and noets</label>
                    <input 
                        type="text" 
                        className={`form-control ${!validTitle && 'is-invalid'} `}
                        placeholder="Event title"
                        name="title"
                        autoComplete="off"
                        value={title}
                        onChange={handleInputChange}
                    />
                    <small id="emailHelp" className="form-text text-muted">Short description</small>
                </div>

                <div className="form-group">
                    <textarea 
                        type="text" 
                        className="form-control"
                        placeholder="Notes"
                        rows="5"
                        name="notes"
                        value={notes}
                        onChange={handleInputChange}
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Aditional info</small>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Save</span>
                </button>

            

            </form>

    </Modal>
    )
}
