import './Search.scss';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { separateGameName } from '../../utils/StringUtils.ts';

const options = {
	'BR': 'BR',
	'EUNE': 'EUN1',
	'EUW': 'EUW1',
	'JPN': 'JP1',
	'KR': 'KR',
	'LA1': 'LA1',
	'LA2': 'LA2',
	'ME': 'ME1',
	'NA': 'NA1',
	'OCE': 'OC1',
	'PH': 'PH2',
	'RU': 'RU',
	'SG': 'SG2',
	'TH': 'TH2',
	'TR': 'TR1',
	'TW': 'TW2',
	'VN': 'VN2'
};

export const Search = () => {
	const [server, setServer] = useState<string>('BR');
	const [query, setQuery] = useState<string>('');
	const [suggestions, setSuggestions] = useState<string[]>([]);
	const navigate = useNavigate();
	const wrapperRef = useRef(null);

	const handleSearch = () => {
		const { gameName, tagLine } = separateGameName(query);
		if (query.trim()) {
			navigate(`/summoner/${server}/${gameName}/${tagLine}`);
		}
	};

	// TODO Style suggestions, cache previously searched in local storage and show them as suggestions
	const handleSearchChange = (value: string) => {
		setQuery(value);
		if (value.trim().length > 0) {
			const filtered = ['aaa', 'bbb', 'ccc', 'aa', 'bb', 'cc', 'a', 'b', 'c'].filter((item) =>
				item.toLowerCase().includes(value.toLowerCase())
			);
			setSuggestions(filtered);
		} else {
			setSuggestions([]);
		}
	};

	// Hide suggestion when clicked outside or "escape" pressed
	const handleClickOutside = (event: MouseEvent) => {
		if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
			setSuggestions([]);
		}
	};

	const handleKeyDown = (event: KeyboardEvent) => {
		if (event.key === 'Escape') {
			setSuggestions([]);
		}
	};

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside);
		document.addEventListener('keydown', handleKeyDown);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, []);

	return (
		<div className="search-container" ref={wrapperRef}>
			<select value={server} onChange={(e) => setServer(e.target.value)} className="search-select">
				{Object.entries(options).map(([key, value]) => (
					<option key={key} value={value}> {key}</option>
				))}
			</select>
			<div className="vertical-line" />
			<div className="search-input-wrapper">
				<input type="text"
					   placeholder="name#tag"
					   value={query}
					   onChange={(e) => handleSearchChange(e?.target.value)}
					   onFocus={()=> handleSearchChange(query)}
					   onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
					   className="search-input" />

				{suggestions.length > 0 && (
					<ul className="suggestions-drop">
						{suggestions.map((suggestion, index) => (
							<li key={'suggestion' + index} onClick={() => {}} onKeyDown={() => handleSearch()}>
								{suggestion}
							</li>
						))}
					</ul>
				)}
			</div>
			<button onClick={handleSearch} className="search-button">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="white"
					preserveAspectRatio="xMidYMid meet">
					<path
						d="M10 2a8 8 0 015.293 13.707l4.707 4.707-1.414 1.414-4.707-4.707A8 8 0 1110 2zm0 2a6 6 0 104.472 10.472A6 6 0 0010 4z" />
				</svg>
			</button>
		</div>
	);
};