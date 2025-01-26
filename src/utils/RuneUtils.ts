import { replaceString } from './StringUtils.ts';
import { PerksStyle } from '../model/Match.ts';

export const fallbackRuneIconUrl = 'https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/RunesIcon.png';
const baseRuneUrl = 'https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/{class}/{rune}/{rune}.png';
const baseRuneStyleUrl = 'https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/{class}.png';

export function constructPrimaryRuneIconUrl(perks: PerksStyle[]): string {
	const style = perks.find((perk) => perk.description === 'primaryStyle');

	if (!style) {
		return fallbackRuneIconUrl;
	}
	const runeStyle = style.style;
	const runeId = style.selections[0].perk;
	const urlWithStyle = replaceString(baseRuneUrl, 'class', runeClassTranslation[runeStyle]);
	const result = replaceString(urlWithStyle, 'rune', runeTranslation[runeId]);

	console.log(result);
	return result;
}

export function constructSecondaryRuneClassUrl(perks: PerksStyle[]): string {
	const style = perks.find((perk) => perk.description !== 'primaryStyle');

	if (!style) {
		return fallbackRuneIconUrl;
	}
	const runeStyle = style.style;
	const url = replaceString(baseRuneStyleUrl, 'class', runeStylIconTranslations[runeStyle]);

	console.log(url);
	return url;
}


const runeClassTranslation: { [key: string]: string } = {
	'8000': 'Precision',
	'8100': 'Domination',
	'8200': 'Sorcery',
	'8300': 'Inspiration',
	'8400': 'Resolve'
};

const runeTranslation: { [key: string]: string } = {
	'8112': 'Electrocute',
	'8128': 'DarkHarvest',
	'9923': 'HailOfBlades',
	'8126': 'CheapShot',
	'8139': 'TasteOfBlood',
	'8143': 'SuddenImpact',
	'8136': 'ZombieWard',
	'8120': 'GhostPoro',
	'8138': 'EyeballCollection',
	'8135': 'TreasureHunter',
	'8105': 'RelentlessHunter',
	'8106': 'UltimateHunter',
	'8351': 'GlacialAugment',
	'8360': 'UnsealedSpellbook',
	'8369': 'FirstStrike',
	'8306': 'HextechFlashtraption',
	'8304': 'MagicalFootwear',
	'8321': 'CashBack',
	'8313': 'PerfectTiming',
	'8352': 'TimeWarpTonic',
	'8345': 'BiscuitDelivery',
	'8347': 'CosmicInsight',
	'8410': 'ApproachVelocity',
	'8316': 'JackOfAllTrades',
	'8005': 'PressTheAttack',
	'8008': 'LethalTempo',
	'8021': 'FleetFootwork',
	'8010': 'Conqueror',
	'9101': 'AbsorbLife',
	'9111': 'Triumph',
	'8009': 'PresenceOfMind',
	'9104': 'LegendAlacrity',
	'9105': 'LegendHaste',
	'9103': 'LegendBloodline',
	'8014': 'CoupDeGrace',
	'8017': 'CutDown',
	'8299': 'LastStand',
	'8437': 'GraspOfTheUndying',
	'8439': 'Aftershock',
	'8465': 'Guardian',
	'8446': 'Demolish',
	'8463': 'FontOfLife',
	'8401': 'ShieldBash',
	'8429': 'Conditioning',
	'8444': 'SecondWind',
	'8473': 'BonePlating',
	'8451': 'Overgrowth',
	'8453': 'Revitalize',
	'8242': 'Unflinching',
	'8214': 'SummonAery',
	'8229': 'ArcaneComet',
	'8230': 'PhaseRush',
	'8224': 'NullifyingOrb',
	'8226': 'ManaflowBand',
	'8275': 'NimbusCloak',
	'8210': 'Transcendence',
	'8234': 'Celerity',
	'8233': 'AbsoluteFocus',
	'8237': 'Scorch',
	'8232': 'Waterwalking',
	'8236': 'GatheringStorm'
};

//Used to pull rune class icons such as 'precision'
const runeStylIconTranslations: { [key: string]: string } = {
	'8000': '7201_Precision',
	'8100': '7200_Domination',
	'8200': '7202_Sorcery',
	'8300': '7203_Whimsy',
	'8400': '7204_Resolve'
};

export const runeKeystonesByStyle: { [key: number]: number[] } = {
	8000: [8005, 8008, 8021, 8010],
	8100: [8112, 8128, 9923],
	8200: [8214, 8229, 8230],
	8300: [8351, 8360, 8369],
	8400: [8437, 8439, 8465]
};

export const runeSecondaryByStyle: { [key: number]: number[] }  = {
	8000: [9101, 9111, 8009, 9104, 9105, 9103, 8014, 8017, 8299],
	8100: [8126, 8139, 8143, 8136, 8120, 8138, 8135, 8105, 8106],
	8200: [8224, 8226, 8275, 8210, 8234, 8233, 8237, 8232, 8236],
	8300: [8306, 8304, 8321, 8313, 8352, 8345, 8347, 8410, 8316],
	8400: [8446, 8463, 8401, 8429, 8444, 8473, 8451, 8453, 8242]
};