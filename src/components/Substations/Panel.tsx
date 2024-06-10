import {useCallback} from 'react';
import {useAppDispatch} from '../../hooks/useAppDispatch';
import {useAppSelector} from '../../hooks/useAppSelector';
import {setActiveSubstation} from '../../store/slices/substationsFilterSlice';
import CommonButton from '../UI/CommonButton';
import BasesList from './BasesList';
import List from './List';
import Status from './Status';
import Type from './Type';

interface PanelProps {
    className?: string;
}

function Panel({className: externalStyles}: PanelProps) {
    const dispatch = useAppDispatch();
    const {activeId, panelActiveType} = useAppSelector((state) => state.substationsFilterSlice);

    const onClickHandler = useCallback(() => {
        dispatch(setActiveSubstation(0));
    }, [dispatch]);

    return (
        <div className={`${externalStyles} flex flex-col gap-y-4 bg-white/85 pt-2`}>
            <div className="flex items-center justify-between gap-x-10 px-14">
                <Type />
                {panelActiveType === 'substations' && <Status className="flex-1" />}

                {activeId !== 0 && <CommonButton text="Сбросить выбранную подстанцию" onClick={onClickHandler} />}
            </div>
            {panelActiveType === 'substations' ? <List /> : <BasesList />}
        </div>
    );
}

export default Panel;
