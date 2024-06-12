import type {CarWithMatrix} from '../../types/cars.types';

interface GeneratorsItemProps {
    carWithMatrix: CarWithMatrix;
}

const statusColorOption = {
    green: 'text-green-500',
    red: 'text-red-500',
    orange: 'text-orange-300',
    indigo: 'text-indigo-600',
    black: 'text-black'
} as const;

function GeneratorsItem({carWithMatrix}: GeneratorsItemProps) {
    return (
        <label
            className="flex w-96 items-center gap-4 rounded-lg border border-solid border-active px-2 py-1"
            htmlFor={String(carWithMatrix.car_id)}
        >
            <div>
                <div className="text-sm font-medium text-gray-500/75">{carWithMatrix.base_name}</div>
                <div>{carWithMatrix.generator_name}</div>
            </div>
            <div>{carWithMatrix.generator_power}кВт</div>
            <div className="flex-1 text-nowrap">{carWithMatrix.duration_time} min</div>
            <div className={`${statusColorOption['green']}`}>Готов</div>
            <input type="checkbox" id={String(carWithMatrix.car_id)} />
        </label>
    );
}

export default GeneratorsItem;
