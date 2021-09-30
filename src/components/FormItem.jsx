import React from 'react'

const FormItem = ({ onChange, value, ...props }) => {
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

export default FormItem