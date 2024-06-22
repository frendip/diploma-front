import {useCallback, useState} from 'react';
import Map from '../components/AddSubstation/Map';
import Panel from '../components/AddSubstation/Panel';
import {DEFAULT_LOCATION} from '../components/MapLayout';
import {BehaviorMapEventHandler, LngLat, MapEventUpdateHandler, YMapLocation} from '../lib/ymaps';

function AddSubstationPage() {
    const [location, setLocation] = useState<YMapLocation>(DEFAULT_LOCATION as YMapLocation);
    const [centerCoordinates, setCenterCoordinates] = useState<YMapLocation['center']>(
        (DEFAULT_LOCATION as YMapLocation).center
    );

    const onUpdateHandler: MapEventUpdateHandler = useCallback(({location}) => {
        setLocation(location);
    }, []);
    const onActionEndHandler: BehaviorMapEventHandler = useCallback(({location}) => {
        const fixCoordinates: LngLat = [+location.center[0].toFixed(6), +location.center[1].toFixed(6)];
        setCenterCoordinates(fixCoordinates);
    }, []);
    return (
        <>
            <Panel
                className="absolute bottom-0 left-0 z-50 h-add-substation-panel w-add-substation-panel overflow-hidden"
                coordinates={centerCoordinates}
            />
            <Map onActionEndHandler={onActionEndHandler} onUpdateHandler={onUpdateHandler} location={location} />
        </>
    );
}

export default AddSubstationPage;
