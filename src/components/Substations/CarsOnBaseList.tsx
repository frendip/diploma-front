import {useGetCarsQuery} from '../../api/CarsService';
import CarsOnBaseItem from './CarsOnRoadItem';

interface CarsOnBaseListProps {
    substation_id: number;
}

function CarsOnBaseList({substation_id}: CarsOnBaseListProps) {
    const {data, isLoading} = useGetCarsQuery(null);

    return (
        <div className="flex flex-col gap-y-3 overflow-y-auto overflow-x-hidden">
            <div className="flex flex-col gap-y-3 overflow-y-auto overflow-x-hidden">
                {data &&
                    data.data
                        .filter((car) => car.base_id === substation_id)
                        .map((car) => <CarsOnBaseItem car={car} key={car.car_id} />)}
            </div>
        </div>
    );
}

export default CarsOnBaseList;
