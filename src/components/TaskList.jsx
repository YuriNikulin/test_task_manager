import { useStore } from '../App'
import { useCallback, useEffect } from 'react'
import { fetchData, putTask, togglePutModal } from '../store/actions'
import Task from './Task'

const TaskList = (props) => {
    const [{ data, loading, currentUser }, dispatch] = useStore()

    useEffect(() => {
        dispatch(fetchData({}))
    }, [])

    const handleComplete = useCallback((task, value) => {
        dispatch(putTask({
            task,
            completed: value
        }))
    }, [])

    const handleEdit = useCallback((task, key, value) => {
        dispatch(putTask({
            task,
            data: {
                [key]: value
            }
        }))
    }, [])

    return (
        <div className="task-list">
            {!!data.tasks.length
                ?
                <>
                    {
                        data.tasks.map((task) => {
                            return (
                                <Task
                                    task={task}
                                    key={task.id}
                                    onComplete={(e) => handleComplete(task, e.target.checked)}
                                    canEdit={currentUser.isAdmin}
                                    onEdit={(...args) => handleEdit(task, ...args)}
                                />
                            )
                        })
                    }

                </>
                :
                (
                    <span>
                        Ничего не найдено
                    </span>
                )
            }
        </div>
    )
}

export default TaskList