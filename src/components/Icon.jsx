import React from 'react'

const Icon = (props) => {
    return (
        <span className={`icon ${props.className || ''}`} style={{ width: props.size, height: props.size }}>
            {props.children}
        </span>
    )
}

export const EditIcon = (props) => (
    <Icon {...props}>
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="feather feather-edit-2"
            viewBox="0 0 24 24"
        >
            <path d="M17 3a2.828 2.828 0 114 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
        </svg>
    </Icon>
)

export const CheckIcon = (props) => {
    return (
        <Icon {...props}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="feather feather-check"
                viewBox="0 0 24 24"
            >
                <path d="M20 6L9 17 4 12"></path>
            </svg>
        </Icon>
    )
}

export const CloseIcon = (props) => (
    <Icon {...props}>
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="feather feather-x"
            viewBox="0 0 24 24"
        >
            <path d="M18 6L6 18"></path>
            <path d="M6 6L18 18"></path>
        </svg>
    </Icon>
)