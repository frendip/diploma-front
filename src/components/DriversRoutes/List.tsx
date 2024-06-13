import React, {useEffect} from 'react';
import Item from './Item';
import {useGetCarsQuery} from '../../api/CarsService';
import {useAppDispatch} from '../../hooks/useAppDispatch';
import {setActiveCarId} from '../../store/slices/vinaigretteSlice';

interface ListProps {
    className?: string;
}

function List({className: externalStyles}: ListProps) {
    const {data, isLoading} = useGetCarsQuery(null);

    const dispatch = useAppDispatch();

    useEffect(() => {
        return () => {
            dispatch(setActiveCarId(0));
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className={`${externalStyles} flex flex-col gap-y-4 overflow-auto bg-white/85 px-4 py-9`}>
            {data?.data.map((car) => <Item car={car} key={car.car_id} />)}
        </div>
    );
}

export default List;
