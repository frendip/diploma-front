import {BehaviorMapEventHandler, MapEventUpdateHandler, YMapListener, YMapLocation} from '../../lib/ymaps';
import MapLayout from '../MapLayout';
import MapSubstationMarker from '../MapSubstationMarker';

interface MapProps {
    onUpdateHandler: MapEventUpdateHandler;
    onActionEndHandler: BehaviorMapEventHandler;
    location: YMapLocation;
}

function Map({onUpdateHandler, onActionEndHandler, location}: MapProps) {
    return (
        <div className="absolute bottom-0 left-0 right-0 top-0">
            <MapLayout>
                <YMapListener onUpdate={onUpdateHandler} onActionEnd={onActionEndHandler} />
                <MapSubstationMarker color="green" coordinates={location.center}></MapSubstationMarker>
            </MapLayout>
        </div>
    );
}

export default Map;
