import {useEffect, useState} from 'react';
import MapLayout, {DEFAULT_LOCATION} from '../MapLayout';

import {ApiService} from '../../api/ApiService';
import {useGetCarsQuery} from '../../api/CarsService';
import {useAppDispatch} from '../../hooks/useAppDispatch';
import {useAppSelector} from '../../hooks/useAppSelector';
import {Car} from '../../types/cars.types';
import MapDriverMarker from '../MapDriverMarker';
import Route from './MapRoute';
import {Margin} from '../../lib/ymaps';

const MAP_MARGIN: Margin = [0, 100, 0, 0];
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
    }, [activeCar?.status]);

    return (
        <div className={`${externalStyles}`}>
            <MapLayout
                location={activeCar ? {...DEFAULT_LOCATION, center: activeCar.coordinates, zoom: 14} : DEFAULT_LOCATION}
                margin={MAP_MARGIN}
            >
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
