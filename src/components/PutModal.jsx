import React, { useCallback, useEffect, useState } from 'react'
import { Input, Form } from 'antd'
import { useStore } from '../App'
import { putTask, resetFieldError, togglePutModal } from '../store/actions'
import CustomFormItem from './FormItem'
import Modal from './Modal'


const PutModal = () => {
    const [{ putModal }, dispatch] = useStore()
    const [localValues, setLocalValues] = useState({})

    const handleSubmit = useCallback(() => {
        dispatch(putTask({ data: localValues }))
    }, [localValues])

    useEffect(() => {
        if (putModal.show) {
            setLocalValues(putModal.data)
        }
    }, [putModal.show])

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
            dispatch(resetFieldError({
                form: 'putModal',
                key
            }))
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
                    <Input.TextArea
                        placeholder="Текст задачи"
                    />
                </CustomFormItem>
            </Form>
        </Modal>
    )
}

export default PutModal