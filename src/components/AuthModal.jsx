import React, { useCallback, useEffect, useState } from 'react'
import { Input, Form } from 'antd'
import Modal from './Modal'
import { useStore } from '../App'
import { authorize, resetFieldError, toggleAuthModal } from '../store/actions'
import CustomFormItem from './FormItem'

const AuthModal = () => {
    const [{ authModal }, dispatch] = useStore()
    const [values, setValues] = useState({})

    const handleSubmit = useCallback(() => {
        dispatch(authorize({ data: values }))
    }, [values])

    const handleFieldChange = useCallback((key, value) => {
        setValues({
            ...values,
            [key]: value
        })

        if (authModal.errors[key]) {
            dispatch(resetFieldError({
                form: 'authModal',
                key
            }))
        }
    }, [values, authModal.errors])

    const handleCancel = useCallback(() => {
        dispatch(toggleAuthModal({
            show: false
        }))
    }, [])

    useEffect(() => {
        if (!authModal.show) {
            setValues({})
        }
    }, [authModal])

    return (
        <Modal
            visible={authModal.show}
            onCancel={handleCancel}
            title="Авторизация"
            okText="Войти"
            cancelText="Отмена"
            onOk={handleSubmit}
            confirmLoading={authModal.loading}
        >
            <Form>
                <CustomFormItem
                    label="Имя пользователя"
                    name="username"
                    value={values.username}
                    onChange={handleFieldChange}
                    error={authModal.errors.username}
                >
                    <Input
                        placeholder="Имя пользователя"
                        autoFocus
                    />
                </CustomFormItem>
                <CustomFormItem
                    label="Пароль"
                    name="password"
                    value={values.password}
                    onChange={handleFieldChange}
                    error={authModal.errors.password}
                >
                    <Input
                        placeholder="Пароль"
                        type="password"
                    />
                </CustomFormItem>
            </Form>
        </Modal>
    )
}

export default AuthModal