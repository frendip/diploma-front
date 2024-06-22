import {useCallback, useState} from 'react';
import Map from '../components/AddCar/Map';
import Panel from '../components/AddCar/Panel';
import {useGetBasesQuery} from '../api/SubstationsService';

function AddCarPage() {
    const {data: basesData} = useGetBasesQuery(null);

    const [activeBaseId, setActiveBaseId] = useState(0);

    return (
        <>
            {basesData && (
                <>
                    <Panel
                        className="absolute bottom-0 left-0 z-50 h-add-substation-panel w-add-substation-panel overflow-hidden"
                        bases={basesData.data}
                        setActiveBaseId={setActiveBaseId}
                    />
                    <Map activeBaseId={activeBaseId} bases={basesData?.data} />
                </>
            )}
        </>
    );
}

export default AddCarPage;
