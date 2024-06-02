import MapLayout from './components/MapLayout';
import MapSubstationMarker from './components/MapSubstationMarker';

import './styles/style.css';

function App() {
    return (
        <div className="flex gap-x-4">
            <div className="h-50v w-50v">
                <MapLayout>
                    <MapSubstationMarker coordinates={[37.623082, 55.75254]} />
                </MapLayout>
            </div>

            <div>OOOPS</div>
        </div>
    );
}

export default App;
