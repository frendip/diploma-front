import React from 'react';
import SelectorButton from '../UI/SelectorButton';

function Type() {
    return (
        <div>
            <SelectorButton position="left" text="Все подстанции" isActive />
            <SelectorButton position="right" text="Базы" />
        </div>
    );
}

export default Type;
