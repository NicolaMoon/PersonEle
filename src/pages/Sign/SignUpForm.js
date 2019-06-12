import React from 'react';
import { Form, Input, Icon, Button } from 'antd';

const { Item: FormItem } = Form;

const SignUpForm = (props) => {
    const { getFieldDecorator } = props.form;
    return (<Form className="form-wrapper">
        <FormItem>
            {getFieldDecorator('account', {
                rules: [{ required: true, message: 'Please input your account!' }],
            })(<Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Account"
            />)}
        </FormItem>
        <FormItem>
            {getFieldDecorator('password', {
                rules: [{ required: true, message: 'Please input your password!' }],
            })(<Input.Password
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Password"
            />)}
        </FormItem>
        <FormItem>
            {getFieldDecorator('repassword', {
                rules: [{ required: true, message: 'Please input your password again!' }],
            })(<Input.Password
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Password Again"
            />)}
        </FormItem>
        <FormItem>
            {getFieldDecorator('email', {
                rules: [{ required: true, message: 'Please input your email!' }],
            })(<Input
                prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Email"
            />)}
        </FormItem>
        <FormItem>
            {getFieldDecorator('code', {
                rules: [{ required: true, message: 'Please input your code!' }],
            })(<Input
                prefix={<Icon type="safety-certificate" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Code"
                addonAfter={<Icon type="barcode" />}
            />)}
        </FormItem>
        <FormItem>
            <Button block className="submit-btn" type="primary">Sign Up</Button>
        </FormItem>
    </Form>);
}

export default Form.create()(SignUpForm);
