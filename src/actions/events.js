import { types } from '../types/types';
import { fetchWithToken } from '../helpers/fetch';

export const eventStartAddNew = (event) => {
	return async (dispatch, getState) => {
		const { uid, name } = getState().auth;
		try {
			const resp = await fetchWithToken('events', event, 'POST');
			const body = await resp.json();
			if (body.ok) {
				event.id = body.evento.id;
				event.user = {
					_id: uid,
					name,
				};
				dispatch(eventAddNew(event));
			}
		} catch (err) {
			console.log(err);
		}
	};
};

const eventAddNew = (event) => ({
	type: types.eventAddNew,
	payload: event,
});

export const eventSetActive = (event) => ({
	type: types.eventSetActive,
	payload: event,
});

export const eventClearActiveEvent = () => ({
	type: types.eventClearActiveEvent,
});

export const eventUpdated = (event) => ({
	type: types.eventUpdated,
	payload: event,
});

export const eventDeleted = (event) => ({
	type: types.eventDeleted,
});
