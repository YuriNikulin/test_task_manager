import { useStore } from '../App'
import { Button, Spin } from 'antd'
import { useCallback } from 'react'
import { changePagination, togglePutModal } from '../store/actions'
import TaskList from './TaskList'
import PutModal from './PutModal'
import Pagination from './Pagination'
import Preloader from './Preloader'

const Container = (props) => {
    const [{ data, page, loading }, dispatch] = useStore()

    const handleCreateClick = useCallback(() => {
        dispatch(togglePutModal({
            show: true,
        }))
    }, [])

    const handlePaginationChange = useCallback((page) => {
        dispatch(changePagination(page))
    }, [])

    return (
        <Spin spinning={loading}>
        {/* <Spin spinning={true}> */}
            <div className="wrapper">
                <div className="toolbar container">
                    <Button type="primary">
                        Войти
                    </Button>
                    <Button
                        type="primary"
                        style={{marginLeft: 16}}
                        onClick={handleCreateClick}
                    >
                        Создать задачу
                    </Button>
                </div>
                <div className="container body">
                    <TaskList />
                </div>
                <Pagination
                    total={data.total_task_count}
                    page={page}
                    onChange={handlePaginationChange}
                />
                <PutModal />
            </div>
        </Spin>
    )
}

export default Container