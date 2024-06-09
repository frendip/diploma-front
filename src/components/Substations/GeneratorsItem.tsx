import {useMemo} from 'react';

const statusColorOption = {
    green: 'text-green-500',
    red: 'text-red-500',
    orange: 'text-orange-300',
    indigo: 'text-indigo-600',
    black: 'text-black'
} as const;

function GeneratorsItem() {
    const rand = useMemo(() => Math.random(), []);

    return (
        <label
            className="flex w-96 items-center gap-4 rounded-lg border border-solid border-active px-2 py-1"
            htmlFor={String(rand)}
        >
            <div>
                <div className="text-sm font-medium text-gray-500/75">Генератор</div>
                <div>CLine CDS770</div>
            </div>
            <div>300кВт</div>
            <div className="flex-1 text-nowrap">30 min</div>
            <div className={`${statusColorOption['green']}`}>Готов</div>
            <input type="checkbox" id={String(rand)} />
        </label>
    );
}

export default GeneratorsItem;
