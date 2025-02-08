const PLAYER_NAME_MAX_LENGTH = 9;

export function replaceString(source: string, key: string, value: string) {
	const regex = new RegExp(`{${key}}`, 'g');
	return source.replace(regex, value);
}

export function truncatePlayerName(str: string): string {
	if (str.length > PLAYER_NAME_MAX_LENGTH) {
		return str.substring(0, PLAYER_NAME_MAX_LENGTH) + '..';
	}
	return str;
}

export function separateGameName(name: string): { gameName: string, tagLine: string } {
	const [pre, post] = name.split('#', 2);
	if (pre.includes('#') || post.includes('#')) {
		throw new Error(`Invalid game name: ${name}`);
	}

	return {gameName: pre, tagLine: post};
}
