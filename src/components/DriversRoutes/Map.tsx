import React, {useState, useEffect} from 'react';
import MapLayout from '../MapLayout';
import {useLazyGetRouterQuery} from '../../api/RouterService';
import type {RouterData} from '../../types/map.types';
import MapSubstationMarker from '../MapSubstationMarker';
import Route from './MapRoute';
import {useAppSelector} from '../../hooks/useAppSelector';
import MapDriverMarker from '../MapDriverMarker';

interface MapProps {
    className?: string;
}

function Map({className: externalStyles}: MapProps) {
    const {activeCar} = useAppSelector((state) => state.vinaigretteSlice);

    return (
        <div className={`${externalStyles}`}>
            <MapLayout>
                {activeCar && (
                    <>
                        {activeCar.status === 'delivered' && <Route car={activeCar} />}{' '}
                        <MapDriverMarker coordinates={activeCar.coordinates} />
                    </>
                )}
            </MapLayout>
        </div>
    );
}

export default Map;
