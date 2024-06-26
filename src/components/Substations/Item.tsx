import {forwardRef, useCallback, useEffect, useMemo} from 'react';
import {useSetCarRouteMutation, useUpdateCarMutation} from '../../api/CarsService';
import {useDeleteSubstationMutation, useUpdateSubstationMutation} from '../../api/SubstationsService';
import {ReactComponent as AddressIcon} from '../../assets/address-icon.svg';
import {ReactComponent as EnergyIcon} from '../../assets/energy-icon.svg';
import {ReactComponent as SubstationGreen} from '../../assets/substation-marker-green.svg';
import {ReactComponent as SubstationRed} from '../../assets/substation-marker-red.svg';
import {ReactComponent as SubstationYellow} from '../../assets/substation-marker-yellow.svg';
import {ReactComponent as TransformerIcon} from '../../assets/transformer-icon.svg';
import {useAppDispatch} from '../../hooks/useAppDispatch';
import {useAppSelector} from '../../hooks/useAppSelector';
import {
    setActiveSubstation,
    setDisabledCars,
    setSelectedCars,
    setSubstationsStatus
} from '../../store/slices/vinaigretteSlice';
import {CarWithMatrix} from '../../types/cars.types';
import type {Substation} from '../../types/substations.types';
import CommonButton from '../UI/CommonButton';
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
    const {activeSubstationId, selectedCars} = useAppSelector((state) => state.vinaigretteSlice);

    const [deleteSubstation] = useDeleteSubstationMutation();
    const [updateCar] = useUpdateCarMutation();
    const [updateSubstation] = useUpdateSubstationMutation();
    const [setCarRoute] = useSetCarRouteMutation();

    const SubstationIcon = useMemo(() => substationIconOption[substation.status], [substation]);
    const maxAccumulatedPower = substation.power;

    const onClickGeneratorCallHandler = () => {
        const {substation_id, ...substationWithoutId} = substation;
        substationWithoutId['status'] = 'waiting';
        updateSubstation({substation_id, substationWithoutId});

        selectedCars.forEach((car) => {
            const {car_id, ...carWithoutId} = car;
            carWithoutId['status'] = 'delivered';
            updateCar({car_id, carWithoutId});

            setCarRoute({car_id, start_substation_id: carWithoutId.base_id, end_substation_id: substation_id});
        });
        dispatch(setActiveSubstation(0));
        dispatch(setSubstationsStatus('all'));
    };

    const onClickHandler = useCallback(
        (substationId: number) => {
            dispatch(setActiveSubstation(substationId));
        },
        [dispatch]
    );
    const onClickDeleteHandler = useCallback(
        //TODO: добавить проверку, удаляемая подстанция не является базой

        (substation_id: number, event: React.MouseEvent<HTMLButtonElement>) => {
            event.stopPropagation();
            deleteSubstation({substation_id});
            dispatch(setActiveSubstation(0));
        },
        [deleteSubstation, dispatch]
    );

    const sumGeneratorsPower = useCallback(() => {
        return selectedCars.reduce((accumulator: number, currentValue: CarWithMatrix) => {
            return accumulator + currentValue.generator_power;
        }, 0);
    }, [selectedCars]);

    useEffect(() => {
        if (activeSubstationId) {
            dispatch(setDisabledCars(sumGeneratorsPower() >= maxAccumulatedPower));
        }
    }, [activeSubstationId, dispatch, maxAccumulatedPower, sumGeneratorsPower, selectedCars]);

    useEffect(() => {
        dispatch(setDisabledCars(false));
        dispatch(setSelectedCars([]));
    }, [activeSubstationId, dispatch]);

    return (
        <div
            ref={ref}
            onClick={() => onClickHandler(substation.substation_id)}
            className={`flex h-72 cursor-pointer rounded-lg bg-white p-3 shadow ${activeSubstationId === substation.substation_id && 'shadow-active'}`}
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
                        <div>
                            {substation.power}
                            {substation.status === 'disabled' && activeSubstationId === substation.substation_id
                                ? `/${sumGeneratorsPower()} `
                                : ''}{' '}
                            кВт
                        </div>
                    </div>
                    <div className="flex items-center gap-x-3">
                        <TransformerIcon />
                        <div>2 шт.</div>
                    </div>
                </div>
                {substation.status === 'active' && activeSubstationId === substation.substation_id ? (
                    <div className="self-center">
                        <CommonButton
                            onClick={(e) => onClickDeleteHandler(substation.substation_id, e)}
                            text={'Удалить подстанцию'}
                        />
                    </div>
                ) : substation.status === 'disabled' &&
                  activeSubstationId === substation.substation_id &&
                  sumGeneratorsPower() >= maxAccumulatedPower ? (
                    <div className="self-center">
                        <CommonButton text={'Вызвать генераторы'} onClick={onClickGeneratorCallHandler} />
                    </div>
                ) : (
                    ''
                )}
            </div>
            {activeSubstationId === substation.substation_id &&
                (substation.status === 'disabled' ? (
                    <>
                        <div className="mx-3 h-full border-l-2 border-dashed border-gray-400/50"></div>
                        <GeneratorsList substationId={substation.substation_id} />
                    </>
                ) : substation.status === 'waiting' ? (
                    <>
                        <div className="mx-3 h-full border-l-2 border-dashed border-gray-400/50"></div>{' '}
                        <CarsOnRoadList />
                    </>
                ) : (
                    <></>
                ))}
        </div>
    );
});

export default Item;
