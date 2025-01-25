
const PLAYER_NAME_MAX_LENGTH = 12;

export function replaceString(source: string, key: string, value: string) {
	const regex = new RegExp(`{${key}}`, 'g');
	return source.replace(regex, value);
}

export function truncatePlayerName(str: string, ): string {
	if (str.length > PLAYER_NAME_MAX_LENGTH) {
		return str.substring(0, PLAYER_NAME_MAX_LENGTH) + '..';
	}
	return str;
}
