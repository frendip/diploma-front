import MapLayout from './components/MapLayout';
import MapSubstationMarker from './components/MapSubstationMarker';
import SubstationList from './components/SubstationList';

import './styles/style.css';

function App() {
    return (
        <div className="h-100v-without-wrapper rounded-3xl bg-white/25 p-6">
            <div className="flex h-full gap-x-4">
                <div className="h-80v w-50v self-center">
                    <MapLayout>
                        <MapSubstationMarker coordinates={[37.623082, 55.75254]} />
                    </MapLayout>
                </div>

                <div className="flex h-full grow flex-col gap-y-3">
                    <SubstationList className="h-1/2" />
                    <SubstationList className="h-1/2" />
                </div>
            </div>
        </div>
    );
}

export default App;
