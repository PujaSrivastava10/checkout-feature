import { Card, Col, Row, Typography } from "antd";
import styles from "./index.module.css";
import { BUTTON_TYPE, PRICE_FORMAT } from "../../constants/appConstants";
import { HeartFilled, HeartOutlined, StarFilled } from "@ant-design/icons";
import Button from "../button";
import React from "react";
const { Title, Text } = Typography;


const ProductCard = ({
    item, 
    addToWishlist,
    removeFromWishlist,
    wishlistItems,
    addToCart
}) => {
    const { title, image, price, rating, discountPrice } = item;
    const { count, rate } = rating || {};
    const isDiscountAvailable = price === discountPrice;
    const isWishlistItem = wishlistItems.find((value) => value.id === item.id);
    const handleWishlist = () => {
        if(isWishlistItem){
            removeFromWishlist(item);
        }else{
            addToWishlist(item);
        }
    }
    return(
        <Card 
            className={styles.card} 
            bodyStyle={{padding: "24px 0px"}}
        >
            <div className={styles.imgContainer}>
                <img src={image} alt={title} />
                <div className={styles.rating}>
                    <strong>{rate}</strong> <StarFilled /> | <strong>{count}</strong>
                </div>
            </div>
            <div className={styles.description}>
                <Title level={5} className={styles.title}>{title}</Title>
                <Row justify={"space-between"} align={"center"}>
                    <Col>
                        {PRICE_FORMAT}{Math.round(discountPrice)} 
                        {!isDiscountAvailable && <Text delete className={styles.discountPrice}>{PRICE_FORMAT}{price}</Text>}
                    </Col>
                    <Col>
                    {isWishlistItem ? 
                        <HeartFilled 
                            style={{
                                color: "pink",  
                                fontSize: "20px",
                            }}
                            onClick={handleWishlist}
                        />: 
                        <HeartOutlined 
                            style={{
                                fontSize: "20px",
                            }}
                            onClick={handleWishlist}
                        />}
                    </Col>
                </Row>
            </div>
            <Button type={BUTTON_TYPE.PRIMARY} className={styles.button} onClick={() => addToCart(item)}>Add To Cart</Button>
        </Card>
    )
}

export default ProductCard;