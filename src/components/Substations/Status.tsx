import React, {useCallback} from 'react';
import SelectorButton from '../UI/SelectorButton';
import {Substation} from '../../types/substations.types';
import {useAppDispatch} from '../../hooks/useAppDispatch';
import {useAppSelector} from '../../hooks/useAppSelector';
import {setSubstationsStatus} from '../../store/slices/vinaigretteSlice';

interface StatusProps {
    className?: string;
}

function Status({className: externalStyles}: StatusProps) {
    const dispatch = useAppDispatch();
    const {status} = useAppSelector((state) => state.vinaigretteSlice);

    const onClickHandler = useCallback(
        (status: Substation['status'] | 'all') => {
            dispatch(setSubstationsStatus(status));
        },
        [dispatch]
    );

    return (
        <div className={`${externalStyles}`}>
            <SelectorButton
                position="left"
                text="Все"
                isActive={status === 'all'}
                onClick={() => onClickHandler('all')}
            />
            <SelectorButton
                position="center"
                text="Рабочие"
                textColor="green"
                isActive={status === 'active'}
                onClick={() => onClickHandler('active')}
            />
            <SelectorButton
                position="center"
                text="Сломанные"
                textColor="red"
                isActive={status === 'disabled'}
                onClick={() => onClickHandler('disabled')}
            />
            <SelectorButton
                position="right"
                text="Ожидающие"
                textColor="orange"
                isActive={status === 'waiting'}
                onClick={() => onClickHandler('waiting')}
            />
        </div>
    );
}

export default Status;
