import * as TYPES from './types'

export const initialState = {
    loading: false,
    shouldScrollTop: false,
    data: {
        tasks: []
    },
    sort: {},
    page: 1,
    putModal: {
        show: false,
        // data: {},
        data: {
            username: 'user',
            email: 'user@example.com',
            text: 'some text'
        },
        errors: {},
        loading: false,
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
                data: {
                    ...state.data,
                    tasks: [
                        ...state.data.tasks,
                        action.payload
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
                putModal: {
                    ...state.putModal,
                    errors: {
                        ...state.putModal.errors,
                        [action.payload]: false
                    }
                }
            }

        case TYPES.CHANGE_PAGINATION:
            return {
                ...state,
                page: action.payload
            }

        default:
            return state
    }
}