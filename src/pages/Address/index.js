import { useEffect } from "react";
import { Breadcrumb, Card, Col, Form, Input, Row } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { addAddress } from "./reducer";
import { goToScreen } from "../../appReducer";
import { BUTTON_TYPE, CART_PAGE, LISTING_PAGE } from "../../constants/appConstants";
import Button from "../../components/button";
import styles from "./index.module.css";

function AddressPage(){
    const dispatch = useDispatch();
    const {shippingAddress} = useSelector(state => state.address)
    const [form] = Form.useForm();
    const { firstName, lastName } = form || {};
    useEffect(() => {
        form.resetFields();
      }, [shippingAddress]);
      
    const onFinish = (value) => {
        console.log(value);
        dispatch(addAddress(value))
        dispatch(goToScreen(CART_PAGE));
    };

    const goBack = () => {
        dispatch(goToScreen(LISTING_PAGE));
    }

    const mobileValidator = (formInstance) => ({
        validator(rule, value){
            const mobileNumberRegex = /(0|91)?[6-9][0-9]{9}/;
            const mobileNumber = formInstance.getFieldValue("mobile");
            if(mobileNumberRegex.test(mobileNumber)){
                return Promise.resolve();
            }
            return Promise.reject(new Error("Please enter a correct mobile number"));
        }
    });
 
    return(
        <div>
            <Breadcrumb
                className={styles.breadcrumb}
                items={[
                {
                    title: <div onClick={goBack}>Home</div>,
                },
                {
                    title: <div>Address</div>,
                }
                ]}
            />
            <Card className={styles.addressCard}>
                <div className={styles.heading}>Add Billing Address</div>
                <Form form={form} layout="vertical" onFinish={onFinish} initialValues={shippingAddress}>
                    <Row gutter={{
                            sm: 4,
                            lg: 16,
                            xs: 4
                        }} >
                        <Col lg={{span: 12}} sm={{span: 12}} xs={{span: 12}}>
                            <Form.Item
                                label={"First Name: "}
                                name="firstName"
                                rules={[{required: true, message: "Please enter your first name"}]}
                            >
                                <Input placeholder="First Name" value={firstName}></Input>  
                            </Form.Item>
                        </Col>
                        <Col lg={{span: 12}} sm={{span: 12}} xs={{span: 12}}>
                            <Form.Item
                            label={"Last Name:"}
                            name="lastName"
                            >
                                <Input placeholder="Last Name" value={lastName}></Input>  
                            </Form.Item>
                        </Col>
                        <Col lg={{span: 12}} sm={{span: 12}} xs={{span: 12}}>
                            <Form.Item
                            label={"Flat No.:"}
                            name="flatNo"
                            >
                                <Input placeholder="Flat No./Building name"></Input>  
                            </Form.Item>
                        </Col>
                        <Col lg={{span: 12}} sm={{span: 12}} xs={{span: 12}}>
                            <Form.Item
                            label={"Building Name:"}
                            name="buildingName"
                            rules={[{required: true, message: "Please enter your building name"}]}

                            >
                                <Input placeholder="Building name"></Input>  
                            </Form.Item>
                        </Col>
                        <Col lg={{span: 24}} sm={{span: 24}} xs={{span: 24}}>
                            <Form.Item
                                label={"Street Address:"}
                                name="streetAddress"
                                rules={[{required: true, message: "Please enter your street address"}]}

                            >
                                <Input placeholder="Street Address"></Input>
                            </Form.Item>
                        </Col>
                        <Col lg={{span: 12}} sm={{span: 12}} xs={{span: 12}}>
                            <Form.Item
                            label={"City:"}
                            name="city"
                            rules={[{required: true, message: "Please enter your town or city"}]}
                            >
                                <Input placeholder="Town / City"></Input>
                            </Form.Item>
                        </Col>
                        <Col lg={{span: 12}} sm={{span: 12}} xs={{span: 12}}>
                            <Form.Item
                                label={"State:"}
                                name="state"
                                rules={[{required: true, message: "Please enter your state"}]}
                            >
                                <Input placeholder="State"></Input>
                            </Form.Item>
                        </Col>
                        <Col lg={{span: 12}} sm={{span: 12}} xs={{span: 12}}>
                            <Form.Item
                            label={"Pincode:"}
                            name="pincode"
                            rules={[{required: true, message: "Please enter your pincode"}]}
                            >
                                <Input 
                                    placeholder="Pincode" 
                                    type="number"
                                    maxLength={6}
                                ></Input>
                            </Form.Item>
                        </Col>
                        <Col lg={{span: 12}} sm={{span: 12}} xs={{span: 12}}>
                            <Form.Item
                                label={"Country:"}
                                name="country"
                                rules={[{required: true, message: "Please enter your country"}]}
                            >
                                <Input placeholder="Country"></Input>
                            </Form.Item>
                        </Col>
                        <Col lg={{span: 12}} sm={{span: 12}} xs={{span: 12}}>
                            <Form.Item
                                label={"Mobile Number:"}
                                name="mobile"
                                rules={[{required: true, message: "Please enter your valid mobile number"}, mobileValidator]}
                                type="number"
                            >
                                <Input placeholder="Mobile"></Input>
                            </Form.Item>
                        </Col>
                        <Col lg={{span: 12}} sm={{span: 12}} xs={{span: 12}}>
                            <Form.Item
                                label={"Email Address::"}
                                name="email"
                                rules={[{required: true, message: "Please enter your valid email"}]}
                                type="email"
                            >
                                <Input placeholder="Email"></Input>
                            </Form.Item>
                        </Col>
                    </Row>
                    <div className={styles.buttonContainer}>
                        <Button onClick={goBack}>GO BACK</Button>
                        <Button type={BUTTON_TYPE.PRIMARY} htmlType="submit">PROCEED TO CHECKOUT</Button>
                    </div>
                </Form>
            </Card>
        </div>
    )
}

export default AddressPage;