import { useDispatch, useSelector } from "react-redux";
import { goToScreen } from "../../appReducer";
import { ADDRESS_PAGE, LISTING_PAGE, STATUS } from "../../constants/appConstants";
import styles from "./index.module.css";
import { Breadcrumb, Card, Row, Col, Typography } from "antd";
import { updateItemQuantity, setPaymentStatus, resetCart } from "./reducer";
import Button from "../../components/button";
import CartItemCard from "../../components/cartItemCard";
import BillingCard from "../../components/billingCard";
import { initiatePayment } from "./actions";
import StatusScreen from "../../components/statusScreen";
import { useCallback, useEffect, useMemo } from "react";
const { Title } = Typography;

function CartPage(){
    const dispatch = useDispatch();
    const { cartItems } = useSelector((state) =>  state.cart);
    const paymentStatus = useSelector((state) =>  state.cart.paymentStatus);
    const onChange = (quantity, item) => {
        dispatch(updateItemQuantity({
            ...item,
            quantity
        }))
    }

    const resetCartCallback = useCallback(() => {
        if(paymentStatus === STATUS.SUCCESS)
        dispatch(resetCart());
    }, [paymentStatus, dispatch])

    useEffect(() => {
        return () => {
            resetCartCallback()
        }
    },[paymentStatus, resetCartCallback])

    const goToScreenType = (name) => {
        dispatch(goToScreen(name))
    }

    const getAmount = useMemo(() => {
        return cartItems.reduce((acc, item) => {
            acc.totalAmount += item.price * item.quantity;
            acc.totalDiscount += item.discountPrice * item.quantity;
            return acc;
        },{totalAmount: 0, totalDiscount: 0});
    }, [cartItems]);

    const { totalAmount, totalDiscount } = getAmount;

    const handlePay = () => {
        dispatch(initiatePayment());
    }

    if(paymentStatus === STATUS.SUCCESS){
        return(
            <StatusScreen text={"Congratulations ! You have Successfully placed the order"}/>
        )
    }else if(paymentStatus === STATUS.REJECTED){
        return(
            <Card>
                <Title level="5">Something went wrong! Please Retry!</Title>
                <Button onClick={() => dispatch(setPaymentStatus(STATUS.IDLE))}>Retry</Button>
            </Card>
        )
    }else{
        return(
            <div>
                <Breadcrumb
                    className={styles.breadcrumb}
                    items={[
                    {
                        title: <div onClick={() => goToScreenType(LISTING_PAGE)}>Home</div>,
                    },
                    {
                        title: <div onClick={() => goToScreenType(ADDRESS_PAGE)}>Address</div>,
                    },
                    {
                        title: <div>Cart</div>,
                    }
                    ]}
                />
                <Card className={styles.card}>
                    <Row justify={"space-around"} align={"center"}>
                        <Col sm={{span: 4}} xs={{span: 0}}>Product</Col>
                        <Col span={4}>Image</Col>
                        <Col span={4}>Price</Col>
                        <Col span={4}>Quantity</Col>
                        <Col span={4}>Subtotal</Col>
                    </Row>
                </Card>
                {
                    cartItems.map((item, key) => 
                        <CartItemCard index={key} key={key} item={item} onChange={onChange} />
                    )
                }
                <BillingCard totalAmount={totalAmount} discount={totalDiscount} handlePay={handlePay}/>
            </div>
        )
    }
}

export default CartPage;