import React, {useState, useEffect} from 'react';
import MapLayout from '../MapLayout';
import {useLazyGetRouterQuery} from '../../api/RouterService';
import type {RouterData} from '../../types/map.types';
import MapSubstationMarker from '../MapSubstationMarker';
import Route from './MapRoute';
import {useAppSelector} from '../../hooks/useAppSelector';

interface MapProps {
    className?: string;
}

function Map({className: externalStyles}: MapProps) {
    const [router, setRouter] = useState<RouterData | null>(null);

    const [getRouter] = useLazyGetRouterQuery();

    useEffect(() => {
        const asyncFetchRoute = async () => {
            const data = await getRouter({
                waypoints: [
                    [37.6063, 55.7641989],
                    [37.616791, 55.7406]
                ]
            }).unwrap();
            setRouter(data.data);
        };

        asyncFetchRoute();
    }, []);

    const {activeCar} = useAppSelector((state) => state.vinaigretteSlice);

    return (
        <div className={`${externalStyles}`}>
            <MapLayout>{activeCar?.status === 'delivered' && <Route car={activeCar} />}</MapLayout>
        </div>
    );
}

export default Map;
