import React from 'react';
import { Provider } from 'react-redux';

import { store } from './store/store';
import { AppRoute } from './routes/AppRoute';

export const CalendarApp = () => {
	return (
		<Provider store={store}>
			<AppRoute />
		</Provider>
	);
};
