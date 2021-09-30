import { Pagination } from 'antd'
import { PER_PAGE } from '../constants'

const CustomPagination = (props) => {
    return (
        <div className="pagination">
            <div className="container">
                <Pagination
                    defaultCurrent={1}
                    total={props.total}
                    pageSize={PER_PAGE}
                    current={props.page}
                    showTotal={(total) => `Всего: ${total}`}
                    onChange={props.onChange}
                />
            </div>
        </div>
    )
}

export default CustomPagination