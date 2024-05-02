import React from 'react';
import styles from './skillCard.module.css';

const SkillCard = ({ color, content }) => {
    return (
        <div className={`${styles.card} ${color}`}>
            <div dangerouslySetInnerHTML={{ __html: content}} />
        </div>
    );
};

export default SkillCard;
