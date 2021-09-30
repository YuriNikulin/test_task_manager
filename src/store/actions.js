import * as TYPES from './types'
import request from '../api'
import { getState } from '../App'
import { notification } from 'antd'
import { sleep } from '../utils'

export const fetchData = (payload) => async (_, dispatch) => {
    const onError = (e) => {
        console.log(e)
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

export const putTask = (payload) => async (_, dispatch) => {
    dispatch({
        type: TYPES.PUT_TASK_REQUEST
    })

    const onError = (payload) => {
        dispatch({
            type: TYPES.PUT_TASK_ERROR,
            payload
        })
    }

    try {
        const res = await request('/create', {
            body: payload,
            method: 'POST',
            onSuccess: (res) => {
                dispatch({
                    type: TYPES.PUT_TASK_SUCCESS,
                    payload: res
                })
                notification.success({
                    message: 'Добавление задачи',
                    description: 'Задача успешно добавлена'
                })
            },
            onError: (res) => {
                onError(res)
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