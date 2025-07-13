import { Match, Participant } from '../model/Match';
import { calculateKDA } from '../utils/MatchUtils.ts';

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

interface BadgeDefinition {
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

const BADGE_DEFINITIONS: BadgeDefinition[] = [
	{
		name: 'PENTAKILL',
		description: () => 'Achieved a Pentakill!',
		icon: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2L1 21h22L12 2zm0 3.84L18.14 19H5.86L12 5.84zM12 10a2 2 0 100 4 2 2 0 000-4z"/></svg>',
		condition: (p) => p.pentaKills > 0,
		tag: 'MULTIKILL'
	},
	{
		name: 'QUADRAKILL',
		description: () => 'Achieved a Quadrakill!',
		icon: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2L1 21h22L12 2zm0 3.84L18.14 19H5.86L12 5.84zM12 10a2 2 0 100 4 2 2 0 000-4z"/></svg>',
		condition: (p) => p.quadraKills > 0,
		tag: 'MULTIKILL'
	},
	{
		name: 'FIRST_BLOOD',
		description: () => 'First Blood',
		icon: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2L1 21h22L12 2zm0 3.84L18.14 19H5.86L12 5.84zM12 10a2 2 0 100 4 2 2 0 000-4z"/></svg>',
		condition: (p) => p.firstBloodKill || p.firstBloodAssist,
		gameModes: ['CLASSIC']
	},
	{
		name: 'HIGH_KDA',
		description: (p) => `Highest game KDA (${calculateKdaFromParticipant(p)})`,
		icon: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2L1 21h22L12 2zm0 3.84L18.14 19H5.86L12 5.84zM12 10a2 2 0 100 4 2 2 0 000-4z"/></svg>',
		condition: (p) => calculateKdaFromParticipant(p) >= 10,
		tag: 'KDA'
	},
	{
		name: 'HIGHEST_KDA_GAME',
		description: (p) => `High KDA (${((p.kills + p.assists) / Math.max(1, p.deaths)).toFixed(1)})`,
		icon: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2L1 21h22L12 2zm0 3.84L18.14 19H5.86L12 5.84zM12 10a2 2 0 100 4 2 2 0 000-4z"/></svg>',
		condition: (p) => (p.kills + p.assists) / Math.max(1, p.deaths) >= 10,
		tag: 'KDA'
	},
	{
		name: 'HIGHEST_KDA_TEAM',
		description: (p) => `High KDA (${((p.kills + p.assists) / Math.max(1, p.deaths)).toFixed(1)})`,
		icon: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2L1 21h22L12 2zm0 3.84L18.14 19H5.86L12 5.84zM12 10a2 2 0 100 4 2 2 0 000-4z"/></svg>',
		condition: (p) => (p.kills + p.assists) / Math.max(1, p.deaths) >= 10,
		tag: 'KDA'
	},
	{
		name: 'HIGHEST_DAMAGE_GAME',
		description: () => 'Most Damage Dealt',
		icon: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2L1 21h22L12 2zm0 3.84L18.14 19H5.86L12 5.84zM12 10a2 2 0 100 4 2 2 0 000-4z"/></svg>',
		condition: (p, match) =>
			p.totalDamageDealtToChampions ===
			Math.max(...match.participants.map((part) => part.totalDamageDealtToChampions))
	},
	{
		name: 'HIGHEST_DAMAGE_TEAM',
		description: () => 'Most Damage Dealt',
		icon: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2L1 21h22L12 2zm0 3.84L18.14 19H5.86L12 5.84zM12 10a2 2 0 100 4 2 2 0 000-4z"/></svg>',
		condition: (p, match) =>
			p.totalDamageDealtToChampions ===
			Math.max(...match.participants.map((part) => part.totalDamageDealtToChampions))
	},
	{
		name: 'MOST_CS',
		description: () => 'Most CS',
		icon: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2L1 21h22L12 2zm0 3.84L18.14 19H5.86L12 5.84zM12 10a2 2 0 100 4 2 2 0 000-4z"/></svg>',
		condition: (p, match) =>
			p.totalMinionsKilled === Math.max(...match.participants.map((part) => part.totalMinionsKilled)),
		gameModes: ['CLASSIC'] // Only for Summoner's Rift
	},
	{
		name: 'NO_DEATHS',
		description: () => 'No Deaths',
		icon: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2L1 21h22L12 2zm0 3.84L18.14 19H5.86L12 5.84zM12 10a2 2 0 100 4 2 2 0 000-4z"/></svg>',
		condition: (p) => p.deaths === 0,
		gameModes: ['CLASSIC'] // Only for Summoner's Rift
	},
	{
		name: 'MOST_GOLD',
		description: () => 'Most Gold Earned',
		icon: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2L1 21h22L12 2zm0 3.84L18.14 19H5.86L12 5.84zM12 10a2 2 0 100 4 2 2 0 000-4z"/></svg>',
		condition: (p, match) => p.goldEarned === Math.max(...match.participants.map((part) => part.goldEarned)),
		gameModes: ['CLASSIC'] // Only for Summoner's Rift
	},
	{
		name: 'MOST_VISION',
		description: () => 'Most Vision Score',
		icon: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2L1 21h22L12 2zm0 3.84L18.14 19H5.86L12 5.84zM12 10a2 2 0 100 4 2 2 0 000-4z"/></svg>',
		condition: (p, match) => p.visionScore === Math.max(...match.participants.map((part) => part.visionScore)),
		gameModes: ['CLASSIC'], // Only for Summoner's Rift
		tag: 'VISION_SCORE'
	},
	{
		name: 'VISION_SCORE_BETTER_THAN_OPPONENT',
		description: () => 'Vision Score Better Than Opponent',
		icon: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2L1 21h22L12 2zm0 3.84L18.14 19H5.86L12 5.84zM12 10a2 2 0 100 4 2 2 0 000-4z"/></svg>',
		condition: (p, match) => p.visionScore === Math.max(...match.participants.map((part) => part.visionScore)),
		gameModes: ['CLASSIC'], // Only for Summoner's Rift
		tag: 'VISION_SCORE'
	}
];

const DEFAULT_BADGE_CONFIG: BadgeConfig = {
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

export function calculateBadges(match: Match, playerName: string, config: BadgeConfig = DEFAULT_BADGE_CONFIG): Badge[] {
	const playerParticipant = match.participants.find((p) => p.summonerName === playerName);

	if (!playerParticipant) {
		return [];
	}

	const appliedTags: Set<string> = new Set();

	const eligibleBadges = BADGE_DEFINITIONS.filter((badgeDef) => {
		if (badgeDef.gameModes && !badgeDef.gameModes.includes(match.gameMode)) {
			return false;
		}
		return badgeDef.condition(playerParticipant, match);
	})
		.map((badgeDef) => {
			// Map to a temporary badge object with priority
			return {
				badgeDef: badgeDef,
				priority: config.badgePriorities.indexOf(badgeDef.name)
			};
		})
		.filter((tempBadge) => tempBadge.priority !== -1) // Filter out badges not in priority list
		.toSorted((a, b) => a.priority - b.priority); // Sort by priority

	const finalBadges: Badge[] = [];
	for (const tempBadge of eligibleBadges) {
		const badgeDef = tempBadge.badgeDef;
		if (badgeDef.tag && appliedTags.has(badgeDef.tag)) {
			continue; // Skip if a badge from this tag group has already been added
		}

		finalBadges.push({
			name: badgeDef.name,
			description: badgeDef.description(playerParticipant, match),
			icon: badgeDef.icon,
			priority: tempBadge.priority
		});

		if (badgeDef.tag) {
			appliedTags.add(badgeDef.tag);
		}

		if (finalBadges.length >= config.maxBadges) {
			break;
		}
	}

	console.log('Calculated Badges:', finalBadges);
	console.log('Player Participant:', playerParticipant);

	return finalBadges;
}
