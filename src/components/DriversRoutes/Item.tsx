import React, {useCallback, useState} from 'react';
import {ReactComponent as TruckImage} from '../../assets/truckImage.svg';
import {ReactComponent as InfoIcon} from '../../assets/info-icon.svg';
import {ReactComponent as PenIcon} from '../../assets/pen-icon.svg';
import {ReactComponent as TruckDriverIcon} from '../../assets/truck-driver-icon.svg';
import IconButton from '../UI/IconButton';
import {Car} from '../../types/cars.types';
import TwoAddresses from './TwoAddresses';
import StartAddress from './StartAddress';
import EndAddress from './EndAddress';
import {useAppDispatch} from '../../hooks/useAppDispatch';
import {useAppSelector} from '../../hooks/useAppSelector';
import {setActiveCarId} from '../../store/slices/vinaigretteSlice';
import PopupContainer from '../UI/PopupContainer/PopupContainer';
import DriverInfo from './DriverInfo';

interface ItemProps {
    car: Car;
}

const statusColorOption = {
    onBase: 'text-green-500',
    inWork: 'text-orange-300',
    delivered: 'text-indigo-600'
} as const;

const translateOption = {
    onBase: 'На базе',
    inWork: 'В работе',
    delivered: 'В пути'
};

function Item({car}: ItemProps) {
    const dispatch = useAppDispatch();

    const [isActivePopup, setIsActivePopup] = useState(false);

    const {activeCarId} = useAppSelector((state) => state.vinaigretteSlice);

    const onClickItemHandler = useCallback(
        (car: Car) => {
            dispatch(setActiveCarId(car.car_id));
        },
        [dispatch]
    );

    const onClickInfoHandler = useCallback(() => {
        setIsActivePopup((prev) => !prev);
    }, []);

    return (
        <div
            onClick={() => onClickItemHandler(car)}
            className={`flex cursor-pointer flex-col rounded-lg bg-white px-3 py-5 shadow ${activeCarId === car.car_id && 'shadow-active'}`}
        >
            <div className="flex justify-between">
                <div className="shrink-0 grow-0 basis-3/5">
                    <div className="text-sm font-medium text-gray-500/75">Перевозимый генератор</div>
                    <div>{car.generator_name}</div>
                    <div className={`${statusColorOption[car.status]}`}>{translateOption[car.status]}</div>
                </div>
                <TruckImage />
            </div>

            <div className="my-4 h-px w-full bg-gray-300/50" />

            {car.status === 'onBase' ? (
                <StartAddress substationId={car.base_id} />
            ) : car.status === 'inWork' ? (
                <EndAddress carId={car.car_id} />
            ) : (
                <TwoAddresses carId={car.car_id} />
            )}

            <div className="my-4 h-px w-full bg-gray-300/50" />

            <div className="flex items-center">
                <div className="mr-3 flex h-12 w-12 items-center justify-center overflow-hidden">
                    <TruckDriverIcon />
                </div>
                <div className="flex-1">
                    <div className="text-sm font-medium text-gray-500/75">Водитель</div>
                    <div className="font-medium">{car.driver_name}</div>
                </div>
                <div className="flex gap-x-2">
                    <IconButton variant="secondary" IconComponent={PenIcon} />
                    <IconButton variant="secondary" IconComponent={InfoIcon} onClick={onClickInfoHandler} />
                    <PopupContainer popupActive={isActivePopup} setPopupActive={setIsActivePopup}>
                        <DriverInfo car={car} />
                    </PopupContainer>
                </div>
            </div>
        </div>
    );
}

export default Item;
