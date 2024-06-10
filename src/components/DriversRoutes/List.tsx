import React from 'react';
import Item from './Item';
import {useGetCarsQuery} from '../../api/CarsService';

interface ListProps {
    className?: string;
}

function List({className: externalStyles}: ListProps) {
    const {data, isLoading} = useGetCarsQuery(null);

    return (
        <div className={`${externalStyles} flex flex-col gap-y-4 overflow-auto bg-white/85 px-4 py-9`}>
            {data?.data.map((car) => <Item car={car} key={car.car_id} />)}
        </div>
    );
}

export default List;
