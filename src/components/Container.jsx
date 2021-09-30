import { useStore } from '../App'
import { Button, Spin } from 'antd'
import { useCallback } from 'react'
import { changePagination, logout, toggleAuthModal, togglePutModal } from '../store/actions'
import TaskList from './TaskList'
import PutModal from './PutModal'
import Pagination from './Pagination'
import Preloader from './Preloader'
import AuthModal from './AuthModal'

const Container = (props) => {
    const [{ data, page, loading, currentUser }, dispatch] = useStore()

    const handleCreateClick = useCallback(() => {
        dispatch(togglePutModal({
            show: true,
        }))
    }, [])

    const handlePaginationChange = useCallback((page) => {
        dispatch(changePagination(page))
    }, [])

    const handleAuthClick = useCallback(() => {
        dispatch(toggleAuthModal({
            show: true
        }))
    }, [])

    const handleLogoutClick = useCallback(() => {
        dispatch(logout())
    }, [])

    return (
        <Spin spinning={loading}>
            <div className="wrapper">
                <div className="toolbar container">
                    {currentUser.isLogged && (
                        <p>
                            Вы авторизованы как <b>{currentUser.username}</b>
                        </p>
                    )}
                    {currentUser.isLogged ? (
                        <Button
                            type="primary"
                            danger
                            onClick={handleLogoutClick}
                        >
                            Выйти
                        </Button>
                    ) : (
                        <Button
                            type="primary"
                            onClick={handleAuthClick}
                        >
                            Войти
                        </Button>
                    )}


                    <Button
                        type="primary"
                        style={{ marginLeft: 16 }}
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
                <AuthModal />
            </div>
        </Spin>
    )
}

export default Container