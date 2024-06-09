import {configureStore} from '@reduxjs/toolkit';
import {ApiService} from '../api/ApiService';
import substationsFilterSlice from './slices/substationsFilterSlice';

const store = configureStore({
    reducer: {
        [ApiService.reducerPath]: ApiService.reducer,
        substationsFilterSlice: substationsFilterSlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(ApiService.middleware)
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
