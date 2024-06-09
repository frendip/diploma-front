import React, {useCallback, useState} from 'react';
import Type from './Type';
import Status from './Status';
import List from './List';
import {useAppDispatch} from '../../hooks/useAppDispatch';
import {useAppSelector} from '../../hooks/useAppSelector';
import CommonButton from '../UI/CommonButton';
import {setActiveSubstation} from '../../store/slices/substationsFilterSlice';

interface PanelProps {
    className?: string;
}

function Panel({className: externalStyles}: PanelProps) {
    const dispatch = useAppDispatch();
    const {activeId} = useAppSelector((state) => state.substationsFilterSlice);

    const onClickHandler = useCallback(() => {
        dispatch(setActiveSubstation(0));
    }, [dispatch]);

    return (
        <div className={`${externalStyles} flex flex-col gap-y-4 bg-white/85 pt-2`}>
            <div className="flex items-center gap-x-10 px-14">
                <Type />
                <Status className="flex-1" />
                {activeId !== 0 && <CommonButton text="Сбросить выбранную подстанцию" onClick={onClickHandler} />}
            </div>
            <List />
        </div>
    );
}

export default Panel;
