import React, {useEffect, useState} from 'react';
import MapLayout from '../MapLayout';

import Route from './MapRoute';
import {useAppSelector} from '../../hooks/useAppSelector';
import MapDriverMarker from '../MapDriverMarker';
import {useGetCarsQuery} from '../../api/CarsService';
import {Car} from '../../types/cars.types';
import {ApiService} from '../../api/ApiService';
import {useAppDispatch} from '../../hooks/useAppDispatch';

interface MapProps {
    className?: string;
}

function Map({className: externalStyles}: MapProps) {
    const dispatch = useAppDispatch();

    const {activeCarId} = useAppSelector((state) => state.vinaigretteSlice);
    const {data} = useGetCarsQuery(null);

    const [activeCar, setActiveCar] = useState<Car | null>(null);

    useEffect(() => {
        if (activeCarId && data) {
            const fetchActiveCar = async () => {
                const activeCar = data.data.find((car) => car.car_id === activeCarId);

                if (activeCar) setActiveCar(activeCar);
            };

            fetchActiveCar();
        }
    }, [data, activeCarId]);

    useEffect(() => {
        dispatch(ApiService.util.invalidateTags(['Route']));
        console.log(activeCar?.status);
    }, [activeCar?.status]);

    return (
        <div className={`${externalStyles}`}>
            <MapLayout>
                {activeCar && (
                    <>
                        {activeCar.status === 'delivered' && <Route car={activeCar} />}
                        <MapDriverMarker coordinates={activeCar.coordinates} />
                    </>
                )}
            </MapLayout>
        </div>
    );
}

export default Map;
