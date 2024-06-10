import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Substation} from '../../types/substations.types';

export type PanelACtiveType = 'substations' | 'bases';
interface SubstationsFilterState {
    status: Substation['status'] | 'all';
    activeId: number;
    panelActiveType: PanelACtiveType;
}

const initialState: SubstationsFilterState = {
    status: 'all',
    activeId: 0,
    panelActiveType: 'substations'
};

const substationsFilterSlice = createSlice({
    name: 'substationsFilter',
    initialState,
    reducers: {
        setSubstationsStatus(state, action: PayloadAction<SubstationsFilterState['status']>) {
            state.status = action.payload;
        },
        setActiveSubstation(state, action: PayloadAction<SubstationsFilterState['activeId']>) {
            state.activeId = action.payload;
        },
        setPanelActiveType(state, action: PayloadAction<SubstationsFilterState['panelActiveType']>) {
            state.panelActiveType = action.payload;
        }
    }
});

export const {setSubstationsStatus, setActiveSubstation, setPanelActiveType} = substationsFilterSlice.actions;

export default substationsFilterSlice.reducer;
