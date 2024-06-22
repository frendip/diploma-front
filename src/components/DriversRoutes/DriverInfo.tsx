import React, {useEffect, useState} from 'react';
import {Car} from '../../types/cars.types';
import {useGetSubstationByIdQuery} from '../../api/SubstationsService';
import {ReactComponent as TruckDriverIcon} from '../../assets/truck-driver-icon.svg';
import CommonButton from '../UI/CommonButton';

interface DriverInfoProps {
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

function DriverInfo({car}: DriverInfoProps) {
    const {data: baseData} = useGetSubstationByIdQuery(car.base_id);

    // Жесткие костыли для демонстрации
    const [localCar, setLocalCar] = useState(car);
    const [localBase, setLocalBase] = useState(baseData?.data);
    const [localNumber, setLocalNumber] = useState('+7 982 133-23-22');
    const [localMail, setLocalMail] = useState('dgu-driver32@yandex.ru');

    useEffect(() => {
        if (baseData) {
            setLocalBase(baseData.data);
        }
    }, [baseData]);

    const [isEdit, setIsEdit] = useState(false);

    const onClickHandler = () => {
        setIsEdit((prev) => !prev);
    };

    return (
        <div className="flex flex-col gap-y-7">
            <div className="flex items-start gap-x-4">
                <TruckDriverIcon width={75} height={75} />
                <div className="flex-1">
                    {isEdit ? (
                        <input
                            className="w-44 rounded-lg pl-1 font-medium shadow shadow-active focus:outline-none"
                            type="text"
                            onChange={(ev) => setLocalCar((prev) => ({...prev, driver_name: ev.target.value}))}
                            value={localCar.driver_name}
                        />
                    ) : (
                        <div className="text-lg font-medium">{localCar.driver_name}</div>
                    )}
                    <div className={`${statusColorOption[localCar.status]}`}>{translateOption[localCar.status]}</div>
                </div>
                {isEdit ? (
                    <CommonButton onClick={onClickHandler} text="Сохранить изменения" />
                ) : (
                    <CommonButton onClick={onClickHandler} text="Редактировать" />
                )}
            </div>
            <div className="flex justify-between">
                <div className="flex max-w-[55%] flex-col gap-y-2">
                    <div className="flex gap-x-2 font-medium">
                        <span className="text-gray-500/75">Перевозимый генератор:</span>
                        {isEdit ? (
                            <input
                                className="w-28 rounded-lg pl-1 shadow shadow-active focus:outline-none"
                                type="text"
                                onChange={(ev) => setLocalCar((prev) => ({...prev, generator_name: ev.target.value}))}
                                value={localCar.generator_name}
                            />
                        ) : (
                            <span>{localCar.generator_name}</span>
                        )}
                    </div>
                    <div className="flex gap-x-2 font-medium">
                        <span className="text-gray-500/75">Мощность перевозимого генератор:</span>
                        {isEdit ? (
                            <input
                                className="w-9 rounded-lg pl-1 shadow shadow-active focus:outline-none"
                                type="text"
                                onChange={(ev) => setLocalCar((prev) => ({...prev, generator_power: +ev.target.value}))}
                                value={localCar.generator_power}
                            />
                        ) : (
                            <span>{localCar.generator_power} кВт</span>
                        )}
                    </div>
                    <div className="flex gap-x-2 font-medium">
                        <span className="text-gray-500/75">Местоположение:</span>
                        <span className="truncate">{localBase?.address}</span>
                    </div>
                    <div className="flex gap-x-2 font-medium">
                        <span className="text-gray-500/75">База:</span>
                        <span className="truncate">{localBase?.name}</span>
                    </div>
                </div>
                <div className="flex flex-col gap-y-2">
                    <div className="flex gap-x-2 font-medium">
                        <span className="text-gray-500/75">Номер:</span>
                        {isEdit ? (
                            <input
                                className="w-36 rounded-lg pl-1 shadow shadow-active focus:outline-none"
                                type="text"
                                onChange={(ev) => setLocalNumber(ev.target.value)}
                                value={localNumber}
                            />
                        ) : (
                            <span>{localNumber}</span>
                        )}
                    </div>
                    <div className="flex gap-x-2 font-medium">
                        <span className="text-gray-500/75">Email:</span>
                        {isEdit ? (
                            <input
                                className="w-48 rounded-lg pl-1 shadow shadow-active focus:outline-none"
                                type="text"
                                onChange={(ev) => setLocalMail(ev.target.value)}
                                value={localMail}
                            />
                        ) : (
                            <span>{localMail}</span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DriverInfo;
