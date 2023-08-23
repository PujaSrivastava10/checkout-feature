import { Card, Col, Row } from "antd";
import styles from "./index.module.css";

function CardLoading(props){
    const cards = new Array(40).fill(10);
    return(
        <Row gutter={[16, 24]} justify={"space-between"}>
            {
                cards.map((val, key) => 
                    <Col span={{xl: 8, lg: 6, md: 4, sm: 3}} key={key}>
                        <Card
                            className={styles.card}
                            loading={true}>
                        </Card>
                    </Col>
                )
            }
        </Row>

    )
}

export default CardLoading;

