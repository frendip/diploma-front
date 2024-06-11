import {forwardRef, useCallback} from 'react';
import {ReactComponent as AddressIcon} from '../../assets/address-icon.svg';
import {ReactComponent as EnergyIcon} from '../../assets/energy-icon.svg';
import {ReactComponent as GeneratorIcon} from '../../assets/generator-icon.svg';
import {ReactComponent as SubstationBlue} from '../../assets/substation-marker-blue.svg';
import {useAppDispatch} from '../../hooks/useAppDispatch';
import {useAppSelector} from '../../hooks/useAppSelector';

import {setActiveSubstation} from '../../store/slices/vinaigretteSlice';
import {Base} from '../../types/substations.types';
import CarsOnBaseList from './CarsOnBaseList';

export interface BaseItemProps {
    base: Base;
}

const BasesItem = forwardRef<HTMLDivElement, BaseItemProps>(({base}, ref) => {
    const dispatch = useAppDispatch();

    const {activeSubstationId} = useAppSelector((state) => state.vinaigretteSlice);

    const onClickHandler = useCallback(
        (substationId: number) => {
            dispatch(setActiveSubstation(substationId));
        },
        [dispatch]
    );
    return (
        <div
            ref={ref}
            onClick={() => onClickHandler(base.substation_id)}
            className={`flex h-72 cursor-pointer rounded-lg bg-white p-3 shadow ${activeSubstationId === base.substation_id && 'shadow-active'}`}
        >
            <div className="flex w-56 min-w-56 flex-col">
                <div className="mb-4 flex items-center gap-x-4">
                    <div className="h-12 w-12 overflow-hidden rounded-full">
                        <SubstationBlue />
                    </div>
                    <div>
                        <div className="font-medium">{base.name}</div>
                    </div>
                </div>
                <div className="ml-3 flex flex-1 flex-col gap-y-4">
                    <div className="flex gap-x-3">
                        <div className="w-6">
                            <AddressIcon />
                        </div>
                        <div>
                            <div className="line-clamp-2 h-12">{base.address}</div>
                            <div className="text-sm text-gray-500/85">{base.coordinates.join(', ')}</div>
                        </div>
                    </div>
                    <div className="flex items-center gap-x-3">
                        <EnergyIcon />
                        <div>{base.power} кВт</div>
                    </div>
                    <div className="flex items-center gap-x-3">
                        <GeneratorIcon />
                        <div>{base.generators_count} шт.</div>
                    </div>
                </div>
            </div>
            {activeSubstationId === base.substation_id && (
                <>
                    <div className="mx-3 h-full border-l-2 border-dashed border-gray-400/50"></div>
                    <CarsOnBaseList />
                </>
            )}
        </div>
    );
});

export default BasesItem;
