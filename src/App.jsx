import React, { useContext, createContext, useReducer } from 'react';
import { initialState, reducer } from './store/reducer';
import Container from './components/Container'

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

    return (
        <AppStateContext.Provider value={[state, _dispatch]}>
            <Container />
        </AppStateContext.Provider>
    )
}

export default App;
