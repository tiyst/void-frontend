// Mini rank working as of 15.1.1
import { replaceString } from './StringUtils.ts';

const miniRankUrl =
	'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/ux/fonts/texticons/lol/ranks/rank{rank}.png';
const rankUrl = 'https://cdn.tiy.st/rank-icons/{rank}.png';

export function getRankMiniUrl(rank: string) {
	return replaceString(miniRankUrl, 'rank', rank);
}

export function getRankUrl(rank: string) {
	return replaceString(rankUrl, 'rank', rank);
}

export function getRankQueueTranslation(queueType: string) {
	return rankQueueTranslations[queueType] || 'Unknown';
}

export function calculateWinRate(wins: number, losses: number) {
	const totalGames = wins + losses;
	if (totalGames === 0) return '';
	const winRate = (wins / totalGames) * 100;

	return `(${winRate.toFixed(1)}%)`;
}

const rankQueueTranslations: { [key: string]: string } = {
	'RANKED_SOLO_5x5': 'Ranked Solo',
	'RANKED_FLEX_SR': 'Ranked Flex'
};