import {useEffect, useMemo, useState} from 'react';
import {useGetCarRouteQuery} from '../../api/CarsService';
import {YMapFeature} from '../../lib/ymaps';
import type {Car} from '../../types/cars.types';
import type {RouterData} from '../../types/map.types';
import MapSubstationMarker from '../MapSubstationMarker';
import {findNearestIndex, getFeatureCoordinates, getFeatureGeometry, getFeatureStyle} from './utils';

interface RouteProps {
    car: Car;
}

function Route({car}: RouteProps) {
    const [router, setRouter] = useState<RouterData | null>(null);
    const {data, isLoading} = useGetCarRouteQuery(car.car_id);

    useEffect(() => {
        if (data) {
            setRouter(data.data.route);
        }
    }, [data]);

    const routeFeatures = useMemo(() => {
        if (router) {
            const nearIndexToDriver = car.coordinates ? findNearestIndex(router.points, car.coordinates) : 0;

            return {
                remaining: {
                    geometry: getFeatureGeometry(getFeatureCoordinates(router.points, nearIndexToDriver, true)),
                    style: getFeatureStyle('#5932EA')
                },
                past: {
                    geometry: getFeatureGeometry(getFeatureCoordinates(router.points, nearIndexToDriver)),
                    style: getFeatureStyle('#808080')
                }
            };
        }
    }, [router, car]);

    return (
        <>
            {router && (
                <>
                    <MapSubstationMarker color="blue" coordinates={data!.data.start_substation.coordinates} />
                    <MapSubstationMarker color="red" coordinates={data!.data.end_substation.coordinates} />
                    <YMapFeature geometry={routeFeatures!.remaining.geometry} style={routeFeatures!.remaining.style} />
                    <YMapFeature geometry={routeFeatures!.past.geometry} style={routeFeatures!.past.style} />
                </>
            )}
        </>
    );
}

export default Route;
