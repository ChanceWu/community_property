import React from 'react';
import BannerAnim, { Element } from 'rc-banner-anim';
import TweenOne from 'rc-tween-one';
import food_home0 from '../../style/imgs/login.jpg';
import food_home1 from '../../style/imgs/login2.jpg';
import food_home2 from '../../style/imgs/register.jpg';
import food_home3 from '../../style/imgs/beauty.jpg';
import 'rc-banner-anim/assets/index.css';
const BgElement = Element.BgElement;
class AutoPlay extends React.Component {
    render(){
        return (
            <BannerAnim prefixCls="banner-user" autoPlay>
                <Element
                    prefixCls="banner-user-elem"
                    key="0"
                >
                    <BgElement
                        key="bg"
                        className="bg"
                        style={{
                            backgroundImage: 'url('+food_home0+')',
                            backgroundSize: 'cover',
                            backroundPosition: 'center',
                        }}
                    />
                    <TweenOne className="banner-user-title" animation={{ y: 30, opacity: 0, type: 'from' }}>
                        小区物业管理系统
                    </TweenOne>
                    <TweenOne className="banner-user-text"
                              animation={{ y: 30, opacity: 0, type: 'from', delay: 100 }}
                    >
                        2018.11.1--2019.6.15
                    </TweenOne>
                </Element>
                <Element
                    prefixCls="banner-user-elem"
                    key="1"
                >
                    <BgElement
                        key="bg"
                        className="bg"
                        style={{
                            backgroundImage: 'url('+food_home1+')',
                            backgroundSize: 'cover',
                            backroundPosition: 'center',
                        }}
                    />
                    <TweenOne className="banner-user-title" animation={{ y: 30, opacity: 0, type: 'from' }}>
                        细致化、高效化、智能化
                    </TweenOne>
                    <TweenOne className="banner-user-text"
                              animation={{ y: 30, opacity: 0, type: 'from', delay: 100 }}
                    >
                        
                    </TweenOne>
                </Element>
                <Element
                    prefixCls="banner-user-elem"
                    key="2"
                >
                    <BgElement
                        key="bg"
                        className="bg"
                        style={{
                            backgroundImage: 'url('+food_home2+')',
                            backgroundSize: 'cover',
                            backroundPosition: 'center',
                        }}
                    />
                    <TweenOne className="banner-user-title" animation={{ y: 30, opacity: 0, type: 'from' }}>
                        关于小区绿化改造的通知
                    </TweenOne>
                    <TweenOne className="banner-user-text"
                              animation={{ y: 30, opacity: 0, type: 'from', delay: 100 }}
                    >
                        物业管理处 2019年4月30日
                    </TweenOne>
                </Element>
                <Element
                    prefixCls="banner-user-elem"
                    key="3"
                >
                    <BgElement
                        key="bg"
                        className="bg"
                        style={{
                            backgroundImage: 'url('+food_home3+')',
                            backgroundSize: 'cover',
                            backroundPosition: 'center',
                        }}
                    />
                    <TweenOne className="banner-user-title" animation={{ y: 30, opacity: 0, type: 'from' }}>
                        我们的宗旨就是为您及家人提供舒适、便利生活
                    </TweenOne>
                    <TweenOne className="banner-user-text"
                              animation={{ y: 30, opacity: 0, type: 'from', delay: 100 }}
                    >
                        物业管理处宣 2019年5月01日
                    </TweenOne>
                </Element>
            </BannerAnim>);
    }
}

export default AutoPlay;