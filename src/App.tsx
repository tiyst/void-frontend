import './App.scss';
import { Route, Routes } from 'react-router-dom';
import Homescreen from './screens/homescreen/Homescreen.tsx';
import { SummonerScreen } from './screens/summoner/SummonerScreen.tsx';

function App() {
	return (
		<Routes>
			<Route path="/" element={<Homescreen />} />
			<Route path="/summoner/:server/:gameName/:tagLine" element={<SummonerScreen />} />
		</Routes>
	);
}

export default App;
