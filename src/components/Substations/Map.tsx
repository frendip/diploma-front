import React, {useCallback} from 'react';
import MapLayout from '../MapLayout';
import {useGetSubstationsQuery} from '../../api/SubstationsService';
import MapSubstationMarker from '../MapSubstationMarker';
import {useAppSelector} from '../../hooks/useAppSelector';
import {useAppDispatch} from '../../hooks/useAppDispatch';
import {setActiveSubstation} from '../../store/slices/substationsFilterSlice';

interface MapProps {
    className?: string;
}

const markerColorOption = {
    active: 'green',
    waiting: 'yellow',
    disabled: 'red'
} as const;

function Map({className: externalStyles}: MapProps) {
    const dispatch = useAppDispatch();

    const {status, activeId} = useAppSelector((state) => state.substationsFilterSlice);
    const {data, isLoading} = useGetSubstationsQuery({status});

    const onClickHandler = useCallback(
        (substationId: number) => {
            dispatch(setActiveSubstation(substationId));
        },
        [dispatch]
    );

    return (
        <div className={`${externalStyles}`}>
            <MapLayout>
                {!isLoading &&
                    data?.data.map((substation) => (
                        <MapSubstationMarker
                            key={substation.substation_id}
                            isActive={substation.substation_id === activeId}
                            color={markerColorOption[substation.status]}
                            coordinates={substation.coordinates}
                            onClick={() => onClickHandler(substation.substation_id)}
                        />
                    ))}
            </MapLayout>
        </div>
    );
}

export default Map;
