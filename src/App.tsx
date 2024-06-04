import MapLayout from './components/MapLayout';
import {ReactComponent as LogoIcon} from './assets/logo-icon.svg';
import {ReactComponent as SubstationChapterIcon} from './assets/substation-chapter-icon.svg';
import {ReactComponent as RouteChapterIcon} from './assets/route-chapter-icon.svg';

import './styles/style.css';
import NavbarButton from './components/UI/NavbarButton';

function App() {
    return (
        <>
            <div className="absolute bottom-0 left-0 top-0 flex w-20 flex-col items-center border-r border-l-neutral-400">
                <div className="mb-20 mt-4">
                    <LogoIcon />
                </div>
                <div className="flex flex-col gap-y-12">
                    <NavbarButton IconComponent={SubstationChapterIcon} />
                    <NavbarButton IconComponent={RouteChapterIcon} />
                </div>
            </div>
            <div className="absolute bottom-0 left-20 right-0 top-0">
                <MapLayout></MapLayout>
            </div>
        </>
    );
}

export default App;
