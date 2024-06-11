import {useAppDispatch} from '../../hooks/useAppDispatch';
import {useAppSelector} from '../../hooks/useAppSelector';
import {setPanelActiveType} from '../../store/slices/vinaigretteSlice';
import SelectorButton from '../UI/SelectorButton';

function Type() {
    const dispatch = useAppDispatch();

    const {panelActiveType} = useAppSelector((state) => state.vinaigretteSlice);

    return (
        <div>
            <SelectorButton
                position="left"
                text="Все подстанции"
                isActive={panelActiveType === 'substations'}
                onClick={() => dispatch(setPanelActiveType('substations'))}
            />
            <SelectorButton
                position="right"
                text="Базы"
                isActive={panelActiveType === 'bases'}
                onClick={() => dispatch(setPanelActiveType('bases'))}
            />
        </div>
    );
}

export default Type;
