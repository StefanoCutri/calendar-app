import React, { useState } from 'react';

import {Calendar, momentLocalizer} from 'react-big-calendar';
import moment from 'moment';

import 'react-big-calendar/lib/css/react-big-calendar.css'

import { Navbar } from '../ui/Navbar';
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';
import { useDispatch, useSelector } from 'react-redux';
import { uiOpenModal } from '../actions/ui';
import {RemoveActive, SetActive} from '../actions/events'
import { AddNewFab } from '../ui/AddNewFab';
import { DeleteEventFab } from '../ui/DeleteEventFab';


const localizer = momentLocalizer(moment) // or globalizeLocalizer;


const eventStyleGetter = (event, start, end, isSelected) => {
    
    const style = {
        backgroundColor:'367CF7',
        borderRadius: '0px',
        opacity: 0.8,
        display: 'block',
        color: 'white'
    }
    
    return {
        style
    }
};


export const CalendarScreen = () => {
    
    const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month');
    const dispatch = useDispatch();

    const {events, activeEvent} = useSelector(state => state.calendar);

    const onDoubleClick = (e) => {
        dispatch(uiOpenModal())
    }

    const onSelectEvent = (e) => {
        dispatch(SetActive(e));
    }
    
    const onViewChange = (e) => {

        setLastView(e)
        localStorage.setItem('lastView', e)

    }
    
    const onSelectSlot = (e) => {
        dispatch(RemoveActive())
    }



    return (
        <div className='calendar-screen'>
            <Navbar/>

            <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            eventPropGetter={eventStyleGetter}
            onDoubleClickEvent={onDoubleClick}
            onSelectEvent={onSelectEvent}
            onSelectSlot={onSelectSlot}
            selectable={true}
            onView={onViewChange}
            view={lastView}
            components={{
                event: CalendarEvent
            }}

            />

            {
                (activeEvent) && <DeleteEventFab/>
            }
                
                <AddNewFab/>

            <CalendarModal/>
        </div>
    )
}