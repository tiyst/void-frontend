import { Search } from '../../components/searchBar/Search.tsx';
import './HomeScreen.scss';

function Homescreen() {

	return (
		<div className="homescreenContainer">
			<div className="searchContainer">
				<Search />
			</div>
		</div>
	);
}

export default Homescreen;
