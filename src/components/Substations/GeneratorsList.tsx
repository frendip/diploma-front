import React from 'react';
import GeneratorsItem from './GeneratorsItem';

import {useGetSubstationRepairCarsQuery} from '../../api/SubstationsService';

interface GeneratorsListProps {
    substationId: number;
}

function GeneratorsList({substationId}: GeneratorsListProps) {
    const {data, isLoading} = useGetSubstationRepairCarsQuery(substationId);

    console.log(data);

    return (
        <div className="flex flex-col gap-y-3 overflow-y-auto overflow-x-hidden">
            {data && data.data.map((car) => <GeneratorsItem carWithMatrix={car} key={car.car_id} />)}
        </div>
    );
}

export default GeneratorsList;
