import { Spin } from 'antd'

const Preloader = (props) => {
    if (!props.in) return null
    return (
        <div className="preloader">
            <Spin
                delay={300}
                size="large"
                spinning={props.in}
                {...props}
            />
        </div>
    )
}

export default Preloader