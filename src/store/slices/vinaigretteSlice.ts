import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Substation} from '../../types/substations.types';

export type PanelACtiveType = 'substations' | 'bases';
interface VinaigretteState {
    status: Substation['status'] | 'all';
    activeSubstationId: number;
    panelActiveType: PanelACtiveType;
}

const initialState: VinaigretteState = {
    status: 'all',
    activeSubstationId: 0,
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
        setPanelActiveType(state, action: PayloadAction<VinaigretteState['panelActiveType']>) {
            state.panelActiveType = action.payload;
        }
    }
});

export const {setSubstationsStatus, setActiveSubstation, setPanelActiveType} = vinaigretteSlice.actions;

export default vinaigretteSlice.reducer;
