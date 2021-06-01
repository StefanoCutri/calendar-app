import React from 'react'
import { useSelector } from 'react-redux';

export const CalendarEvent = ( {event} ) => {

    const {events} = useSelector(state => state.calendar)

    // const name = events[0].user.name;

    const {title, user} = event;

    // console.log(user.name);


    return (
        <div>
            <span> {title} </span>
            <strong> {user.name} </strong>
        </div>
    )
}
