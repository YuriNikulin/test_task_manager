import { useCallback, useEffect, useState } from 'react'
import { Checkbox, Button, Input } from 'antd'
import { TASK_STATUS } from '../constants'
import { taskIsCompleted, taskIsEdited } from '../utils'
import { CheckIcon, CloseIcon, EditIcon } from './Icon'

const Field = ({ label, children, editable, name, onEdit }) => {
    const [isEdited, setIsEdited] = useState(false)
    const [value, setValue] = useState(children)

    const toggleIsEdit = useCallback(() => {
        const newValue = !isEdited
        setIsEdited(newValue)

        if (!newValue) {
            setValue(children)
        }
    }, [isEdited, children])

    const handleChange = useCallback((e) => {
        setValue(e.target.value)
    }, [name, value])

    const handleSave = useCallback(() => {
        onEdit(name, value)
        toggleIsEdit()
    }, [value, onEdit, name, toggleIsEdit])

    const handleKeyDown = useCallback((e) => {
        if (e.key === 'Enter') {{
            e.preventDefault()
            handleSave()
        }}
    }, [handleSave])

    useEffect(() => {
        if (!editable && isEdited) {
            setIsEdited(false)
        }
    }, [editable])

    useEffect(() => {
        setValue(children)
    }, [children])

    return (
        <div className="task-field">
            <span className="task-field__label">
                {label}
            </span>
            <div className="task-field-value">
                <p className="task-field-value__text">
                    {
                        !isEdited 
                            ?
                                children
                            :
                                <Input.TextArea
                                    value={value}
                                    resize="both"
                                    onChange={handleChange}
                                    onKeyDown={handleKeyDown}
                                    autoFocus
                                />
                    }
                </p>
                <div className="task-field-value__buttons">
                    {editable && !isEdited &&
                        <Button
                            shape="circle"
                            className=""
                            onClick={toggleIsEdit}
                            title="Редактировать"
                        >
                            <EditIcon size={14} />
                        </Button>
                    }
                    {editable && isEdited && (
                        <>
                            <Button
                                shape="circle"
                                type="primary"
                                title="Сохранить"
                                onClick={handleSave}
                            >
                                <CheckIcon size={18} />
                            </Button>
                            <Button
                                shape="circle"
                                type="primary"
                                danger
                                style={{ marginLeft: 8 }}
                                onClick={toggleIsEdit}
                                title="Отменить"
                            >
                                <CloseIcon size={18} />
                            </Button>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

const Task = ({ task, onComplete, canEdit, onEdit }) => {
    return (
        <div className="task">
            <Field label="Имя пользователя" name="username">
                {task.username}
            </Field>
            <Field label="E-mail" name="email">
                {task.email}
            </Field>
            <Field label="Текст задачи" editable={canEdit} onEdit={onEdit} name="text">
                {task.text}
            </Field>
            <Field label="Статус">
                <Checkbox onChange={onComplete} checked={taskIsCompleted(task.status)}>
                    Выполнено
                </Checkbox>
            </Field>
            {taskIsEdited(task.status) && (
                <div style={{fontSize: '0.8rem'}}>
                    <EditIcon size={12} />
                    <span style={{marginLeft: 4}}>
                        Задача была отредактирована администратором
                    </span>
                </div>
            )}
        </div>
    )
}

export default Task