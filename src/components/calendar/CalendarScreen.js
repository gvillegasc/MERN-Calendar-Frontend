import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/es';
import { NavBar } from '../ui/NavBar';
import { messages } from '../../helpers/calendar-messages-es';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';
import { useDispatch, useSelector } from 'react-redux';
import { uiOpenModal } from '../../actions/ui';
import { eventSetActive, eventClearActiveEvent } from '../../actions/events';
import { AddNewFab } from '../ui/AddNewFab';
import { DeleteEventFab } from '../ui/DeleteEventFab';

moment.locale('es');
const localizer = momentLocalizer(moment);

// const events = [
// 	{
// 		title: 'cumpleaños del jefe',
// 		start: moment().toDate(),
// 		end: moment().add(2, 'hours').toDate(),
// 		bgcolor: '#FAFAFA',
// 		notes: 'Comprar el pastel',
// 		user: {
// 			_id: '123',
// 			name: 'Luis',
// 		},
// 	},
// ];

export const CalendarScreen = () => {
	const dispatch = useDispatch();

	const { activeEvent } = useSelector((state) => state.calendar);

	const { events } = useSelector((state) => state.calendar);

	const [lastView, setLastView] = useState(
		localStorage.getItem('lastView') || 'month'
	);

	const onDoubleClick = (e) => {
		dispatch(uiOpenModal());
	};

	const onSelectedEvent = (e) => {
		dispatch(eventSetActive(e));
	};

	const onViewChange = (e) => {
		setLastView(e);
		localStorage.setItem('lastView', e);
	};

	const onSelectSlot = (e) => {
		dispatch(eventClearActiveEvent());
	};

	const eventStyleGetter = (event, start, end, isSelected) => {
		const style = {
			backgroundColor: '#367CF7',
			borderRadius: '0px',
			opacity: 0.8,
			display: 'block',
			color: 'white',
		};
		return {
			style,
		};
	};

	return (
		<div className="calendar-screen">
			<NavBar />
			<Calendar
				localizer={localizer}
				events={events}
				startAccessor="start"
				endAccessor="end"
				messages={messages}
				eventPropGetter={eventStyleGetter}
				onDoubleClickEvent={onDoubleClick}
				onSelectEvent={onSelectedEvent}
				onView={onViewChange}
				onSelectSlot={onSelectSlot}
				selectable={true}
				view={lastView}
				components={{
					event: CalendarEvent,
				}}
			/>
			<AddNewFab />

			{activeEvent && <DeleteEventFab />}

			<CalendarModal />
		</div>
	);
};
