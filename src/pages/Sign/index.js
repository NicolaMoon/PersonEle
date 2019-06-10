import React from 'react';
import { Flamingo } from '../../assets';
import './index.less';

export default (porps) => {
    return (<div className="sign-wrapper" style={{ backgroundImage: `url(${Flamingo})` }}>
        <div className="box"></div>
    </div>);
}
