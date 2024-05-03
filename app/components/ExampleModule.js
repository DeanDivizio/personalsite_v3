import React from 'react';
import styles from './exampleModule.module.css';

const ExampleModule = ({image, heading, body, linkToExample, linkToCode, mobile, reverse} ) => {
    
    let isMobile;
    if (mobile){
        isMobile = true;
    }else {
        isMobile = false;
    }

    let orderStyle;
    let textAlign;
    let linkAlign;
    if (reverse && !isMobile){
        orderStyle = 'row-reverse';
        textAlign = 'right';
        linkAlign = 'flex-end';
    } else {
        orderStyle = 'row';
        textAlign = 'left';
        linkAlign = 'flex-start';
    };

    return (
        <div className={styles.container} style={{flexDirection: orderStyle}}>
            <img className={styles.image} src={image} alt='picture of example project' />
            <div className={styles.textBlock} style={{alignItems: linkAlign}}>
                <h4 className={styles.heading} style={{textAlign: textAlign}}>{heading}</h4>
                <div className={styles.body} style={{textAlign: textAlign}}>{body}</div>
                <div className={styles.links} >
                {linkToExample ? (
                    <div className={styles.link} style={{textAlign: textAlign}}> <a className={styles.link} href={linkToExample}>View it Here</a> </div>
                    ) : null}
                {linkToCode ? (
                   <div className={styles.link} style={{textAlign: textAlign}}> <a href={linkToCode}>View the Code on GitHub</a> </div>
                ) : null}
                </div>
            </div>
        </div>
    );
};

export default ExampleModule;