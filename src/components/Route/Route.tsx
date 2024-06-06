import React, {useMemo} from 'react';
import {YMapFeature} from '../../lib/ymaps';
import {findNearestIndex, getFeatureGeometry, getFeatureCoordinates, getFeatureStyle} from './utils';
import type {RouterData} from '../../types/map.types';
import type {LngLat} from '../../lib/ymaps';

interface RouteProps {
    router: RouterData;
    driverCoordinates?: LngLat;
}

function Route({router, driverCoordinates}: RouteProps) {
    const routeFeatures = useMemo(() => {
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
    }, [router, driverCoordinates]);

    return (
        <>
            <YMapFeature geometry={routeFeatures.remaining.geometry} style={routeFeatures.remaining.style} />
            <YMapFeature geometry={routeFeatures.past.geometry} style={routeFeatures.past.style} />
        </>
    );
}

export default Route;
