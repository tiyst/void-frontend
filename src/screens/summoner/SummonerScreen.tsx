import TopBar from '../../components/topbar/TopBar.tsx';
import './SummonerScreen.scss';
import Base from '../../components/base/Base.tsx';

function SummonerScreen() {
	return (
		<div className="page-container">
			<TopBar />
			<div className="content">
				<div className="left-side">
					<Base>Left 1</Base>
					<Base>Left 2</Base>
				</div>
				<div className="right-side">
					<Base>Right 1</Base>
				</div>
			</div>
		</div>
	);
}

export default SummonerScreen;
