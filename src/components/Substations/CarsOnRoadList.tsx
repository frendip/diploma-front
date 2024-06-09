import CarsOnRoadItem from './CarsOnRoadItem';

function CarsOnRoadList() {
    return (
        <div className="flex flex-col gap-y-3 overflow-y-auto overflow-x-hidden">
            <div className="flex flex-col gap-y-3 overflow-y-auto overflow-x-hidden">
                <CarsOnRoadItem
                    car={{
                        car_id: 1,
                        coordinates: [1, 1],
                        status: 'delivered',
                        driver_name: '',
                        generator_power: 300,
                        generator_name: 'Пувел мудень',
                        base_id: 1
                    }}
                />
                <CarsOnRoadItem
                    car={{
                        car_id: 1,
                        coordinates: [1, 1],
                        status: 'inWork',
                        driver_name: '',
                        generator_power: 300,
                        generator_name: 'Пувел лох',
                        base_id: 1
                    }}
                />
            </div>
        </div>
    );
}

export default CarsOnRoadList;
