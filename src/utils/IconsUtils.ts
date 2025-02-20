import { replaceString } from './StringUtils.ts';

export const urlUnknownChampion = 'https://cdn.communitydragon.org/latest/champion/generic/square';
export const urlKnownChampion = 'https://cdn.communitydragon.org/latest/champion/{ID}/square';
export const urlKnownChampionSplash = 'https://cdn.communitydragon.org/latest/champion/{ID}/splash-art/centered'
export const urlMastery = "https://cdn.tiy.st/champion-mastery/mastery-{num}.png"

// TODO https://cdn.communitydragon.org/latest/profile-icon/{ID} use this in the future
export const urlIcon = 'https://ddragon.leagueoflegends.com/cdn/15.1.1/img/profileicon/{iconId}.png';

export function getChampionIconUrl(championId: number) {
	return replaceString(urlKnownChampion, 'ID', String(championId));
}

export function getProfileIconUrl(profileIconId: number) {
	return replaceString(urlIcon, 'iconId', String(profileIconId));
}

export function getChampionSplashUrl(championId: number) {
	return replaceString(urlKnownChampionSplash, 'ID', String(championId));
}

export function getMasteryIconUrl(masteryLevel: number) {
	if (masteryLevel <= 1) {
		masteryLevel = 1;
	} else if (masteryLevel >= 10) {
		masteryLevel = 10;
	}

	return replaceString(urlMastery, 'num', String(masteryLevel));
}