import { types } from '../types/types';

const initialState = {
	modelOpen: false,
};

export const uiReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.uiOpenModal:
			return { ...state, modelOpen: true };

		default:
			return state;
	}
};
