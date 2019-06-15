import React from 'react';
import { Form, Input, Icon, Button } from 'antd';
import InputCode from '../../widgets/InputCode';

const { Item: FormItem } = Form;

const SignInForm = (props) => {
    const { form } = props;
    const { getFieldDecorator } = form;
    const { type } = props;
    const handleSignIn = () => {
        form.validateFields((errors) => {
            if (!errors) {
                console.log(form.getFieldsValue());
            }
        });
    }
    return (<Form className="form-wrapper">
        {type === 'signIn' && <FormItem>
            {getFieldDecorator('account', {
                rules: [{ required: true, message: 'Please input your account!' }],
            })(<Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Account"
                allowClear
            />)}
        </FormItem>}
        {type === 'signIn' && <FormItem>
            {getFieldDecorator('password', {
                rules: [{ required: true, message: 'Please input your password!' }],
            })(<Input.Password
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Password"
                allowClear
            />)}
        </FormItem>}
        {type === 'signUp' && <FormItem>
            {getFieldDecorator('email', {
                rules: [{ required: true, message: 'Please input your email!' }],
            })(<Input
                prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Email"
                allowClear
            />)}
        </FormItem>}
        {type === 'signUp' && <FormItem>
            {getFieldDecorator('code', {
                rules: [{ required: true, message: 'Please input your code!' }],
            })(<InputCode />)}
        </FormItem>}
        <FormItem>
            <Button
                block
                className="submit-btn"
                type="primary"
                onClick={() => handleSignIn()}
            >Sign In</Button>
        </FormItem>
        <FormItem>
            <Button
                block
                onClick={() => form.resetFields()}
            >Reset</Button>
        </FormItem>
    </Form>);
}

export default Form.create()(SignInForm);
