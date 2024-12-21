import { useState, ChangeEvent, FC, useEffect, useRef } from 'react';
import './SearchBar.scss';

interface SearchBarProps {
	placeholder?: string;
	onSearchChange?: (value: string) => void;
	suggestions?: string[];
	onSuggestionClick?: (suggestion: string) => void;
}

const SearchBar: FC<SearchBarProps> = ({
	placeholder = 'Search...',
	onSearchChange,
	suggestions = [],
	onSuggestionClick
}) => {
	const [searchTerm, setSearchTerm] = useState<string>('');
	const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
	const searchBarRef = useRef<HTMLDivElement | null>(null);

	// Close suggestions when clicking outside or pressing the Escape key
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (searchBarRef.current && !searchBarRef.current.contains(event.target as Node)) {
				setShowSuggestions(false);
			}
		};

		const handleEscapeKey = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				console.log('escape'); // Debug log
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		document.addEventListener('keydown', handleEscapeKey);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
			document.removeEventListener('keydown', handleEscapeKey);
		};
	}, []);

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setSearchTerm(value);
		setShowSuggestions(value.trim() !== '');

		if (onSearchChange) {
			onSearchChange(value);
		}
	};

	const handleSuggestionClick = (suggestion: string) => {
		if (onSuggestionClick) {
			onSuggestionClick(suggestion);
		}
		setSearchTerm(suggestion);
		setShowSuggestions(false);
	};

	return (
		<div className="search-bar">
			<input type="text" placeholder={placeholder} value={searchTerm} onChange={handleInputChange} />
			<span className="search-icon">🔍</span>
			{showSuggestions && suggestions.length > 0 && (
				<ul className="suggestions-dropdown">
					{suggestions.map((suggestion, index) => (
						<li key={index} onClick={() => handleSuggestionClick(suggestion)}>
							{suggestion}
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default SearchBar;
