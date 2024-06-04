import React from 'react';
import {Link} from 'react-router-dom';
import {ReactComponent as LogoIcon} from '../assets/logo-icon.svg';
import {ReactComponent as SubstationChapterIcon} from '../assets/substation-chapter-icon.svg';
import {ReactComponent as RoutesChapterIcon} from '../assets/routes-chapter-icon.svg';
import NavbarButton from './UI/NavbarButton';

function Navbar() {
    return (
        <div className="w-navbar-width absolute bottom-0 left-0 top-0 flex flex-col items-center border-r border-l-neutral-400">
            <div className="mb-20 mt-4">
                <LogoIcon />
            </div>
            <div className="flex flex-col gap-y-12">
                <Link to="/">
                    <NavbarButton IconComponent={SubstationChapterIcon} />
                </Link>
                <Link to="/drivers-routes">
                    <NavbarButton IconComponent={RoutesChapterIcon} />
                </Link>
            </div>
        </div>
    );
}

export default Navbar;
