import {forwardRef, useCallback, useMemo} from 'react';
import {ReactComponent as AddressIcon} from '../../assets/address-icon.svg';
import {ReactComponent as EnergyIcon} from '../../assets/energy-icon.svg';
import {ReactComponent as SubstationGreen} from '../../assets/substation-marker-green.svg';
import {ReactComponent as SubstationRed} from '../../assets/substation-marker-red.svg';
import {ReactComponent as SubstationYellow} from '../../assets/substation-marker-yellow.svg';
import {ReactComponent as TransformerIcon} from '../../assets/transformer-icon.svg';
import {useAppDispatch} from '../../hooks/useAppDispatch';
import {useAppSelector} from '../../hooks/useAppSelector';
import {setActiveSubstation} from '../../store/slices/vinaigretteSlice';
import type {Substation} from '../../types/substations.types';
import CarsOnRoadList from './CarsOnRoadList';
import GeneratorsList from './GeneratorsList';

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

const Item = forwardRef<HTMLDivElement, ItemProps>(({substation}, ref) => {
    const dispatch = useAppDispatch();

    const {activeId} = useAppSelector((state) => state.vinaigretteSlice);

    const onClickHandler = useCallback(
        (substationId: number) => {
            dispatch(setActiveSubstation(substationId));
        },
        [dispatch]
    );

    const SubstationIcon = useMemo(() => substationIconOption[substation.status], [substation]);

    return (
        <div
            ref={ref}
            onClick={() => onClickHandler(substation.substation_id)}
            className={`flex h-72 cursor-pointer rounded-lg bg-white p-3 shadow ${activeId === substation.substation_id && 'shadow-active'}`}
        >
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
                        <div className="w-6">
                            <AddressIcon />
                        </div>
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
                {/* {substation.status === 'disabled' ? (
                    <div className="self-center">
                        <CommonButton
                            onClick={() => onClickHandler(substation.substation_id)}
                            text="Вызвать генераторы"
                        />
                    </div>
                ) : (
                    ''
                )} */}
            </div>
            {activeId === substation.substation_id &&
                (substation.status === 'disabled' ? (
                    <>
                        <div className="mx-3 h-full border-l-2 border-dashed border-gray-400/50"></div>
                        <GeneratorsList />
                    </>
                ) : (
                    <>
                        <div className="mx-3 h-full border-l-2 border-dashed border-gray-400/50"></div>{' '}
                        <CarsOnRoadList />
                    </>
                ))}
        </div>
    );
});

export default Item;
