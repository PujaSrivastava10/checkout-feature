import { Card } from "antd";
import Button from "../button";
import { BUTTON_TYPE, PRICE_FORMAT } from "../../constants/appConstants";
import styles from "./index.module.css";

const BillingCard = ({
    totalAmount, 
    discount, 
    handlePay 
}) => {
    return(
        <Card bodyStyle={{padding: "32px 24px"}} className={styles.priceCard}>
            <h2 level={5} className={styles.title}>Cart Total</h2>
            <div className={styles.priceSection}><span>Total Amount:</span> <span>{PRICE_FORMAT}{totalAmount}</span></div>
            <div className={styles.priceSection}><span>Discount:</span> <span>{PRICE_FORMAT}{totalAmount - discount}</span></div>
            <div className={styles.priceSection}><span>Shipping:</span> <span>Free</span></div>
            <div className={styles.priceSection}><span>Amount To Pay:</span> <span>{PRICE_FORMAT}{discount}</span></div>
            <Button type={BUTTON_TYPE.PRIMARY} onClick={handlePay}>PROCEED TO PAY</Button>
        </Card>
    )
}

export default BillingCard;