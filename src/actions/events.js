import { types } from "../types/types";

export const addNewEvent = (event) => ({
    type: types.eventNewAdd,
    payload: event
});

export const SetActive = (event) => ({
    type: types.eventSetActive,
    payload: event
});

export const RemoveActive = () => ({
    type: types.enventRemoveActive,
});

export const UpdateEvent = (event) => ({
    type: types.eventUpdated,
    payload: event
});

export const DeleteEvent = () => ({
    type: types.eventDeleted,
});