import React, { useState, useRef } from 'react';
import { Icon, Carousel, Tabs } from 'antd';
import { Flamingo } from '../../assets';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';
import './index.less';

const { TabPane } = Tabs;

const SignText = (props) => (<p className="texts">
    <span
        className={`sign-text ${props.page ? '' : 'active-text'}`}
        onClick={() => props.page ? props.handleChange() : null}
    >Sign In</span>
    <span className="or">or</span>
    <span
        className={`sign-text ${props.page ? 'active-text' : ''}`}
        onClick={() => props.page ? null : props.handleChange()}
    >Sign Up</span>
</p>)

export default () => {
    const [isSignIn, setIsSignIn] = useState(true);
    const carousel = useRef();

    const handleChangePanel = (index) => {
        carousel.current.goTo(index);
        setIsSignIn(index === 0);
    }

    return (<div className="sign-wrapper" style={{ backgroundImage: `url(${Flamingo})` }}>
        <div className="box">
            <div className={`sign-btn in ${isSignIn ? '' : 'active-btn'}`} onClick={() => handleChangePanel(0)}>
                <Icon type="login" className="icon" />
            </div>
            <div className={`sign-btn up ${isSignIn ? 'active-btn' : ''}`} onClick={() => handleChangePanel(1)}>
                <Icon type="plus-circle" className="icon" />
            </div>
            <Carousel dots="false" ref={carousel}>
                <div className="sign-panel">
                    <SignText page={0} handleChange={() => handleChangePanel(1)} />
                    <Tabs defaultActiveKey="1">
                        <TabPane tab="Using Account" key="1">
                            <SignInForm type="signIn" />
                        </TabPane>
                        <TabPane tab="Using Email" key="2">
                            <SignInForm type="signUp" />
                        </TabPane>
                    </Tabs>
                </div>
                <div className="sign-panel">
                    <SignText page={1} handleChange={() => handleChangePanel(0)} />
                    <SignUpForm />
                </div>
            </Carousel>
        </div>
    </div>);
}
