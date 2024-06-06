import React, {useState, useEffect} from 'react';
import MapLayout from './MapLayout';
import {useLazyGetRouterQuery} from '../api/RouterService';
import type {RouterData} from '../types/map.types';
import MapSubstationMarker from './MapSubstationMarker';
import Route from './Route/Route';

interface DriversRoutesMapProps {
    className?: string;
}

function DriversRoutesMap({className: externalStyles}: DriversRoutesMapProps) {
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
            setRouter(data.route);
        };

        asyncFetchRoute();
    }, []);

    return (
        <div className={`${externalStyles}`}>
            <MapLayout>
                <MapSubstationMarker color="blue" coordinates={[37.6063, 55.7641989]} />
                <MapSubstationMarker color="red" coordinates={[37.616791, 55.7406]} />
                {router !== null && <Route router={router} />}
            </MapLayout>
        </div>
    );
}

export default DriversRoutesMap;
