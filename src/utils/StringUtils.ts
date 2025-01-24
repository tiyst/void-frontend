export function replaceString(source: string, key: string, value: string) {
	const regex = new RegExp(`{${key}}`, 'g');
	return source.replace(regex, value);
}
