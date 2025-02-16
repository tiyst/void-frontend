import { replaceString } from './StringUtils.ts';

export const urlUnknownChampion = 'https://cdn.communitydragon.org/latest/champion/generic/square';
export const urlKnownChampion = 'https://cdn.communitydragon.org/latest/champion/{ID}/square';

export const urlIcon = 'https://ddragon.leagueoflegends.com/cdn/15.1.1/img/profileicon/{iconId}.png';

export function getChampionIconUrl(championId: number) {
	return replaceString(urlKnownChampion, 'ID', String(championId));
}

export function getProfileIconUrl(profileIconId: number) {
	return replaceString(urlIcon, 'iconId', String(profileIconId));
}