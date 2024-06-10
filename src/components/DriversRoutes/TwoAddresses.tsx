import React from 'react';
import {ReactComponent as SubstationBlueIcon} from '../../assets/substation-blue-icon.svg';
import {ReactComponent as SubstationRedIcon} from '../../assets/substation-red-icon.svg';

function TwoAddresses() {
    return (
        <div className="flex flex-col">
            <div className="flex gap-x-5">
                <SubstationBlueIcon />
                <div className="flex flex-col">
                    <div className="font-medium">м. Пушкинская</div>
                    <div className="text-xs text-gray-500/85">г. Москва, Россия</div>
                </div>
            </div>
            <div className="ml-4 h-7 border-l-2 border-dashed border-gray-400/50" />
            <div className="flex gap-x-5">
                <SubstationRedIcon />
                <div className="flex flex-col">
                    <div className="font-medium">м. Лубянка</div>
                    <div className="text-xs text-gray-500/85">г. Москва, Россия</div>
                </div>
            </div>
        </div>
    );
}

export default TwoAddresses;
