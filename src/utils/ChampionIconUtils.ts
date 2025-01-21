import { replaceString } from './StringUtils.ts';

export const urlUnknownChampion = 'https://cdn.communitydragon.org/latest/champion/generic/square';
export const urlKnownChampion = 'https://cdn.communitydragon.org/latest/champion/{ID}/square';

export function getChampionIconUrl(championId: number) {
	return replaceString(urlKnownChampion, 'ID', String(championId));
}
