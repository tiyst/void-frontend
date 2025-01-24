import { Match } from '../model/Match.ts';

export function didPlayerWinMatch(match: Match, playerName: string): boolean {
	const playerParticipant = match.participants.find((participant) => participant.riotIdGameName === playerName);

	return playerParticipant
		? (match.teams.find((team) => team.teamId === playerParticipant.teamId)?.win ?? false)
		: false;
}

export function getSummonerSpellIconUrl(summoneSpellId: number): string {
	return summonerSpellIconUrlTranslations[summoneSpellId] || emptySummonerSpellIconUrl;
}

export function getMapUrlByMapId(mapId: number): string {
	return mapIconUrls[mapId] || rotatingGameModeIconUrl;
}

export function calculateKDA(kills: number, assists: number, deaths: number) {
	return deaths === 0 ? kills + assists : ((kills + assists) / deaths).toFixed(1);
}

export function unixDurationToMinutes(unixDurationInMillis: number) {
	return unixDurationInMillis / 60000;
}

export function unixTimestampToDuration(unixDurationInMillis: number) {
	const durationInSeconds = unixDurationInMillis / 1000;
	const seconds = Math.floor(durationInSeconds % 60);
	const minutes = Math.floor((durationInSeconds / 60) % 60);
	const hours = Math.floor(durationInSeconds / 3600);

	return [hours > 0 ? `${hours}h` : '', minutes > 0 ? `${minutes}m` : '', `${seconds}s`].filter(Boolean).join(' ');
}

export function findPlayer(match: Match, playerName: string) {
	const player = match.participants.find((p) => p.riotIdGameName === playerName);
	if (!player) {
		throw new Error(`Player with name "${playerName}" not found`);
	}
	return player;
}

const rotatingGameModeIconUrl = 'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/content/src/leagueclient/gamemodeassets/gamemodex/img/icon-v2.png';
const aramGameModeIconUrl = 'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/content/src/leagueclient/gamemodeassets/aram/img/icon-victory.png';
const summonersRiftGameIconUrl = 'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/content/src/leagueclient/gamemodeassets/classic_sru/img/icon-victory.png';
const mapIconUrls: { [key: number]: string } = {
	1: summonersRiftGameIconUrl,
	2: summonersRiftGameIconUrl,
	11: summonersRiftGameIconUrl,
	12: aramGameModeIconUrl,
	14: aramGameModeIconUrl,
	3: rotatingGameModeIconUrl,
	21: rotatingGameModeIconUrl,
	4: rotatingGameModeIconUrl,
	8: rotatingGameModeIconUrl,
	10: rotatingGameModeIconUrl,
	16: rotatingGameModeIconUrl,
	18: rotatingGameModeIconUrl,
	19: rotatingGameModeIconUrl,
	20: rotatingGameModeIconUrl,
	22: rotatingGameModeIconUrl,
	30: rotatingGameModeIconUrl
};

// Sources:
// https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/data/spells/icons2d/
// https://ddragon.leagueoflegends.com/cdn/15.1.1/data/en_US/summoner.json
const emptySummonerSpellIconUrl =
	'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/data/spells/icons2d/summoner_empty.png';
const summonerSpellIconUrlTranslations: { [key: number]: string } = {
	21: 'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/data/spells/icons2d/summonerbarrier.png',
	1: 'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/data/spells/icons2d/summoner_boost.png',
	14: 'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/data/spells/icons2d/summonerignite.png',
	3: 'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/data/spells/icons2d/summoner_exhaust.png',
	4: 'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/data/spells/icons2d/summoner_flash.png',
	6: 'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/data/spells/icons2d/summoner_haste.png',
	7: 'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/data/spells/icons2d/summoner_heal.png',
	13: 'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/data/spells/icons2d/summonermana.png',
	31: 'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/data/spells/icons2d/summoner_mark.png',
	11: 'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/data/spells/icons2d/summoner_smite.png',
	39: 'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/data/spells/icons2d/summoner_mark.png'
	// "30": "SummonerPoroRecall",
	// "2202": "SummonerCherryFlash",
	// "2201": "SummonerCherryHold",
};
