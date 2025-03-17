import './TopBar.scss';
import React from 'react';
import { Search } from '../searchBar/Search.tsx';
import { useNavigate } from 'react-router-dom';

const TopBar: React.FC = () => {
	const navigate = useNavigate();

	return (
		<div className="top-bar">
			<button className="logo-button" onClick={() => navigate('/')}>
				<img src="/void-logo-bar.png" alt="void logo" style={{ maxHeight: '100%', left: '15px' }} />
			</button>
			<Search />
		</div>
	);
};

export default TopBar;
