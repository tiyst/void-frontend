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
	return deaths === 0 ? 'Perfect' : ((kills + assists) / deaths).toFixed(1);
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

export const queueTypeTranslations: { [key: number]: string }  = {
	0: 'None',
	72: '1v1 Snowdown',
	73: '2v2 Snowdown',
	75: '6v6 Hexakill',
	76: 'URF',
	78: 'One For All: Mirror',
	83: 'Co-op vs AI URF',
	98: 'Hexakill',
	100: 'ARAM',
	310: 'Nemesis',
	313: 'Black Market',
	317: 'Definitely Not Dominion',
	325: 'All Random',
	400: 'Draft Pick',
	420: 'Ranked Solo',
	430: 'Blind Pick',
	440: 'Ranked Flex',
	450: 'ARAM',
	490: 'Normal (Quickplay)',
	600: 'Blood Hunt',
	610: 'Singularity',
	700: 'Clash',
	720: 'ARAM Clash',
	820: 'Co-op vs. AI',
	870: 'Co-op vs. AI',
	880: 'Co-op vs. AI',
	890: 'Co-op vs. AI',
	900: 'ARURF',
	910: 'Ascension',
	920: 'Poro King',
	940: 'Nexus Siege',
	950: 'Doom Bots',
	960: 'Doom Bots',
	980: 'Star Guardian',
	990: 'Star Guardian',
	1000: 'PROJECT: Hunters',
	1010: 'ARURF',
	1020: 'One for All',
	1030: 'Odyssey Extraction',
	1040: 'Odyssey Extraction',
	1050: 'Odyssey Extraction',
	1060: 'Odyssey Extraction',
	1070: 'Odyssey Extraction',
	1300: 'Nexus Blitz',
	1400: 'Ultimate Spellbook',
	1700: 'Arena',
	1710: 'Arena',
	1810: 'Swarm',
	1820: 'Swarm',
	1830: 'Swarm',
	1840: 'Swarm',
	1900: 'Pick URF',
	2000: 'Tutorial 1',
	2010: 'Tutorial 2',
	2020: 'Tutorial 3'
};