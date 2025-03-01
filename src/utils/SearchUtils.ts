export const transformServerToCode = (server: string) => {
	return serverToCode.get(server) ?? 'UNKNOWN';
};

export const transformCodeToServer = (code: string) => {
	return codeToServer.get(code) ?? 'UNKNOWN';
};

export const processSavedSuggestion = (savedSuggestion: string): {
	server: string;
	gameName: string;
	tagLine: string
} | undefined => {
	const strings = savedSuggestion.split('/');
	if (strings.length !== 3) {
		console.warn(`Invalid suggestion format ${savedSuggestion}`);
		return undefined;
	}

	return {
		server: strings[0],
		gameName: strings[1],
		tagLine: strings[2]
	};
};

export const transformSuggestionToSavableFormat = (server: string, gameName: string, tagLine: string): string => {
	return `${server}/${gameName}/${tagLine}`;
};

const serverToCode = new Map<string, string>([
	['BR', 'BR'],
	['EUNE', 'EUN1'],
	['EUW', 'EUW1'],
	['JPN', 'JP1'],
	['KR', 'KR'],
	['LA1', 'LA1'],
	['LA2', 'LA2'],
	['ME', 'ME1'],
	['NA', 'NA1'],
	['OCE', 'OC1'],
	['PH', 'PH2'],
	['RU', 'RU'],
	['SG', 'SG2'],
	['TH', 'TH2'],
	['TR', 'TR1'],
	['TW', 'TW2'],
	['VN', 'VN2']
]);

const codeToServer = new Map<string, string>([
	['BR', 'BR'],
	['EUN1', 'EUNE'],
	['EUW1', 'EUW'],
	['JP1', 'JPN'],
	['KR', 'KR'],
	['LA1', 'LA1'],
	['LA2', 'LA2'],
	['ME1', 'ME'],
	['NA1', 'NA'],
	['OC1', 'OCE'],
	['PH2', 'PH'],
	['RU', 'RU'],
	['SG2', 'SG'],
	['TH2', 'TH'],
	['TR1', 'TR'],
	['TW2', 'TW'],
	['VN2', 'VN']
]);