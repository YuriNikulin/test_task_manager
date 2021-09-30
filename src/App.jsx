import React, { useContext, createContext, useReducer, useEffect } from 'react';
import { initialState, reducer } from './store/reducer';
import Container from './components/Container'
import { updateCurrentUser } from './store/actions';

const AppState = {
    loading: false
}

export const AppStateContext = createContext()
export const useStore = () => useContext(AppStateContext)
export let getState

const App = () => {
    const [state, dispatch] = useReducer(reducer, initialState)

    const _dispatch = (fn) => {
        dispatch(fn(state, dispatch))
    }

    getState = () => state

    useEffect(() => {
        _dispatch(updateCurrentUser())
    }, [])

    return (
        <AppStateContext.Provider value={[state, _dispatch]}>
            <Container />
        </AppStateContext.Provider>
    )
}

export default App;
