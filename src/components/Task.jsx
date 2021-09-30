const Field = ({ label, children }) => {
    return (
        <div className="task-field">
            <span className="task-field__label">
                {label}
            </span>
            <div className="task-field__value">
                {children}
            </div>
        </div>
    )
}

const Task = ({ task }) => {
    return (
        <div className="task">
            <Field label="Имя пользователя">
                {task.username}
            </Field>
            <Field label="E-mail">
                {task.email}
            </Field>
            <Field label="Текст задачи">
                {task.text}
            </Field>
        </div>
    )
}

export default Task