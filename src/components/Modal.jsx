import { Modal } from 'antd'
import { useEffect } from 'react'

const _Modal = (props) => {
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            props.onOk(e)
        }
    }

    useEffect(() => {
        if (props.visible && props.onOk) {
            window.addEventListener('keydown', handleKeyDown)
            return () => {
                window.removeEventListener('keydown', handleKeyDown)
            }
        } else {
            window.removeEventListener('keydown', handleKeyDown)
        }
    }, [props.onOk, props.visible])

    return (
        <Modal {...props} />
    )
}

export default _Modal