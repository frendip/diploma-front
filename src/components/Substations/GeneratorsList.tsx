import {useCallback} from 'react';
import GeneratorsItem from './GeneratorsItem';

import {useGetSubstationRepairCarsQuery} from '../../api/SubstationsService';
import {useAppDispatch} from '../../hooks/useAppDispatch';
import {useAppSelector} from '../../hooks/useAppSelector';
import {setSelectedCars} from '../../store/slices/vinaigretteSlice';
import {CarWithMatrix} from '../../types/cars.types';
const MAX_SELECTED_GENERATORS = 2;
interface GeneratorsListProps {
    substationId: number;
}

function GeneratorsList({substationId}: GeneratorsListProps) {
    const dispatch = useAppDispatch();

    const {data, isLoading} = useGetSubstationRepairCarsQuery(substationId);

    const {selectedCars, disabledCars} = useAppSelector((state) => state.vinaigretteSlice);

    const handleClickCheckBox = useCallback(
        (car: CarWithMatrix, isChecked: boolean) => {
            const updateSelectedCars = (selectedCars: CarWithMatrix[]) => {
                if (isChecked) {
                    return [...selectedCars, car];
                } else {
                    return selectedCars.filter((item) => item.car_id !== car.car_id);
                }
            };
            dispatch(setSelectedCars(updateSelectedCars(selectedCars)));
        },
        [dispatch, selectedCars]
    );

    const checkToDisabledCars = useCallback(
        (car: CarWithMatrix) => {
            return (
                (disabledCars && !selectedCars.some((generator) => generator.car_id === car.car_id)) ||
                (selectedCars.length >= MAX_SELECTED_GENERATORS &&
                    !selectedCars.some((generator) => generator.car_id === car.car_id))
            );
        },
        [disabledCars, selectedCars]
    );

    return (
        <div className="flex flex-col gap-y-3 overflow-y-auto overflow-x-hidden">
            {data &&
                data.data.map((car) => (
                    <GeneratorsItem
                        carWithMatrix={car}
                        key={car.car_id}
                        handleClickCheckBox={handleClickCheckBox}
                        disabled={checkToDisabledCars(car)}
                    />
                ))}
        </div>
    );
}

export default GeneratorsList;
