import React, {Dispatch, FC, SetStateAction} from 'react';
import classes from './PopupContainer.module.css';

interface PopupContainerProps {
    popupActive: boolean;
    setPopupActive: Dispatch<SetStateAction<boolean>>;
    children: React.ReactNode;
}

const PopupContainer: FC<PopupContainerProps> = ({popupActive, setPopupActive, children}) => {
    if (popupActive) {
        return (
            <div onClick={() => setPopupActive(false)} className={classes.searchPopup}>
                <div onClick={(e) => e.stopPropagation()} className={classes.searchPopup__content}>
                    {children}
                </div>
            </div>
        );
    } else {
        return <></>;
    }
};

export default PopupContainer;
