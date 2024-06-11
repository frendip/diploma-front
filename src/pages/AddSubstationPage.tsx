import {useCallback, useState} from 'react';
import Panel from '../components/AddSubstation/Panel';
import MapLayout, {DEFAULT_LOCATION} from '../components/MapLayout';
import MapSubstationMarker from '../components/MapSubstationMarker';
import {BehaviorMapEventHandler, MapEventUpdateHandler, YMapListener, YMapLocation} from '../lib/ymaps';

function AddSubstationPage() {
    const [location, setLocation] = useState<YMapLocation>(DEFAULT_LOCATION as YMapLocation);
    const [centerCoordinates, setCenterCoordinates] = useState<YMapLocation['center']>(
        (DEFAULT_LOCATION as YMapLocation).center
    );

    const onUpdateHandler: MapEventUpdateHandler = useCallback(({location}) => {
        setLocation(location);
    }, []);
    const onActionEndHandler: BehaviorMapEventHandler = useCallback(({location}) => {
        setCenterCoordinates(location.center);
    }, []);
    return (
        <>
            <Panel className="absolute bottom-0 left-0 z-50 w-add-substation-panel" coordinates={centerCoordinates} />
            <div className="absolute bottom-0 left-0 right-0 top-0">
                <MapLayout>
                    <YMapListener onUpdate={onUpdateHandler} onActionEnd={onActionEndHandler} />
                    <MapSubstationMarker color="green" coordinates={location.center}></MapSubstationMarker>
                </MapLayout>
            </div>
        </>
    );
}

export default AddSubstationPage;
