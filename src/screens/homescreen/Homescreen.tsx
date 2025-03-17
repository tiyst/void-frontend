import { Search } from '../../components/searchBar/Search.tsx';
import './HomeScreen.scss';

function Homescreen() {
	return (
		<div className="homescreenContainer">
			<div style={{ marginBottom: "50px" }}>
				<img src="/void-logo.png" alt="void logo" />
				<div className="searchContainer">
					<Search />
				</div>
			</div>
		</div>
	);
}

export default Homescreen;
