import { replaceString } from './StringUtils.ts';
import { PerksStyle } from '../model/Match.ts';

const runeUrl = 'https://cdn.tiy.st/runes/{rune}.png';
export const runeUrlFallback = 'https://cdn.tiy.st/runes/fallbackIcon.png';

export function constructRuneIconUrl(perks: PerksStyle[]): string {
	const style = perks.find((perk) => perk.description === 'primaryStyle');

	if (!style) {
		console.log("No style found");
		return runeUrlFallback;
	}
	const runeId = style.selections[0].perk;
	return replaceString(runeUrl, 'rune', String(runeId));
}

export function constructRuneClassUrl(perks: PerksStyle[]): string {
	const style = perks.find((perk) => perk.description !== 'primaryStyle');

	if (!style) {
		console.log("No style class found");
		return runeUrlFallback;
	}

	const runeStyle = style.style;

	return replaceString(runeUrl, 'rune', String(runeStyle));
}

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