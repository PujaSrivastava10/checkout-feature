import { Card, Typography } from "antd";
import styles from "./index.module.css";
const { Title } = Typography;

const StatusScreen = (props) => {
    return(
        <Card className={styles.container}>
            <Title level="5">{props.text}</Title>
        </Card>
    )
}

export default StatusScreen;