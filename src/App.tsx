import './App.scss';
import { Route, Routes } from 'react-router-dom';
import Homescreen from './screens/homescreen/Homescreen.tsx';
import { SummonerScreen } from './screens/summoner/SummonerScreen.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<Routes>
				<Route path="/" element={<Homescreen />} />
				<Route path="/summoner/:server/:gameName/:tagLine" element={<SummonerScreen />} />
			</Routes>
		</QueryClientProvider>
	);
}

export default App;
