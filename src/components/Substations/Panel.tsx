import {useCallback} from 'react';
import {useAppDispatch} from '../../hooks/useAppDispatch';
import {useAppSelector} from '../../hooks/useAppSelector';
import {setActiveSubstation} from '../../store/slices/vinaigretteSlice';
import CommonButton from '../UI/CommonButton';
import BasesList from './BasesList';
import List from './List';
import Status from './Status';
import Type from './Type';
import Search from '../UI/Search';

interface PanelProps {
    className?: string;
}

function Panel({className: externalStyles}: PanelProps) {
    const dispatch = useAppDispatch();
    const {activeSubstationId, panelActiveType} = useAppSelector((state) => state.vinaigretteSlice);

    const onClickHandler = useCallback(() => {
        dispatch(setActiveSubstation(0));
    }, [dispatch]);

    return (
        <div className={`${externalStyles} flex flex-col gap-y-4 bg-white/85 pt-2`}>
            <div className="flex items-center gap-x-10 px-14">
                <div className="flex flex-1 gap-x-10">
                    <Type />
                    {panelActiveType === 'substations' && <Status className="flex-1" />}
                </div>

                {activeSubstationId !== 0 && (
                    <CommonButton
                        text={`Сбросить выбранную ${panelActiveType === 'substations' ? 'подстанцию' : 'базу'}`}
                        onClick={onClickHandler}
                    />
                )}

                <Search />
            </div>
            {panelActiveType === 'substations' ? <List /> : <BasesList />}
        </div>
    );
}

export default Panel;
