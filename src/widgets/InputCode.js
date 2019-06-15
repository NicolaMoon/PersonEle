import React, { useState } from 'react';
import { Input, Icon } from 'antd';

export default () => {
    const [hadSend, setHadSend] = useState(false);
    const [countDown, setCountDown] = useState(60);
    const handleSendCode = () => {
        setHadSend(true);
        let timeCount = 60;
        const timer = setInterval(() => {
            setCountDown(timeCount);
            timeCount -= 1;
            if (timeCount === -1) {
                setHadSend(false);
                clearInterval(timer);
            }
        }, 1000);
    }
    return (<Input
        prefix={<Icon type="safety-certificate" style={{ color: 'rgba(0,0,0,.25)' }} />}
        placeholder="Code"
        addonAfter={hadSend ? <span>{countDown}</span> : <Icon
            type="barcode"
            style={{ cursor: 'pointer', color: '#ff4d4d' }}
            onClick={() => handleSendCode()}
        />}
    />);
}
