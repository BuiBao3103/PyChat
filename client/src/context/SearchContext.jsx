import React, { createContext, useReducer } from 'react';

// Define the initial state for the search reducer
const initialState = {
	searchValues: [],
};

// Define the reducer function
const searchReducer = (state, action) => {
	switch (action.type) {
		case 'SET_SEARCH_VALUE':
			return {
				...state,
				searchValues: [...state.searchValues, action.payload],
			};
		default:
			return state;
	}
};

// Create the search context
export const SearchContext = createContext();

// Create the search context provider component
export const SearchProvider = ({ children }) => {
	const [state, dispatch] = useReducer(searchReducer, initialState);

	// Define the actions
	const setSearchValue = (value) => {
		dispatch({
			type: 'SET_SEARCH_VALUE',
			payload: value,
		});
	};

	// Provide the state and actions to the children components
	return (
		<SearchContext.Provider value={{ searchValues: state.searchValues, setSearchValue }}>
			{children}
		</SearchContext.Provider>
	);
};