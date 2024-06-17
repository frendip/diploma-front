import {Link, useLocation} from 'react-router-dom';
import {ReactComponent as LogoIcon} from '../assets/logo-icon.svg';
import {ReactComponent as UpdateSubstationsChapterIcon} from '../assets/pen-icon.svg';
import {ReactComponent as UpdateSubstationsChapterWhiteIcon} from '../assets/pen-white-icon.svg';

import {ReactComponent as RoutesChapterIcon} from '../assets/routes-chapter-icon.svg';
import {ReactComponent as RoutesChapterWhiteIcon} from '../assets/routes-chapter-white-icon.svg';
import {ReactComponent as SubstationChapterIcon} from '../assets/substation-chapter-icon.svg';
import {ReactComponent as SubstationChapterWhiteIcon} from '../assets/substation-chapter-white-icon.svg';
import IconButton from './UI/IconButton';

function Navbar() {
    const {pathname} = useLocation();

    return (
        <div className="absolute bottom-0 left-0 top-0 flex w-navbar flex-col items-center border-r border-l-neutral-400">
            <div className="mb-20 mt-4">
                <LogoIcon />
            </div>
            <div className="flex flex-col gap-y-10">
                <Link to="/">
                    <IconButton
                        size="large"
                        isActive={pathname === '/'}
                        IconComponent={pathname === '/' ? SubstationChapterWhiteIcon : SubstationChapterIcon}
                    />
                </Link>
                <Link to="/drivers-routes">
                    <IconButton
                        size="large"
                        isActive={pathname === '/drivers-routes'}
                        IconComponent={pathname === '/drivers-routes' ? RoutesChapterWhiteIcon : RoutesChapterIcon}
                    />
                </Link>
                <Link to="/add-substation">
                    <IconButton
                        size="large"
                        isActive={pathname === '/add-substation'}
                        IconComponent={
                            pathname === '/add-substation'
                                ? UpdateSubstationsChapterWhiteIcon
                                : UpdateSubstationsChapterIcon
                        }
                    />
                </Link>
            </div>
        </div>
    );
}

export default Navbar;
