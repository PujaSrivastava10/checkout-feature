import { Card, Form } from "antd";
import Button from "../../components/button";
import Input from "rc-input";

function Login(){
    const [form] = Form.useForm();
    const onSubmit = (e) => {
        e.preventDefault();
        console.log(e)
    }
    const formValidator = (formInstance) => ({
        validator(rule, value){

        }
    });
    return(
        <Card>
            <form form={form} onSubmit={onSubmit}>
                <label htmlFor="username" name="username" label="Username" />
                <input type="text" name="username" required={true} />
                <label htmlFor="password" name="password" label="password" />
                <input type="password" name="password" required={true} />
                <button type="submit">LOGIN</button>
            </form>
        </Card>
    )
}

export default Login;