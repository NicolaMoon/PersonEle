import React from 'react';
import { Form, Input, Icon, Button } from 'antd';
import InputCode from '../../widgets/InputCode';

const { Item: FormItem } = Form;

const SignUpForm = (props) => {
    const { form } = props;
    const { getFieldDecorator } = form;
    const handleSignUp = () => {
        form.validateFields((errors) => {
            if (!errors) {
                console.log(form.getFieldsValue());
            }
        });
    }
    return (<Form className="form-wrapper">
        <FormItem>
            {getFieldDecorator('account', {
                rules: [{ required: true, message: 'Please input your account!' }],
            })(<Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Account"
                allowClear
            />)}
        </FormItem>
        <FormItem>
            {getFieldDecorator('password', {
                rules: [{ required: true, message: 'Please input your password!' }],
            })(<Input.Password
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Password"
                allowClear
            />)}
        </FormItem>
        <FormItem>
            {getFieldDecorator('repassword', {
                rules: [{ required: true, message: 'Please input your password again!' }],
            })(<Input.Password
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Password Again"
                allowClear
            />)}
        </FormItem>
        <FormItem>
            {getFieldDecorator('email', {
                rules: [{ required: true, message: 'Please input your email!' }],
            })(<Input
                prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Email"
                allowClear
            />)}
        </FormItem>
        <FormItem>
            {getFieldDecorator('code', {
                rules: [{ required: true, message: 'Please input your code!' }],
            })(<InputCode />)}
        </FormItem>
        <FormItem>
            <Button
                block
                className="submit-btn"
                type="primary"
                onClick={() => handleSignUp()}
            >Sign Up</Button>
        </FormItem>
    </Form>);
}

export default Form.create()(SignUpForm);
