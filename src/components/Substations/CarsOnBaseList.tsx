import CarsOnBaseItem from './CarsOnRoadItem';

function CarsOnBaseList() {
    return (
        <div className="flex flex-col gap-y-3 overflow-y-auto overflow-x-hidden">
            <div className="flex flex-col gap-y-3 overflow-y-auto overflow-x-hidden">
                <CarsOnBaseItem
                    car={{
                        car_id: 1,
                        coordinates: [1, 1],
                        status: 'delivered',
                        driver_name: '',
                        generator_power: 300,
                        generator_name: 'Генератор 1',
                        base_id: 1
                    }}
                />
                <CarsOnBaseItem
                    car={{
                        car_id: 1,
                        coordinates: [1, 1],
                        status: 'inWork',
                        driver_name: '',
                        generator_power: 300,
                        generator_name: 'Генератор 2',
                        base_id: 1
                    }}
                />
                <CarsOnBaseItem
                    car={{
                        car_id: 1,
                        coordinates: [1, 1],
                        status: 'onBase',
                        driver_name: '',
                        generator_power: 300,
                        generator_name: 'Генератор 3',
                        base_id: 1
                    }}
                />
                <CarsOnBaseItem
                    car={{
                        car_id: 1,
                        coordinates: [1, 1],
                        status: 'inWork',
                        driver_name: '',
                        generator_power: 300,
                        generator_name: 'Генератор 4',
                        base_id: 1
                    }}
                />
            </div>
        </div>
    );
}

export default CarsOnBaseList;
