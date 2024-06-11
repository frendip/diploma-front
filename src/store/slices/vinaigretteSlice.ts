import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Substation} from '../../types/substations.types';
import {Car} from '../../types/cars.types';

export type PanelACtiveType = 'substations' | 'bases';
interface VinaigretteState {
    status: Substation['status'] | 'all';
    activeSubstationId: number;
    activeCar: Car | null;
    panelActiveType: PanelACtiveType;
}

const initialState: VinaigretteState = {
    status: 'all',
    activeSubstationId: 0,
    activeCar: null,
    panelActiveType: 'substations'
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
        setActiveCar(state, action: PayloadAction<VinaigretteState['activeCar']>) {
            state.activeCar = action.payload;
        },
        setPanelActiveType(state, action: PayloadAction<VinaigretteState['panelActiveType']>) {
            state.panelActiveType = action.payload;
        }
    }
});

export const {setSubstationsStatus, setActiveSubstation, setPanelActiveType, setActiveCar} = vinaigretteSlice.actions;

export default vinaigretteSlice.reducer;
