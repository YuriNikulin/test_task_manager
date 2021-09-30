import { TASK_STATUS } from './constants'

export const sleep = (ms) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            return resolve()
        }, ms)
    })
}

export const isAdmin = (user) => {
    return user.username === 'admin'
}

export const taskIsCompleted = (status) => {
    let _status = `${status}`
    return _status === TASK_STATUS.COMPLETED_EDITED || _status === TASK_STATUS.COMPLETED_NOT_EDITED
}

export const taskIsEdited = (status) => {
    let _status = `${status}`
    return _status === TASK_STATUS.COMPLETED_EDITED || _status === TASK_STATUS.NOT_COMPLETED_EDITED
}

export const defineNewStatus = ({ task, completed, edited }) => {
    const oldStatus = task.status
    let newStatus
    // Если меняем готовность таска

    if (completed !== undefined) {
        if (completed) {
            newStatus = taskIsEdited(oldStatus) ? TASK_STATUS.COMPLETED_EDITED : TASK_STATUS.COMPLETED_NOT_EDITED
        } else {
            newStatus = taskIsEdited(oldStatus) ? TASK_STATUS.NOT_COMPLETED_EDITED : TASK_STATUS.NOT_COMPLETED_NOT_EDITED
        }
    // Если редактируем любое другое поле таска, кроме готовности
    } else {
        if (edited) {
            newStatus = taskIsCompleted(oldStatus) ? TASK_STATUS.COMPLETED_EDITED : TASK_STATUS.NOT_COMPLETED_EDITED
        } else {
            newStatus = taskIsCompleted(oldStatus) ? TASK_STATUS.NOT_COMPLETED_EDITED : TASK_STATUS.NOT_COMPLETED_NOT_EDITED
        }
    }
    return newStatus
}