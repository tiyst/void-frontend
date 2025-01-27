import './App.scss';
import { Route, Routes } from 'react-router-dom';
import Homescreen from './screens/homescreen/Homescreen.tsx';
import { SummonerScreen } from './screens/summoner/SummonerScreen.tsx';
import { mockSummoner } from '../mocks/MasteryMock.ts';

function App() {
	return (
		<Routes>
			<Route path="/" element={<Homescreen />} />
			<Route path="/summoner" element={<SummonerScreen summoner={mockSummoner} />} />
		</Routes>
	);
}

export default App;
