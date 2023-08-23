import { Col, Row, Typography, message } from "antd";
import styles from "./index.module.css";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { ADDRESS_PAGE, CART_PAGE, LISTING_PAGE } from "../../constants/appConstants";
import { goToScreen } from "../../appReducer";
const { Text } = Typography;

function Header(props) {
    const dispatch = useDispatch();
    const { cartItems } = useSelector((state) => state.cart);
    const { screen } = useSelector((state) => state.app);
    const { shippingAddress } = useSelector((state) => state.address);

    const changeScreen = (name) => {
        dispatch(goToScreen(name));
    }

    const goToScreenType = () => {
        if(!cartItems.length){
            message.error("Please add items to your cart to proceed", 2);
        }else if(shippingAddress?.pincode){
            changeScreen(CART_PAGE);
        }else{
            changeScreen(ADDRESS_PAGE);
        }
    }

    const onClickLogo = () => {
        if(screen !== LISTING_PAGE){
            changeScreen(LISTING_PAGE);
        }
    }
  
    return (
        <div>
        <Row align={"center"} justify={"space-between"} className={styles.header}>
            <Col>
                <Row>
                    <Col><Text level={2} className={styles.logo} onClick={onClickLogo}>Shopping Delight</Text></Col>
                </Row>
            </Col>
            <Col>
                <Row>
                    <Col>
                        <div className={styles.cartContainer} onClick={goToScreenType}>
                            <ShoppingCartOutlined className={!cartItems.length ? styles.cartIcon : styles.cartIconActive}/>
                            {!!cartItems.length && <div className={styles.circle}>{cartItems.length}</div>}
                        </div>
                    </Col>
                </Row>
            </Col>
        </Row>
        </div>
  );
}

export default Header;
