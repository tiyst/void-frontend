import { Match, Participant } from '../../model/Match.ts';
import { calculateKDA } from '../../utils/MatchUtils.ts';

export interface Badge {
	id: string;
	name: string;
	description: string;
	icon: string;
	priority: number;
	rarity: 'trash' | 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary'; // Not used for now
}

export interface BadgeConfig {
	maxBadges: number;
	badgePriorities: string[];
}

export interface BadgeDefinition {
	id: string;
	name: string;
	description: (participant: Participant, match: Match) => string;
	icon: string;
	rarity: 'trash' | 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
	condition: (participant: Participant, match: Match) => boolean;
	gameModes?: string[]; // Game modes this badge applies to. If undefined, applies to all.
	tag?: string; // Only one badge per tag can be applied.
}

function calculateKdaFromParticipant(p: Participant): number {
	return calculateKDA(p.kills, p.deaths, p.assists);
}

function calculateKillParticipation(participant: Participant, match: Match) {
	const participantTeamId = participant.teamId;
	const teamKills = match.participants
		.filter((p) => p.teamId === participantTeamId)
		.reduce((sum, part) => sum + part.kills, 0);

	return (participant.kills + participant.assists) / (teamKills || 1);
}

export const BADGE_DEFINITIONS: BadgeDefinition[] = [
	{
		id: 'PENTAKILL',
		name: 'PENTAKILL',
		description: () => 'Achieved a Pentakill!',
		icon: '/badges/star.svg',
		rarity: 'legendary',
		condition: (p) => p.pentaKills > 0,
		tag: 'MULTIKILL'
	},
	{
		id: 'QUADRAKILL',
		name: 'QUADRAKILL',
		description: () => 'Achieved a Quadrakill!',
		icon: '/badges/star.svg',
		rarity: 'legendary',
		condition: (p) => p.quadraKills > 0,
		tag: 'MULTIKILL'
	},
	{
		id: 'FIRST_BLOOD',
		name: 'FIRST BLOOD',
		description: () => 'Got First Blood',
		icon: '/badges/target.svg',
		rarity: 'legendary',
		condition: (p) => p.firstBloodKill,
		gameModes: ['CLASSIC']
	},
	{
		id: 'PERFECT_GAME',
		name: 'PERFECTIONIST',
		description: () => 'Perfect Game (0 deaths, 0 turrets & objectives lost)',
		icon: '/badges/star.svg',
		rarity: 'legendary',
		condition: (p) => p.challenges && p.challenges.perfectGame === 1,
		tag: 'KDA'
	},
	{
		id: 'HIGH_KDA',
		name: 'HIGH KDA',
		description: (p) => `High KDA (${calculateKdaFromParticipant(p).toFixed(1)})`,
		icon: '/badges/skull.svg',
		rarity: 'legendary',
		condition: (p) => calculateKdaFromParticipant(p) >= 10,
		tag: 'KDA'
	},
	{
		id: 'HIGHEST_KDA_GAME',
		name: 'KDA PLAYER',
		description: (p) => `Highest KDA in Game (${calculateKdaFromParticipant(p).toFixed(1)})`,
		icon: '/badges/skull.svg',
		rarity: 'legendary',
		condition: (p, match) =>
			calculateKdaFromParticipant(p) ===
			Math.max(...match.participants.map((part) => calculateKdaFromParticipant(part))),
		tag: 'KDA'
	},
	{
		id: 'HIGHEST_KDA_TEAM',
		name: 'BAITER',
		description: (p) => `Highest KDA in Team (${calculateKdaFromParticipant(p).toFixed(1)})`,
		icon: '/badges/skull.svg',
		rarity: 'legendary',
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
		id: 'HIGHEST_DAMAGE_GAME',
		name: 'THE CARRY',
		description: () => 'Most Damage Dealt',
		icon: '/badges/sword.svg',
		rarity: 'legendary',
		condition: (p, match) =>
			p.totalDamageDealtToChampions ===
			Math.max(...match.participants.map((part) => part.totalDamageDealtToChampions)),
		tag: 'DAMAGE'
	},
	{
		id: 'HIGHEST_DAMAGE_TEAM',
		name: 'THE (almost) CARRY',
		description: () => 'Most Damage in Team',
		icon: '/badges/sword.svg',
		rarity: 'legendary',
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
		id: 'HIGH_CSPM',
		name: 'High CS/m',
		description: (p, match) =>
			`High CSPM (${((p.totalMinionsKilled + p.neutralMinionsKilled) / (match.gameDuration / 60)).toFixed(1)})`,
		icon: '/badges/minion.svg',
		rarity: 'legendary',
		condition: (p, match) => (p.totalMinionsKilled + p.neutralMinionsKilled) / (match.gameDuration / 60) >= 9.5,
		gameModes: ['CLASSIC'],
		tag: 'CS'
	},
	{
		id: 'MOST_CS_GAME',
		name: 'FARMER++',
		description: (p) => `Most CS in game (${p.totalMinionsKilled})`,
		icon: '/badges/minion.svg',
		rarity: 'legendary',
		condition: (p, match) =>
			p.totalMinionsKilled === Math.max(...match.participants.map((part) => part.totalMinionsKilled)),
		gameModes: ['CLASSIC'],
		tag: 'CS'
	},
	{
		id: 'MOST_CS_TEAM',
		name: 'FARMER',
		description: (p) => `Most CS in team (${p.totalMinionsKilled})`,
		icon: '/badges/minion.svg',
		rarity: 'legendary',
		condition: (p, match) =>
			p.totalMinionsKilled ===
			Math.max(
				...match.participants.filter((part) => part.teamId === p.teamId).map((part) => part.totalMinionsKilled)
			),
		gameModes: ['CLASSIC'],
		tag: 'CS'
	},
	{
		id: 'NO_DEATHS',
		name: 'BAITER',
		description: () => 'No Deaths',
		icon: '/badges/cross.svg',
		rarity: 'legendary',
		condition: (p) => p.deaths === 0
	},
	{
		id: 'MOST_DEATHS',
		name: 'FEARLESS',
		description: () => 'Most deaths in the game',
		icon: '/badges/cross.svg',
		rarity: 'legendary',
		condition: (p, match) => p.deaths === Math.max(...match.participants.map((part) => part.deaths))
	},
	{
		id: 'MOST_GOLD',
		name: 'RICH',
		description: () => 'Most Gold Earned',
		icon: '/badges/gold.svg',
		rarity: 'legendary',
		condition: (p, match) => p.goldEarned === Math.max(...match.participants.map((part) => part.goldEarned))
	},
	{
		id: 'MOST_VISION',
		name: 'THE EYE',
		description: () => 'Most Vision Score',
		icon: '/badges/vision.svg',
		rarity: 'legendary',
		condition: (p, match) => p.visionScore === Math.max(...match.participants.map((part) => part.visionScore)),
		gameModes: ['CLASSIC'],
		tag: 'VISION_SCORE'
	},
	{
		id: 'VISION_SCORE_BETTER_THAN_OPPONENT',
		name: 'ALL SEEING EYE',
		description: () => 'Vision Score Better Than Opponent',
		icon: '/badges/vision.svg',
		rarity: 'legendary',
		condition: (p) => p.challenges && (p.challenges?.visionScoreAdvantageLaneOpponent ?? 0) > 0,
		gameModes: ['CLASSIC'],
		tag: 'VISION_SCORE'
	},
	{
		id: 'HEALED_MORE_THAN_DAMAGED',
		name: 'HEALER',
		description: () => 'Healed more than damage dealt',
		icon: '/badges/healed.svg',
		rarity: 'legendary',
		condition: (p) => p.totalHealsOnTeammates > p.totalDamageDealtToChampions
	},
	{
		id: 'STOMPED_ENEMY_TEAM',
		name: 'STOMP',
		description: () => 'Won before 15 minutes',
		icon: '/badges/boot.svg',
		rarity: 'epic',
		condition: (p, match) => p.win && match.gameDuration < 15 * 60
	},
	{
		id: 'TANKED_100K',
		name: 'THE TANK',
		description: () => 'Tanked more than 100k',
		icon: '/badges/shield.svg',
		rarity: 'epic',
		condition: (p) => p.totalDamageTaken > 100000,
		tag: 'TANK'
	},
	{
		id: 'TAKEN_MOST_DAMAGE',
		name: 'THE TANK',
		description: () => 'Taken most damage in game',
		icon: '/badges/shield.svg',
		rarity: 'legendary',
		condition: (p, match) =>
			p.totalDamageTaken === Math.max(...match.participants.map((part) => part.totalDamageTaken)),
		tag: 'TANK'
	},
	{
		id: 'HIGH_KILL_PARTICIPATION',
		name: 'ALWAYS PRESENT',
		description: (p, m) =>
			`Highest kill participation in the game ${Math.round(calculateKillParticipation(p, m) * 100)}%`,
		icon: '/badges/skull.svg',
		rarity: 'legendary',
		condition: (p, match) =>
			calculateKillParticipation(p, match) ===
			Math.max(...match.participants.map((part) => calculateKillParticipation(part, match)))
	},
	{
		id: 'SHIELD_MORE_THAN_DAMAGED',
		name: 'SHIELD MASTER',
		description: () => 'Shielded more damage than dealt',
		icon: '/badges/shield.svg',
		rarity: 'legendary',
		condition: (p) => p.totalDamageShieldedOnTeammates > p.totalDamageDealt
	},
	{
		id: 'WON_WITH_INHIBITOR_LOST',
		name: 'COMEBACK',
		description: () => 'Won a game after losing an inhibitor',
		icon: '/badges/sparkle.svg',
		rarity: 'legendary',
		condition: (p) => p.inhibitorsLost > 0,
		tag: 'COMEBACK'
	},
	{
		id: 'HAD_OPEN_NEXUS',
		name: 'HUGE COMEBACK',
		description: () => 'Won a game after having and open nexus',
		icon: '/badges/sparkle.svg',
		rarity: 'legendary',
		condition: (p) => p.challenges && (p.challenges.hadOpenNexus ?? 0) > 0,
		tag: 'COMEBACK'
	},
	{
		id: 'LARGEST_CRITICAL_STRIKE',
		name: 'TONS OF DAMAGE',
		description: (p) => `Dealt a huge critical strike (${p.largestCriticalStrike})`,
		icon: '/badges/crit.svg',
		rarity: 'legendary',
		condition: (p) => p.largestCriticalStrike > 999
	},
	{
		id: 'OBJECTIVE_STOLEN',
		name: 'THIEF',
		description: () => 'Stolen an objective from the enemy team',
		icon: '/badges/baron.svg',
		rarity: 'legendary',
		condition: (p) =>
			p.objectivesStolen > 0 ||
			p.objectivesStolenAssists > 0 ||
			(p.challenges?.epicMonsterSteals ?? 0) > 0 ||
			(p.challenges?.epicMonsterStolenWithoutSmite ?? 0) > 0
	},
	{
		id: 'PARTICIPATED_IN_FIST_BUMP',
		name: 'FIST BUMP',
		description: () => 'Participated in team fist bump!',
		icon: '/badges/sparkle.svg',
		rarity: 'legendary',
		condition: (p) => p.challenges && (p.challenges.fistBumpParticipation ?? 0) > 0
	},
	{
		id: 'ACHIEVED_A_FLAWLESS_ACE',
		name: 'FLAWLESS ACE',
		description: () => 'Your team has achieved a flawless ace!',
		icon: '/badges/sparkle.svg',
		rarity: 'legendary',
		condition: (p) => p.challenges && (p.challenges.flawlessAces ?? 0) > 0
	},
	{
		id: 'JUNGLE_CS_BEFORE_10MINS',
		name: 'JUNGLE CANYON',
		description: (p) => `You were ahead of your jungle opponent by ${p.challenges.jungleCsBefore10Minutes}CS`,
		icon: '/badges/jungle.svg',
		rarity: 'legendary',
		condition: (p) => p.challenges && (p.challenges.jungleCsBefore10Minutes ?? 0) > 40,
		gameModes: ['CLASSIC']
	},
	{
		id: 'MAX_CS_ADVANTAGE_ON_LANE_OPPONENT',
		name: 'FLAME HORIZON',
		description: (p) => `You were ahead of your lane opponent by ${p.challenges.maxCsAdvantageOnLaneOpponent}CS`,
		icon: '/badges/minion.svg',
		rarity: 'legendary',
		condition: (p) => p.challenges && (p.challenges.maxCsAdvantageOnLaneOpponent ?? 0) >= 100,
		gameModes: ['CLASSIC']
	},
	{
		id: 'MULTIKILL_WITH_ONE_SPELL',
		name: 'MAGICIAN',
		description: () => 'You achieved a multikill with one spell',
		icon: '/badges/mage.svg',
		rarity: 'legendary',
		condition: (p) => p.challenges && (p.challenges.multiKillOneSpell ?? 0) > 0
	},
	{
		id: 'CAUSED_PORO_EXPLOSION',
		name: 'PORO ENJOYER',
		description: () => 'Your team exploded a poro',
		icon: '/badges/sparkle.svg',
		rarity: 'legendary',
		condition: (p) => p.challenges && (p.challenges.poroExplosions ?? 0) > 0,
		gameModes: ['ARAM']
	},
	{
		id: 'MADE_QUICK_CLEANSE',
		name: 'CPT JACK',
		description: () => 'You insta-cleansed a CC',
		icon: '/badges/sparkle.svg',
		rarity: 'legendary',
		condition: (p) => p.challenges && (p.challenges.quickCleanse ?? 0) > 0
	},
	{
		id: 'LARGE_TEAM_DAMAGE_PERCENTAGE',
		name: 'BRINGER OF DEATH',
		description: (p) => `You had a team damage percentage of ${p.challenges.teamDamagePercentage}%`,
		icon: '/badges/star.svg',
		rarity: 'legendary',
		condition: (p) => p.challenges && (p.challenges.teamDamagePercentage ?? 0) > 40
	}
];
