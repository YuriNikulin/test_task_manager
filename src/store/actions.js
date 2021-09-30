import * as TYPES from './types'
import request from '../api'
import { getState } from '../App'
import { notification } from 'antd'
import { defineNewStatus, isAdmin, sleep } from '../utils'
import { TASK_STATUS, TOKEN_KEY, USER_KEY } from '../constants'
import Cookies from 'js-cookie'

export const fetchData = (payload) => async (_, dispatch) => {
    const onError = (e) => {
        dispatch({
            type: TYPES.FETCH_DATA_ERROR
        })
    }

    
    const state = getState()
    const options = {
        resetPagination: false,
        resetFilters: false,
        ...payload.options
    }

    dispatch({
        type: TYPES.FETCH_DATA_REQUEST
    })

    try {
        const queryParams = {}
        queryParams.page = !options.resetPagination ? state.page : 1

        if (state.sort.key) {
            queryParams.sort_field = state.sort.key
            queryParams.sort_direction = state.sort.value
        }

        const res = await request('/', {
            method: 'GET',
            queryParams,
            onError: (e) => onError(e),
            onSuccess: (e) => {
                dispatch({
                    type: TYPES.FETCH_DATA_SUCCESS,
                    payload: e
                })
            }
        })
    } catch(e) {
        onError(e)
    }
}

export const togglePutModal = ({ data, show }) => (state, dispatch) => {
    dispatch({
        type: TYPES.TOGGLE_PUT_MODAL,
        payload: {
            show,
            data
        }
    })
}

export const logout = () => (_, dispatch) => {
    Cookies.remove(TOKEN_KEY)
    localStorage.removeItem(USER_KEY)
    updateCurrentUser()(_, dispatch)
}

export const toggleAuthModal = (payload) => async (_, dispatch) => {
    dispatch({
        type: TYPES.TOGGLE_AUTH_MODAL,
        payload
    })
}

export const putTask = ({ data, completed, task }) => async (_, dispatch) => {
    dispatch({
        type: TYPES.PUT_TASK_REQUEST
    })

    const onError = (payload) => {
        dispatch({
            type: TYPES.PUT_TASK_ERROR,
            payload
        })
    }

    const isEdit = task !== undefined
    let url = isEdit ? `/edit/${task.id}` : '/create'
    let _data = data

    if (isEdit) {
        if (completed !== undefined) {
            _data = {
                status: defineNewStatus({ task, completed })
            }
        } else {
            _data = {
                ...data,
                status: defineNewStatus({ task, edited: true })
            }
        }
    }

    try {
        const res = await request(url, {
            body: _data,
            method: 'POST',
            onSuccess: (res) => {
                dispatch({
                    type: TYPES.PUT_TASK_SUCCESS,
                    payload: {
                        response: res,
                        isEdit
                    }
                })
                notification.success({
                    message: `${isEdit ? 'Редактирование' : 'Создание'} задачи`,
                    description: `Задача успешно ${isEdit ? 'отредактирована' : 'создана'}`
                })

                if (isEdit) {
                    fetchData({})(_, dispatch)
                }
            },
            onError: (res) => {
                onError(res)
                const isAuthError = 'token' in res
                let description = 'Не удалось сохранить задачу.'
                if (isAuthError) {
                    description += '\nНеобходимо авторизоваться.'
                }
                notification.error({
                    message: `Ошибка`,
                    description
                })

                if (isAuthError) {
                    logout()(_, dispatch)
                    toggleAuthModal()(_, dispatch)
                }
            }
        })
    } catch(e) {
        onError()
    }
}

export const resetFieldError = (payload) => (_, dispatch) => {
    dispatch({
        type: TYPES.RESET_FIELD_ERROR,
        payload
    })
}

export const changePagination = (payload) => async (_, dispatch) => {
    dispatch({
        type: TYPES.CHANGE_PAGINATION,
        payload
    })

    await sleep(5)
    fetchData({})(_, dispatch)
}

export const changeSort = (payload) => async (_, dispatch) => {
    dispatch({
        type: TYPES.CHANGE_SORT,
        payload
    })

    await sleep(5)
    fetchData({})(_, dispatch)
}

export const updateCurrentUser = () => (_, dispatch) => {
    try {
        const user = JSON.parse(localStorage.getItem(USER_KEY))
        if (user) {
            dispatch({
                type: TYPES.SET_CURRENT_USER,
                payload: {
                    ...user,
                    isAdmin: isAdmin(user),
                    isLogged: true
                }
            })
        } else {
            throw new Error()
        }
    } catch(e) {
        dispatch({
            type: TYPES.SET_CURRENT_USER,
            payload: null
        })
    }
}

export const authorize = (payload) => async (_, dispatch) => {
    dispatch({
        type: TYPES.AUTHORIZE_REQUEST
    })

    const onError = (payload) => {
        dispatch({
            type: TYPES.AUTHORIZE_ERROR,
            payload
        })
    }

    try {
        await request('/login', {
            body: payload.data,
            method: 'POST',
            onSuccess: (res) => {
                dispatch({
                    type: TYPES.AUTHORIZE_SUCCESS,
                    payload: res
                })
                notification.success({
                    message: 'Авторизация',
                    description: 'Авторизация успешно выполнена'
                })
                localStorage.setItem(USER_KEY, JSON.stringify({
                    username: payload.data.username
                }))
                Cookies.set(TOKEN_KEY, res.token)
                updateCurrentUser()(_, dispatch)
            },
            onError: (res) => {
                onError(res)
            }
        })
    } catch(e) {
        onError()
    }
}
