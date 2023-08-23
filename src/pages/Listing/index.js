import { useEffect, useState } from "react";
import { getItems } from "./actions";
import { useDispatch, useSelector } from 'react-redux'
import ProductCard from "../../components/productCard";
import { Col, Modal, Row, Typography } from "antd";
import Button from "../../components/button";
import { addItemToWishlist, removeItemFromWishlist, addItemToCart } from "../Cart/reducer";
import styles from "./listing.module.css";
import { ADDRESS_PAGE, BUTTON_TYPE } from "../../constants/appConstants";
import { goToScreen } from "../../appReducer";
import CardLoading from "../../components/cardLoading";
import StatusScreen from "../../components/statusScreen";
const { Text } = Typography;

function ListingPage(){
    const dispatch = useDispatch();
    const [modalOpen, setModalToggle] = useState(false);
    const {items, error, isLoading} = useSelector((state) => state.listing);
    const { wishlistItems, cartItems } = useSelector((state) => state.cart);

    useEffect(() => {
        if(!items.length){
            dispatch(getItems());
        }
    },[]);

    const addToWishlist = (item) => {
        dispatch(addItemToWishlist(item));
    }

    const removeFromWishlist = (item) => {
        dispatch(removeItemFromWishlist(item))
    }

    const goToScreenType = (name) => {
        dispatch(goToScreen(name))
    }

    const addToCart = (item) => {
        dispatch(addItemToCart(item))
    }

    const toggleModal = () => {
        setModalToggle(!modalOpen);
    }
    
    const onClickContinue = () => {
        toggleModal();
        goToScreenType(ADDRESS_PAGE)
    }

    if(error){
        return(<StatusScreen text="Some error occured"/>)
    }else if(isLoading){
        return(
            <CardLoading />
        )
    }return(
        <div>
            <Row gutter={[24, { xs: 0, sm: 0, md: 24, lg: 32 }]} justify={"space-around"}>
                {(items || []).map((item, key) => 
                    <Col span={{xl: 8, lg: 6, md: 4, sm: 3}} key={key} >
                        <ProductCard 
                            item={item} 
                            addToWishlist={addToWishlist}
                            wishlistItems={wishlistItems}
                            removeFromWishlist={removeFromWishlist}
                            addToCart={addToCart}
                        />
                    </Col>
                )}
            </Row>
            {!!cartItems.length && <div className={styles.buttonContainer}>
                <Button type={BUTTON_TYPE.PRIMARY} onClick={toggleModal}> Continue To Checkout </Button>
            </div>}
            <Modal footer={null} open={modalOpen} onClose={toggleModal}>
                <Text>Are you sure you want to proceed?</Text>
                <div className={styles.modalButtonContainer}>
                    <Button onClick={toggleModal}>Cancel</Button>
                    <Button type={BUTTON_TYPE.PRIMARY} onClick={onClickContinue}>Confirm</Button>
                </div>
            </Modal>
        </div>
    )
}

export default ListingPage;