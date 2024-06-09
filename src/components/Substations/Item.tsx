import React, {useState, useMemo} from 'react';
import {ReactComponent as SubstationRed} from '../../assets/substation-marker-red.svg';
import {ReactComponent as SubstationYellow} from '../../assets/substation-marker-yellow.svg';
import {ReactComponent as SubstationGreen} from '../../assets/substation-marker-green.svg';
import {ReactComponent as AddressIcon} from '../../assets/address-icon.svg';
import {ReactComponent as EnergyIcon} from '../../assets/energy-icon.svg';
import {ReactComponent as TransformerIcon} from '../../assets/transformer-icon.svg';
import CommonButton from '../UI/CommonButton';
import GeneratorsList from './GeneratorsList';
import type {Substation} from '../../types/substations.types';

interface ItemProps {
    substation: Substation;
}

const substationIconOption = {
    active: SubstationGreen,
    disabled: SubstationRed,
    waiting: SubstationYellow
};

const statusColorOption = {
    active: 'text-green-500',
    disabled: 'text-red-500',
    waiting: 'text-orange-300'
} as const;

const translateOption = {
    active: 'Рабочий',
    disabled: 'Сломан',
    waiting: 'Ожидает'
};

function Item({substation}: ItemProps) {
    const [isOpen, setIsOpen] = useState(false);

    const SubstationIcon = useMemo(() => substationIconOption[substation.status], [substation]);

    return (
        <div className="flex h-72 rounded-lg bg-white p-3 shadow">
            <div className="flex w-56 min-w-56 flex-col">
                <div className="mb-4 flex gap-x-4">
                    <div className="h-12 w-12 overflow-hidden rounded-full">
                        <SubstationIcon />
                    </div>
                    <div>
                        <div className="font-medium">{substation.name}</div>
                        <div className={`${statusColorOption[substation.status]}`}>
                            {translateOption[substation.status]}
                        </div>
                    </div>
                </div>
                <div className="ml-3 flex flex-1 flex-col gap-y-4">
                    <div className="flex gap-x-3">
                        <AddressIcon />
                        <div>
                            <div className="line-clamp-2 h-12">{substation.address}</div>
                            <div className="text-sm text-gray-500/85">{substation.coordinates.join(', ')}</div>
                        </div>
                    </div>
                    <div className="flex items-center gap-x-3">
                        <EnergyIcon />
                        <div>{substation.power} кВт</div>
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
