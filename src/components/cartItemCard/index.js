import { Card, Col, InputNumber, Row, Typography } from "antd";
import { PRICE_FORMAT } from "../../constants/appConstants";
import styles from "./index.module.css";
const { Text } = Typography;

function CartItemCard(props){
    const { index, item } = props;
    return(
        <Card key={index} className={styles.card}>
            <Row justify={"space-around"} align={"center"}>
                <Col sm={{span: 4}} xs={{span: 0}}><Text>{item.title}</Text></Col>
                <Col span={4}><Text><img src={item.image} alt={item.name} className={styles.image}></img></Text></Col>
                <Col span={4}><Text delete>{PRICE_FORMAT}{item.price} </Text><Text> {PRICE_FORMAT}{item.discountPrice}</Text></Col>
                <Col span={4}><InputNumber className={styles.inputNumber} min={1} max={100} value={item.quantity} onChange={(quantity) => props.onChange(quantity, item)} /></Col>
                <Col span={4}><Text>{PRICE_FORMAT}{item.discountPrice * item.quantity}</Text></Col>
            </Row>
        </Card>
    )
}

export default CartItemCard;