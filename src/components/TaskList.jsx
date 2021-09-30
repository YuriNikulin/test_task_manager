import { useStore } from '../App'
import { Button } from 'antd'
import { useCallback, useEffect } from 'react'
import { fetchData, togglePutModal } from '../store/actions'
import Task from './Task'
import Pagination from './Pagination'

const TaskList = (props) => {
    const [{ data, loading }, dispatch] = useStore()

    useEffect(() => {
        dispatch(fetchData({}))
    }, [])

    return (
        <div className="task-list">
            {!!data.tasks.length
                ?
                <>
                    {
                        data.tasks.map((task) => {
                            return (
                                <Task task={task} key={task.id} />
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