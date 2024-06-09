import {Dispatch, SetStateAction} from 'react';
import SelectorButton from '../UI/SelectorButton';
import {PanelACtiveType} from './Panel';

interface TypeProps {
    activeList: string;
    setActiveList: Dispatch<SetStateAction<PanelACtiveType>>;
}

function Type({activeList, setActiveList}: TypeProps) {
    return (
        <div>
            <SelectorButton
                position="left"
                text="Все подстанции"
                isActive={activeList === 'substations'}
                onClick={() => setActiveList('substations')}
            />
            <SelectorButton
                position="right"
                text="Базы"
                isActive={activeList === 'bases'}
                onClick={() => setActiveList('bases')}
            />
        </div>
    );
}

export default Type;
