import React, {useMemo, useEffect, useState} from 'react';
import {YMapFeature} from '../../lib/ymaps';
import {findNearestIndex, getFeatureGeometry, getFeatureCoordinates, getFeatureStyle} from './utils';
import type {RouterData} from '../../types/map.types';
import type {LngLat} from '../../lib/ymaps';
import type {Car} from '../../types/cars.types';
import {useGetCarRouteQuery} from '../../api/CarsService';
import {useLazyGetRouterQuery} from '../../api/RouterService';
import MapSubstationMarker from '../MapSubstationMarker';

interface RouteProps {
    car: Car;
    driverCoordinates?: LngLat;
}

function Route({car, driverCoordinates}: RouteProps) {
    const [router, setRouter] = useState<RouterData | null>(null);
    const {data, isLoading} = useGetCarRouteQuery(car.car_id);

    const [getRouter] = useLazyGetRouterQuery();

    useEffect(() => {
        const fetchRouter = async () => {
            if (data) {
                const startPoint = data.data.start_substation.coordinates;
                const endPoint = data.data.end_substation.coordinates;

                const routerData = await getRouter({
                    waypoints: [startPoint, endPoint]
                }).unwrap();
                setRouter(routerData.data);
            }
        };

        fetchRouter();
    }, [data, getRouter]);

    const routeFeatures = useMemo(() => {
        if (router) {
            const nearIndexToDriver = driverCoordinates ? findNearestIndex(router.points, driverCoordinates) : 0;

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
    }, [router, driverCoordinates]);

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
