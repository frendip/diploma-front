import React from 'react';
import {ReactComponent as TruckImage} from '../assets/truckImage.svg';
import {ReactComponent as SubstationBlueIcon} from '../assets/substation-blue-icon.svg';
import {ReactComponent as SubstationRedIcon} from '../assets/substation-red-icon.svg';
import {ReactComponent as PhoneIcon} from '../assets/phone-icon.svg';
import {ReactComponent as MessageIcon} from '../assets/message-icon.svg';
import driverImage from '../assets/driver-face.jpg';
import IconButton from './UI/IconButton';

function DriversRoutesItem() {
    return (
        <div className="flex flex-col rounded-lg bg-white px-3 py-5 shadow">
            <div className="flex justify-between">
                <div className="shrink-0 grow-0 basis-3/5">
                    <div className="text-sm font-medium text-gray-500/75">Перевозимый генератор</div>
                    <div>CLine CDS770</div>
                </div>
                <TruckImage />
            </div>

            <div className="my-4 h-px w-full bg-gray-300/50" />

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

            <div className="my-4 h-px w-full bg-gray-300/50" />

            <div className="flex items-center">
                <div className="mr-3 h-12 w-12 overflow-hidden rounded-full border border-gray-300">
                    <img src={driverImage} alt="driverImage" className="h-full w-full object-cover" />
                </div>
                <div className="flex-1">
                    <div className="text-sm font-medium text-gray-500/75">Водитель</div>
                    <div className="font-medium">Andrey Андрейченко</div>
                </div>
                <div className="flex gap-x-2">
                    <IconButton variant="secondary" IconComponent={PhoneIcon} />
                    <IconButton variant="secondary" IconComponent={MessageIcon} />
                </div>
            </div>
        </div>
    );
}

export default DriversRoutesItem;
