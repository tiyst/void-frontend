import './Suggestion.scss';
import { transformCodeToServer } from '../../utils/SearchUtils.ts';

type SearchSuggestionProps = {
	server: string;
	gameName: string;
	tagLine: string;
	onClick: () => void;
	onRemove: (server: string, gameName: string, tagLine: string) => void;
};

export const Suggestion = (data: SearchSuggestionProps) => {
	return (
		<div className="suggestion">
			<button className="suggestion-content" onClick={data.onClick} onKeyDown={data.onClick}>
				<div className="server">{transformCodeToServer(data.server)}</div>
				<div className="summoner-info">
					{data.gameName}#<i>{data.tagLine}</i>
				</div>
			</button>
			<button className="close-btn" onClick={() => data.onRemove(data.server, data.gameName, data.tagLine)}>
				<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M6 6L18 18" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
					<path d="M18 6L6 18" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
				</svg>
			</button>
		</div>
	);
};
