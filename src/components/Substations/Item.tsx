import React, {useState} from 'react';
import {Transition} from 'react-transition-group';
import {ReactComponent as SubstationGreen} from '../../assets/substation-marker-green.svg';
import {ReactComponent as SubstationRed} from '../../assets/substation-marker-red.svg';
import {ReactComponent as AddressIcon} from '../../assets/address-icon.svg';
import {ReactComponent as EnergyIcon} from '../../assets/energy-icon.svg';
import {ReactComponent as TransformerIcon} from '../../assets/transformer-icon.svg';
import CommonButton from '../UI/CommonButton';
import GeneratorsList from './GeneratorsList';

const statusColorOption = {
    active: 'text-green-500',
    disabled: 'text-red-500',
    waiting: 'text-orange-300'
} as const;

const transitionStyles = {
    entering: 'w-full transition-width duration-300',
    entered: 'w-full transition-width duration-300',
    exiting: 'w-0 transition-width duration-300',
    exited: 'w-0 transition-width duration-300',
    unmounted: 'w-0 transition-width duration-300'
} as const;

function Item() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="flex h-72 rounded-lg bg-white p-3 shadow">
            <div className="flex w-56 min-w-56 flex-col">
                <div className="mb-4 flex gap-x-4">
                    <div className="h-12 w-12 overflow-hidden rounded-full">
                        <SubstationGreen />
                    </div>
                    <div>
                        <div className="font-medium">Подстанция 1</div>
                        <div className={`${statusColorOption['active']}`}>Рабочий</div>
                    </div>
                </div>
                <div className="ml-3 flex flex-1 flex-col gap-y-4">
                    <div className="flex gap-x-3">
                        <AddressIcon />
                        <div>
                            <div>Тверская улица, 4, Москва, 125009</div>
                            <div className="text-sm text-gray-500/85">55.758493, 37.613198</div>
                        </div>
                    </div>
                    <div className="flex items-center gap-x-3">
                        <EnergyIcon />
                        <div>330 кВт</div>
                    </div>
                    <div className="flex items-center gap-x-3">
                        <TransformerIcon />
                        <div>2 шт.</div>
                    </div>
                </div>
                <div className="self-center">
                    <CommonButton onClick={() => setIsOpen(!isOpen)} text="Вызвать генераторы" />
                </div>
            </div>
            {isOpen && (
                <>
                    <div className="mx-3 h-full border-l-2 border-dashed border-gray-400/50"></div>
                    <GeneratorsList />
                </>
            )}
        </div>
    );
}

export default Item;
