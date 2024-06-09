import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Substation} from '../../types/substations.types';

interface SubstationsFilterState {
    status: Substation['status'] | 'all';
    activeId: number;
}

const initialState: SubstationsFilterState = {
    status: 'all',
    activeId: 0
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
        }
    }
});

export const {setSubstationsStatus, setActiveSubstation} = substationsFilterSlice.actions;

export default substationsFilterSlice.reducer;
