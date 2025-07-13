import { Match, Participant } from '../model/Match';
import { calculateKDA } from '../utils/MatchUtils';

export interface Badge {
	name: string;
	description: string;
	icon: string; // Path to the icon
	priority: number; // Lower number means higher priority
}

export interface BadgeConfig {
	maxBadges: number;
	badgePriorities: string[]; // Array of badge names in order of priority (highest first)
}

export interface BadgeDefinition {
	name: string;
	description: (participant: Participant, match: Match) => string;
	icon: string;
	condition: (participant: Participant, match: Match) => boolean;
	gameModes?: string[]; // Game modes this badge applies to. If undefined, applies to all.
	tag?: string; // Only one badge per tag can be applied.
}

function calculateKdaFromParticipant(p: Participant): number {
	return calculateKDA(p.kills, p.assists, p.deaths);
}

export const BADGE_DEFINITIONS: BadgeDefinition[] = [
	{
		name: 'PENTAKILL',
		description: () => 'Achieved a Pentakill!',
		icon: '/badges/PENTAKILL.svg',
		condition: (p) => p.pentaKills > 0,
		tag: 'MULTIKILL'
	},
	{
		name: 'QUADRAKILL',
		description: () => 'Achieved a Quadrakill!',
		icon: '/badges/QUADRAKILL.svg',
		condition: (p) => p.quadraKills > 0,
		tag: 'MULTIKILL'
	},
	{
		name: 'FIRST_BLOOD',
		description: () => 'First Blood',
		icon: '/badges/FIRST_BLOOD.svg',
		condition: (p) => p.firstBloodKill || p.firstBloodAssist,
		gameModes: ['CLASSIC']
	},
	{
		name: 'PERFECT_GAME',
		description: () => 'Perfect Game (0 deaths, 0 turrets lost)',
		icon: '/badges/PERFECT_GAME.svg',
		condition: (p) => p.challenges && p.challenges.perfectGame === 1,
		tag: 'KDA'
	},
	{
		name: 'HIGH_KDA',
		description: (p) => `High KDA (${calculateKdaFromParticipant(p).toFixed(1)})`,
		icon: '/badges/HIGH_KDA.svg',
		condition: (p) => calculateKdaFromParticipant(p) >= 10,
		tag: 'KDA'
	},
	{
		name: 'HIGHEST_KDA_GAME',
		description: (p) => `Highest KDA in Game (${calculateKdaFromParticipant(p).toFixed(1)})`,
		icon: '/badges/HIGHEST_KDA_GAME.svg',
		condition: (p, match) =>
			calculateKdaFromParticipant(p) ===
			Math.max(...match.participants.map((part) => calculateKdaFromParticipant(part))),
		tag: 'KDA'
	},
	{
		name: 'HIGHEST_KDA_TEAM',
		description: (p) => `Highest KDA in Team (${calculateKdaFromParticipant(p).toFixed(1)})`,
		icon: '/badges/HIGHEST_KDA_TEAM.svg',
		condition: (p, match) =>
			calculateKdaFromParticipant(p) ===
			Math.max(
				...match.participants
					.filter((part) => part.teamId === p.teamId)
					.map((part) => calculateKdaFromParticipant(part))
			),
		tag: 'KDA'
	},
	{
		name: 'HIGHEST_DAMAGE_GAME',
		description: () => 'Most Damage Dealt',
		icon: '/badges/HIGHEST_DAMAGE_GAME.svg',
		condition: (p, match) =>
			p.totalDamageDealtToChampions ===
			Math.max(...match.participants.map((part) => part.totalDamageDealtToChampions)),
		tag: 'DAMAGE'
	},
	{
		name: 'HIGHEST_DAMAGE_TEAM',
		description: () => 'Most Damage in Team',
		icon: '/badges/HIGHEST_DAMAGE_TEAM.svg',
		condition: (p, match) =>
			p.totalDamageDealtToChampions ===
			Math.max(
				...match.participants
					.filter((part) => part.teamId === p.teamId)
					.map((part) => part.totalDamageDealtToChampions)
			),
		tag: 'DAMAGE'
	},
	{
		name: 'HIGH_CSPM',
		description: (p, match) =>
			`High CSPM (${(
				(p.totalMinionsKilled + p.neutralMinionsKilled) /
				(match.gameDuration / 60)
			).toFixed(1)})`,
		icon: '/badges/HIGH_CSPM.svg',
		condition: (p, match) =>
			(p.totalMinionsKilled + p.neutralMinionsKilled) / (match.gameDuration / 60) >= 9.5,
		gameModes: ['CLASSIC'],
		tag: 'CS'
	},
	{
		name: 'MOST_CS_GAME',
		description: (p) => `Most CS in game (${p.totalMinionsKilled})`,
		icon: '/badges/MOST_CS_GAME.svg',
		condition: (p, match) =>
			p.totalMinionsKilled === Math.max(...match.participants.map((part) => part.totalMinionsKilled)),
		gameModes: ['CLASSIC'],
		tag: 'CS'
	},
	{
		name: 'MOST_CS_TEAM',
		description: (p) => `Most CS in team (${p.totalMinionsKilled})`,
		icon: '/badges/MOST_CS_TEAM.svg',
		condition: (p, match) =>
			p.totalMinionsKilled ===
			Math.max(
				...match.participants
					.filter((part) => part.teamId === p.teamId)
					.map((part) => part.totalMinionsKilled)
			),
		gameModes: ['CLASSIC'],
		tag: 'CS'
	},
	{
		name: 'HIGH_CS',
		description: (p, match) =>
			`Good CSPM (${(
				(p.totalMinionsKilled + p.neutralMinionsKilled) /
				(match.gameDuration / 60)
			).toFixed(1)})`,
		icon: '/badges/HIGH_CS.svg',
		condition: (p, match) =>
			(p.totalMinionsKilled + p.neutralMinionsKilled) / (match.gameDuration / 60) >= 8,
		gameModes: ['CLASSIC'],
		tag: 'CS'
	},
	{
		name: 'NO_DEATHS',
		description: () => 'No Deaths',
		icon: '/badges/NO_DEATHS.svg',
		condition: (p) => p.deaths === 0,
		gameModes: ['CLASSIC']
	},
	{
		name: 'MOST_GOLD',
		description: () => 'Most Gold Earned',
		icon: '/badges/MOST_GOLD.svg',
		condition: (p, match) => p.goldEarned === Math.max(...match.participants.map((part) => part.goldEarned)),
		gameModes: ['CLASSIC']
	},
	{
		name: 'MOST_VISION',
		description: () => 'Most Vision Score',
		icon: '/badges/MOST_VISION.svg',
		condition: (p, match) => p.visionScore === Math.max(...match.participants.map((part) => part.visionScore)),
		gameModes: ['CLASSIC'],
		tag: 'VISION_SCORE'
	},
	{
		name: 'VISION_SCORE_BETTER_THAN_OPPONENT',
		description: () => 'Vision Score Better Than Opponent',
		icon: '/badges/VISION_SCORE_BETTER_THAN_OPPONENT.svg',
		condition: (p) =>
			p.challenges && p.challenges.visionScoreAdvantageLaneOpponent !== undefined && p.challenges?.visionScoreAdvantageLaneOpponent > 0,
		gameModes: ['CLASSIC'],
		tag: 'VISION_SCORE'
	},
	{
		name: 'HEALED_MORE_THAN_DAMAGED',
		description: () => 'Healed more than damaged dealt',
		icon: '/badges/HEALED_MORE_THAN_DAMAGED.svg',
		condition: (p) => p.totalHealsOnTeammates > p.totalDamageDealtToChampions
	},
	{
		name: 'STOMPED_ENEMY_TEAM',
		description: () => 'Won before 15 minutes',
		icon: '/badges/STOMPED_ENEMY_TEAM.svg',
		condition: (p, match) => p.win && match.gameDuration < 15 * 60
	}
];

export const DEFAULT_BADGE_CONFIG: BadgeConfig = {
	maxBadges: 4,
	badgePriorities: [
		'PERFECT_GAME', // use challenges.perfectGame
		'PENTAKILL',
		'QUADRAKILL',
		'HIGHEST_KDA_GAME',
		'HIGHEST_KDA_TEAM',
		'HIGH_KDA',
		'HIGHEST_DAMAGE_GAME',
		'HIGHEST_DAMAGE_TEAM',
		'HIGH_CSPM',
		'MOST_CS_GAME',
		'MOST_CS_TEAM',
		'HIGH_CS',
		'NO_DEATHS',
		'FIRST_BLOOD',
		'MOST_GOLD',
		'MOST_VISION',
		'VISION_SCORE_BETTER_THAN_OPPONENT', // use challenges.visionScoreAdvantageLaneOpponent
		'HEALED_MORE_THAN_DAMAGED', // use totalHealsOnTeammates > totalDamageDealtToChampions
		'STOMPED_ENEMY_TEAM' // win before 15 minutes
	]
};
