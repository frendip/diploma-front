import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Substation} from '../../types/substations.types';

interface SubstationsFilterState {
    status: Substation['status'] | 'all';
}

const initialState: SubstationsFilterState = {
    status: 'all'
};

const substationsFilterSlice = createSlice({
    name: 'substationsFilter',
    initialState,
    reducers: {
        setSubstationsStatus(state, action: PayloadAction<SubstationsFilterState>) {
            state.status = action.payload.status;
        }
    }
});

export const {setSubstationsStatus} = substationsFilterSlice.actions;

export default substationsFilterSlice.reducer;
