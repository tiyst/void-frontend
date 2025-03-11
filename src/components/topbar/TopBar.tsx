import './TopBar.scss';
import React from 'react';
import { Search } from '../searchBar/Search.tsx';

const TopBar: React.FC = () => {
	return (
		<div className="top-bar">
			<Search />
		</div>
	);
};

export default TopBar;
