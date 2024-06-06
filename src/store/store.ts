import {configureStore} from '@reduxjs/toolkit';
import {ApiService} from '../api/ApiService';

const store = configureStore({
    reducer: {
        [ApiService.reducerPath]: ApiService.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(ApiService.middleware)
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
