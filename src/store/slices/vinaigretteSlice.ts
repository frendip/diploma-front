import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Car, CarWithMatrix} from '../../types/cars.types';
import {Substation} from '../../types/substations.types';

export type PanelACtiveType = 'substations' | 'bases';
interface VinaigretteState {
    status: Substation['status'] | 'all';
    activeSubstationId: number;
    activeCarId: number;
    panelActiveType: PanelACtiveType;
    disabledCars: boolean;
    selectedCars: CarWithMatrix[];
}

const initialState: VinaigretteState = {
    status: 'all',
    activeSubstationId: 0,
    activeCarId: 0,
    panelActiveType: 'substations',
    disabledCars: false,
    selectedCars: []
};

const vinaigretteSlice = createSlice({
    name: 'vinaigrette',
    initialState,
    reducers: {
        setSubstationsStatus(state, action: PayloadAction<VinaigretteState['status']>) {
            state.status = action.payload;
        },
        setActiveSubstation(state, action: PayloadAction<VinaigretteState['activeSubstationId']>) {
            state.activeSubstationId = action.payload;
        },
        setActiveCarId(state, action: PayloadAction<VinaigretteState['activeCarId']>) {
            state.activeCarId = action.payload;
        },
        setPanelActiveType(state, action: PayloadAction<VinaigretteState['panelActiveType']>) {
            state.panelActiveType = action.payload;
        },
        setSelectedCars(state, action: PayloadAction<VinaigretteState['selectedCars']>) {
            state.selectedCars = action.payload;
        },
        setDisabledCars(state, action: PayloadAction<VinaigretteState['disabledCars']>) {
            state.disabledCars = action.payload;
        }
    }
});

export const {
    setSubstationsStatus,
    setActiveSubstation,
    setPanelActiveType,
    setActiveCarId,
    setSelectedCars,
    setDisabledCars
} = vinaigretteSlice.actions;

export default vinaigretteSlice.reducer;
