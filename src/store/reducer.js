import * as TYPES from './types'

export const initialState = {
    loading: false,
    shouldScrollTop: false,
    data: {
        tasks: []
    },
    sort: {},
    page: 1,
    currentUser: {
        isLogged: false,
        username: undefined,
        isAdmin: undefined
    },
    putModal: {
        show: false,
        data: {},
        // data: {
        //     username: 'user',
        //     email: 'user@example.com',
        //     text: 'some text'
        // },
        errors: {},
        loading: false,
    },
    authModal: {
        show: false,
        loading: false,
        errors: {}
    }
}

export const reducer = (state = initialState, action) => {
    if (!action?.type) {
        return state
    }

    switch (action.type) {
        case TYPES.FETCH_DATA_REQUEST:
            return {
                ...state,
                loading: true
            }

        case TYPES.FETCH_DATA_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload
            }

        case TYPES.FETCH_DATA_ERROR:
            return {
                ...state,
                loading: false
            }

        case TYPES.TOGGLE_PUT_MODAL:
            return {
                ...state,
                putModal: {
                    show: action.payload.show,
                    data: action.payload.data || initialState.putModal.data,
                    errors: initialState.putModal.errors
                },
            }

        case TYPES.PUT_TASK_REQUEST:
            return {
                ...state,
                putModal: {
                    ...state.putModal,
                    loading: true,
                    errors: initialState.putModal.errors
                }
            }

        case TYPES.PUT_TASK_SUCCESS:
            return {
                ...state,
                putModal: initialState.putModal,
                data: action.payload.isEdit ? state.data : {
                    ...state.data,
                    tasks: [
                        ...state.data.tasks,
                        action.payload.response
                    ]
                }
            }

        case TYPES.PUT_TASK_ERROR:
            return {
                ...state,
                putModal: {
                    ...state.putModal,
                    loading: false,
                    errors: action.payload || {}
                }
            }

        case TYPES.RESET_FIELD_ERROR:
            return {
                ...state,
                [action.payload.form]: {
                    ...state[action.payload.form],
                    errors: {
                        ...state[action.payload.form].errors,
                        [action.payload.key]: false
                    }
                }
            }

        case TYPES.CHANGE_PAGINATION:
            return {
                ...state,
                page: action.payload
            }

        case TYPES.TOGGLE_AUTH_MODAL:
            return {
                ...state,
                authModal: {
                    ...initialState.authModal,
                    show: action.payload !== undefined ? action.payload.show : !state.authModal.show
                }
            }

        case TYPES.AUTHORIZE_REQUEST:
            return {
                ...state,
                authModal: {
                    ...state.authModal,
                    loading: true
                }
            }

        case TYPES.AUTHORIZE_SUCCESS:
            return {
                ...state,
                authModal: initialState.authModal
            }

        case TYPES.AUTHORIZE_ERROR:
            return {
                ...state,
                authModal: {
                    ...state.authModal,
                    loading: false,
                    errors: action.payload || {}
                }
            }

        case TYPES.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: action.payload || initialState.currentUser
            }

        case TYPES.CHANGE_SORT:
            const newValue = state.sort.key === action.payload && state.sort.value === 'desc' ? 'asc' : 'desc'
            return {
                ...state,
                sort: {
                    key: action.payload,
                    value: newValue
                }
            }

        default:
            return state
    }
}