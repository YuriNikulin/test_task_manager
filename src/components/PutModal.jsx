import React, { useCallback, useEffect, useState } from 'react'
import { Modal, Input, Form } from 'antd'
import { useStore } from '../App'
import { putTask, resetFieldError, togglePutModal } from '../store/actions'

const CustomFormItem = ({ onChange, value, ...props }) => {
    return (
        <div className="mb-3 form-item">
            {React.cloneElement(props.children, {
                onChange: (e) => onChange(props.name, e.target.value),
                value
            })}
            {props.error && (
                <span className="form-item__error">
                    {props.error}
                </span>
            )}
        </div>
    )
}

const PutModal = () => {
    const [{ putModal }, dispatch] = useStore()
    const [localValues, setLocalValues] = useState({})

    const handleSubmit = useCallback(() => {
        dispatch(putTask(localValues))
    }, [localValues])

    const handleWindowKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSubmit()
        }
    }

    useEffect(() => {
        if (putModal.show) {
            console.log(putModal)
            setLocalValues(putModal.data)
        }
    }, [putModal.show])

    useEffect(() => {
        window.addEventListener('keydown', handleWindowKeyDown)

        return () => {
            window.removeEventListener('keydown', handleWindowKeyDown)
        }
    }, [handleWindowKeyDown])

    const handleCancel = useCallback(() => {
        dispatch(togglePutModal({
            show: false
        }))
    }, [])

    const handleFieldChange = useCallback((key, value) => {
        setLocalValues({
            ...localValues,
            [key]: value
        })

        if (putModal.errors[key]) {
            dispatch(resetFieldError(key))
        }
    }, [localValues, putModal.errors])

    return (
        <Modal
            visible={putModal.show}
            onCancel={handleCancel}
            title="Создание задачи"
            okText="Сохранить"
            cancelText="Отмена"
            onOk={handleSubmit}
            confirmLoading={putModal.loading}
        >
            <Form>
                <CustomFormItem
                    onChange={handleFieldChange}
                    name="username"
                    value={localValues.username}
                    error={putModal.errors['username']}
                >
                    <Input
                        placeholder="Имя пользователя"
                    />
                </CustomFormItem>
                <CustomFormItem
                    onChange={handleFieldChange}
                    name="email"
                    value={localValues.email}
                    error={putModal.errors['email']}
                >
                    <Input
                        placeholder="E-mail"
                        type="email"
                    />
                </CustomFormItem>
                <CustomFormItem
                    onChange={handleFieldChange}
                    name="text"
                    value={localValues.text}
                    error={putModal.errors['text']}
                >
                    <Input
                        placeholder="Текст задачи"
                    />
                </CustomFormItem>
            </Form>
        </Modal>
    )
}

export default PutModal