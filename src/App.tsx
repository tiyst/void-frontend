import './App.scss';
import { Route, Routes, useLocation } from 'react-router-dom';
import Homescreen from './screens/homescreen/Homescreen.tsx';
import { SummonerScreen } from './screens/summoner/SummonerScreen.tsx';

function App() {
	return (
		<Routes>
			<Route path="/" element={<Homescreen />} />
			<Route path="/summoner/:server/:gameName/:tagLine" element={<SummonerScreen />} key={useLocation().pathname} />
		</Routes>
	);
}

export default App;
