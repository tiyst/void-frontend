import './TopBar.scss';
import React, { useState } from 'react';
import SearchBar from '../searchBar/SearchBar.tsx';

const TopBar: React.FC = () => {
	const [suggestions, setSuggestions] = useState<string[]>([]);

	// TODO include champion name file for predictions, include predictions from local storage for previous searches
	const handleSearchChange = (value: string) => {
		const mockSuggestions = ['Apple', 'Banana', 'Cherry', 'Orange'];
		if (value.trim() === '') {
			setSuggestions([]);
			return;
		}

		const lowerValue = value.toLowerCase();
		setSuggestions(
			mockSuggestions.filter((item) => {
				// if only 1 letter inputted, we don't match if included as to not spam suggestions
				const lowerItem = item.toLowerCase();
				return (
					(value.length < 2 && lowerItem.startsWith(lowerValue)) ||
					(value.length >= 2 && lowerItem.includes(lowerValue))
				);
			})
		);
	};

	const handleSuggestionClick = (suggestion: string) => {
		console.log('Suggestion clicked:', suggestion);
		setSuggestions([]);
	};

	return (
		<div className="top-bar">
			<SearchBar
				placeholder="Search..."
				onSearchChange={handleSearchChange}
				suggestions={suggestions}
				onSuggestionClick={handleSuggestionClick}
			/>
		</div>
	);
};

export default TopBar;
