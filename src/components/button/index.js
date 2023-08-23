import { Button as AntdButton } from "antd"
import styles from "./index.module.css";
import { BUTTON_TYPE } from "../../constants/appConstants";

function Button(props){
    const { type } = props;
    if(type === BUTTON_TYPE.PRIMARY){
        return( 
            <span className={styles.primaryButton} >
                <AntdButton {...props}>
                    {props.children}
                </AntdButton>
            </span>
        )
    }
    return( 
        <AntdButton {...props}>
            {props.children}
        </AntdButton>
    )
}

export default Button;