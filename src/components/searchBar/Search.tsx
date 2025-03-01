import './Search.scss';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { separateGameName } from '../../utils/StringUtils.ts';
import { Suggestion } from './Suggestion.tsx';
import { processSavedSuggestion, transformSuggestionToSavableFormat } from '../../utils/SearchUtils.ts';

const serverToCode = {
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

const SUGGESTIONS_KEY = 'suggestions';
const SERVER_KEY = 'chosenServer';
const MAX_SUGGESTIONS = 8;

export const Search = () => {
	const suggestions: string[] = JSON.parse(localStorage.getItem(SUGGESTIONS_KEY) ?? '[]');
	const chosenServer: string = localStorage.getItem(SERVER_KEY) ?? 'EUW';

	const [server, setServer] = useState<string>(chosenServer);
	const [query, setQuery] = useState<string>('');
	const [displayedSuggestions, setDisplayedSuggestions] = useState<string[]>([]);

	const navigate = useNavigate();
	const wrapperRef = useRef<HTMLDivElement | null>(null);


	const handleSearchParametrised = (server: string, gameName: string, tagLine: string) => {
		addSuggestion(transformSuggestionToSavableFormat(server, gameName, tagLine));
		navigate(`/summoner/${server}/${gameName}/${tagLine}`);
	};

	const handleSearch = () => {
		const { gameName, tagLine } = separateGameName(query);
		if (query.trim()) {
			handleSearchParametrised(server, gameName, tagLine);
		}
	};

	const addSuggestion = (newSuggestion: string) => {
		if (suggestions.includes(newSuggestion)) {
			return;
		}

		if (suggestions.length > MAX_SUGGESTIONS) {
			suggestions.shift();
		}

		suggestions.push(newSuggestion);
		localStorage.setItem(SUGGESTIONS_KEY, JSON.stringify(suggestions));
	};

	const removeSuggestion = (server: string, gameName: string, tagLine: string): void => {
		console.log('removeSuggestion', server, gameName, tagLine);
		const suggestion = transformSuggestionToSavableFormat(server, gameName, tagLine);
		if (!suggestions.includes(suggestion)) {
			return;
		}

		const newSuggestions = suggestions.filter(item => item !== suggestion);
		console.log(newSuggestions);
		localStorage.setItem(SUGGESTIONS_KEY, JSON.stringify(newSuggestions));
		setDisplayedSuggestions(newSuggestions);
	};

	const handleSearchChange = (value: string) => {
		setQuery(value);

		let filtered = suggestions;
		if (value.trim().length > 0) {
			filtered = suggestions.filter((item) =>
				item.toLowerCase().includes(value.toLowerCase())
			);
		}

		setDisplayedSuggestions(filtered);
	};

	const changeServer = (server: string): void => {
		localStorage.setItem(SERVER_KEY, server);
		setServer(server);
	}

	// Hide suggestion when clicked outside or "escape" pressed
	const handleClickOutside = (event: MouseEvent) => {
		if (!wrapperRef.current || !(event.target instanceof HTMLElement)) return;

		if (!wrapperRef.current.contains(event.target)) {
			setDisplayedSuggestions([]);
		}
	};

	const handleKeyDown = (event: KeyboardEvent) => {
		if (event.key === 'Escape') {
			setDisplayedSuggestions([]);
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
			<select value={server} onChange={(e) => changeServer(e.target.value)} defaultValue={server} className="search-select">
				{Object.entries(serverToCode).map(([key, value]) => (
					<option key={key} value={value}> {key}</option>
				))}
			</select>
			<div className="vertical-line" />
			<div className="search-input-wrapper">
				<input type="text"
					   placeholder="name#tag"
					   value={query}
					   onChange={(e) => handleSearchChange(e?.target.value)}
					   onFocus={() => handleSearchChange(query)}
					   onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
					   className="search-input" />

				{suggestions.length > 0 && (
					<ul className="suggestions-drop">
						{displayedSuggestions
						.map(processSavedSuggestion)
						.filter((suggestion) => suggestion !== undefined)
						.map(({ server, gameName, tagLine }, index) => (
							<Suggestion server={server} gameName={gameName} tagLine={tagLine} key={'suggestion' + index}
										onClick={() => handleSearchParametrised(server, gameName, tagLine)}
										onRemove={removeSuggestion} />
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