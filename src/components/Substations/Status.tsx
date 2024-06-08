import React from 'react';
import SelectorButton from '../UI/SelectorButton';

function Status() {
    return (
        <div>
            <SelectorButton position="left" text="Все" isActive />
            <SelectorButton position="center" text="Рабочие" textColor="green" />
            <SelectorButton position="center" text="Сломанные" textColor="red" />
            <SelectorButton position="right" text="Ожидающие" textColor="orange" />
        </div>
    );
}

export default Status;
