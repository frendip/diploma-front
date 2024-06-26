import {Car} from '../../types/cars.types';

const statusColorOption = {
    onBase: 'text-green-500',
    broken: 'text-red-500',
    inWork: 'text-orange-300',
    delivered: 'text-indigo-600'
} as const;

interface CarsOnBaseItemProps {
    car: Car;
}

function CarsOnBaseItem({car}: CarsOnBaseItemProps) {
    return (
        <div className="flex w-96 flex-col rounded-lg border border-solid border-active px-4 py-3">
            <div className="flex justify-between">
                <div className="">Генератор: </div>
                <div>{car.generator_name}</div>
            </div>
            <div className="flex justify-between">
                <div>Мощность:</div>
                <div>{car.generator_power} кВт</div>
            </div>
            {car.status === 'delivered' && (
                <div className="flex justify-between">
                    <div>Оставшееся время в пути:</div>
                    <div>30 мин</div>
                </div>
            )}

            <div className="flex justify-between">
                <div>Статус:</div>

                <div className={`${statusColorOption[car.status]}`}>{car.status}</div>
            </div>
        </div>
    );
}

export default CarsOnBaseItem;
