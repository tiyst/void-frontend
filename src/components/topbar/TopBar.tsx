import './TopBar.scss';
import React from 'react';
import { Search } from '../searchBar/Search.tsx';
import { useNavigate } from 'react-router-dom';

const TopBar: React.FC = () => {
	const navigate = useNavigate();

	return (
		<div className="top-bar">
			<div className="top-bar__left">
				<button className="logo-button" onClick={() => navigate('/')}>
					<span className="logo-text">Void</span>
				</button>
			</div>
			<div className="top-bar__center">
				<Search />
			</div>
			<div className="top-bar__right" />
		</div>
	);
};

export default TopBar;
