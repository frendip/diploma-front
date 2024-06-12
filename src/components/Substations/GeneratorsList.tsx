import {useCallback, useState} from 'react';
import GeneratorsItem from './GeneratorsItem';

import {useGetSubstationRepairCarsQuery} from '../../api/SubstationsService';

interface GeneratorsListProps {
    substationId: number;
    handleClickGenerator: (car_id: number, generator_power: number, isChecked: boolean) => void;
    disabled: boolean;
}

function GeneratorsList({substationId, handleClickGenerator, disabled}: GeneratorsListProps) {
    const {data, isLoading} = useGetSubstationRepairCarsQuery(substationId);
    const [selectedGenerators, setSelectedGenerators] = useState<{car_id: number; generator_power: number}[]>([]);
    const maxSelectedGenerators = 2;

    const handleClickCheckBox = useCallback(
        (car_id: number, generator_power: number, isChecked: boolean) => {
            handleClickGenerator(car_id, generator_power, isChecked);
            setSelectedGenerators((prevSelected) => {
                if (isChecked) {
                    return [...prevSelected, {car_id, generator_power}];
                } else {
                    return prevSelected.filter((item) => item.car_id !== car_id);
                }
            });
        },
        [handleClickGenerator]
    );

    return (
        <div className="flex flex-col gap-y-3 overflow-y-auto overflow-x-hidden">
            {data &&
                data.data.map((car) => (
                    <GeneratorsItem
                        carWithMatrix={car}
                        key={car.car_id}
                        handleClickCheckBox={handleClickCheckBox}
                        disabled={
                            (disabled && !selectedGenerators.some((generator) => generator.car_id === car.car_id)) ||
                            (selectedGenerators.length >= maxSelectedGenerators &&
                                !selectedGenerators.some((generator) => generator.car_id === car.car_id))
                        }
                    />
                ))}
        </div>
    );
}

export default GeneratorsList;
