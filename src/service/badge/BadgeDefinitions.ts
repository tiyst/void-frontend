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

function calculateTotalCs(participant: Participant) {
	return participant.totalMinionsKilled + participant.neutralMinionsKilled;
}

export const BADGE_DEFINITIONS: BadgeDefinition[] = [
	{
		id: 'PENTAKILL',
		name: 'ONE MAN ARMY',
		description: () => 'Achieved a Pentakill!',
		icon: '/badges/star.svg',
		rarity: 'legendary',
		condition: (p) => p.pentaKills > 0,
		tag: 'MULTIKILL'
	},
	{
		id: 'QUADRAKILL',
		name: 'FOUR FELL DOWN',
		description: () => 'Achieved a Quadrakill!',
		icon: '/badges/star.svg',
		rarity: 'legendary',
		condition: (p) => p.quadraKills > 0,
		tag: 'MULTIKILL'
	},
	{
		id: 'FIRST_BLOOD',
		name: 'EARLY BIRD SPECIAL',
		description: () => 'Got First Blood. Jankos would be proud of you.',
		icon: '/badges/target.svg',
		rarity: 'legendary',
		condition: (p) => p.firstBloodKill,
		gameModes: ['CLASSIC']
	},
	{
		id: 'PERFECT_GAME',
		name: 'PERFECTIONIST',
		description: () => 'Perfect Game (0 deaths, 0 turrets & objectives lost).',
		icon: '/badges/star.svg',
		rarity: 'legendary',
		condition: (p) => p.challenges && p.challenges.perfectGame === 1,
		tag: 'KDA'
	},
	{
		id: 'HIGH_KDA',
		name: 'HIGH KDA',
		description: (p) => `You had very high KDA (${calculateKdaFromParticipant(p).toFixed(1)}). Banger...`,
		icon: '/badges/skull.svg',
		rarity: 'legendary',
		condition: (p) => calculateKdaFromParticipant(p) >= 10,
		tag: 'KDA'
	},
	{
		id: 'HIGHEST_KDA_GAME',
		name: 'KDA PLAYER',
		description: (p) => `Highest KDA in the Game (${calculateKdaFromParticipant(p).toFixed(1)}).`,
		icon: '/badges/skull.svg',
		rarity: 'legendary',
		condition: (p, match) =>
			calculateKdaFromParticipant(p) ===
			Math.max(...match.participants.map((part) => calculateKdaFromParticipant(part))),
		tag: 'KDA'
	},
	{
		id: 'HIGHEST_KDA_TEAM_WIN',
		name: 'I PEAKED HERE',
		description: (p) => `Highest KDA in your Team (${calculateKdaFromParticipant(p).toFixed(1)})`,
		icon: '/badges/skull.svg',
		rarity: 'legendary',
		condition: (p, match) =>
			p.win &&
			calculateKdaFromParticipant(p) ===
				Math.max(
					...match.participants
						.filter((part) => part.teamId === p.teamId)
						.map((part) => calculateKdaFromParticipant(part))
				),
		tag: 'KDA'
	},
	{
		id: 'HIGHEST_KDA_TEAM_LOSS',
		name: 'BAITER',
		description: (p) => `Highest KDA in your Team (${calculateKdaFromParticipant(p).toFixed(1)})`,
		icon: '/badges/skull.svg',
		rarity: 'legendary',
		condition: (p, match) =>
			!p.win &&
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
		description: (p) => `You dealt the most damage in the entire game! (${p.totalDamageDealtToChampions})`,
		icon: '/badges/sword.svg',
		rarity: 'legendary',
		condition: (p, match) =>
			p.totalDamageDealtToChampions ===
			Math.max(...match.participants.map((part) => part.totalDamageDealtToChampions)),
		tag: 'DAMAGE'
	},
	{
		id: 'HIGHEST_DAMAGE_TEAM',
		name: 'TEAM TOO HEAVY',
		description: (p) => `You dealt the most damage in your entire team! (${p.totalDamageDealtToChampions})`,
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
		name: 'FARMING SIMULATOR',
		description: (p, match) =>
			`You achieved very high CSPM (${(calculateTotalCs(p) / (match.gameDuration / 60)).toFixed(1)}).`,
		icon: '/badges/minion.svg',
		rarity: 'legendary',
		condition: (p, match) => calculateTotalCs(p) / (match.gameDuration / 60) >= 9.5,
		gameModes: ['CLASSIC'],
		tag: 'CS'
	},
	{
		id: 'MOST_CS_GAME',
		name: 'THE TRUE HARVEST',
		description: (p) => `You had the most CS in the game! (${calculateTotalCs(p)})`,
		icon: '/badges/minion.svg',
		rarity: 'legendary',
		condition: (p, match) =>
			calculateTotalCs(p) === Math.max(...match.participants.map((part) => calculateTotalCs(part))),
		gameModes: ['CLASSIC'],
		tag: 'CS'
	},
	{
		id: 'MOST_CS_TEAM',
		name: 'MINION TAX',
		description: (p) => `You had the most CS in your team! (${calculateTotalCs(p)})`,
		icon: '/badges/minion.svg',
		rarity: 'legendary',
		condition: (p, match) =>
			calculateTotalCs(p) ===
			Math.max(
				...match.participants.filter((part) => part.teamId === p.teamId).map((part) => calculateTotalCs(part))
			),
		gameModes: ['CLASSIC'],
		tag: 'CS'
	},
	{
		id: 'NO_DEATHS_ARAM',
		name: 'IDIOT',
		description: () => 'You had no deaths! IN ARAM!!!',
		icon: '/badges/cross.svg',
		rarity: 'legendary',
		condition: (p) => p.deaths === 0,
		tag: 'DEATHS'
	},
	{
		id: 'NO_DEATHS_WIN',
		name: 'UNTOUCHABLE',
		description: () => 'You had no deaths!',
		icon: '/badges/cross.svg',
		rarity: 'legendary',
		condition: (p) => p.deaths === 0 && p.win,
		tag: 'DEATHS'
	},
	{
		id: 'NO_DEATHS_LOSS',
		name: 'YOU TRIED',
		description: () => 'You had no deaths! And you still lost. :kekl:',
		icon: '/badges/cross.svg',
		rarity: 'legendary',
		condition: (p) => p.deaths === 0 && !p.win,
		tag: 'DEATHS'
	},
	{
		id: 'MOST_DEATHS_WIN',
		name: 'LIMIT TESTING',
		description: (p) => `You had the most deaths in the game! (${p.deaths})`,
		icon: '/badges/cross.svg',
		rarity: 'legendary',
		condition: (p, match) => p.win && p.deaths === Math.max(...match.participants.map((part) => part.deaths)),
		tag: 'DEATHS'
	},
	{
		id: 'MOST_DEATHS_LOSS',
		name: 'FEARLESS',
		description: (p) => `You had the most deaths in the game! (${p.deaths})`,
		icon: '/badges/cross.svg',
		rarity: 'legendary',
		condition: (p, match) => !p.win && p.deaths === Math.max(...match.participants.map((part) => part.deaths)),
		tag: 'DEATHS'
	},
	{
		id: 'MOST_GOLD',
		name: 'UNCLE SAM',
		description: (p) => `You earned the most gold in the entire game. (${p.goldEarned})`,
		icon: '/badges/gold.svg',
		rarity: 'legendary',
		condition: (p, match) => p.goldEarned === Math.max(...match.participants.map((part) => part.goldEarned))
	},
	{
		id: 'MOST_VISION',
		name: "CAN'T HIDE",
		description: (p) => `You had the highest Vision Score in the game! (${p.visionScore})`,
		icon: '/badges/vision.svg',
		rarity: 'legendary',
		condition: (p, match) => p.visionScore === Math.max(...match.participants.map((part) => part.visionScore)),
		gameModes: ['CLASSIC'],
		tag: 'VISION_SCORE'
	},
	{
		id: 'VISION_SCORE_BETTER_THAN_OPPONENT',
		name: 'I SEE YOU',
		description: () => "You out-Vision Score'd your opponent.",
		icon: '/badges/vision.svg',
		rarity: 'legendary',
		condition: (p) => p.challenges && (p.challenges?.visionScoreAdvantageLaneOpponent ?? 0) > 0,
		gameModes: ['CLASSIC'],
		tag: 'VISION_SCORE'
	},
	{
		id: 'HEALED_MORE_THAN_DAMAGED',
		name: 'THOU SHALL NOT DIE',
		description: (p) => `Healed more than damage dealt ${p.totalHealsOnTeammates}`,
		icon: '/badges/healed.svg',
		rarity: 'legendary',
		condition: (p) => p.totalHealsOnTeammates > p.totalDamageDealtToChampions
	},
	{
		id: 'STOMPED_ENEMY_TEAM',
		name: 'KILL GAP',
		description: () => 'Won before 15 minutes',
		icon: '/badges/boot.svg',
		rarity: 'epic',
		condition: (p, match) => p.win && match.gameDuration < 15 * 60
	},
	{
		id: 'TANKED_100K',
		name: 'PUNCHING BAG',
		description: (p) => `Tanked more than 100k (${p.totalDamageTaken})`,
		icon: '/badges/shield.svg',
		rarity: 'epic',
		condition: (p) => p.totalDamageTaken > 100000,
		tag: 'TANK'
	},
	{
		id: 'TAKEN_MOST_DAMAGE',
		name: 'MEAT SHIELD',
		description: (p) => `Taken most damage in game (${p.totalDamageTaken})`,
		icon: '/badges/shield.svg',
		rarity: 'legendary',
		condition: (p, match) =>
			p.totalDamageTaken === Math.max(...match.participants.map((part) => part.totalDamageTaken)),
		tag: 'TANK'
	},
	{
		id: 'HUNDRED_PERCENT_KILL_PARTICIPATION',
		name: 'PERFECT ATTENDANCE',
		description: () => `You achieved 100% kill participation in the game`,
		icon: '/badges/skull.svg',
		rarity: 'legendary',
		condition: (p, match) => calculateKillParticipation(p, match) > 99
	},
	{
		id: 'HIGH_KILL_PARTICIPATION',
		name: 'TEAMFIGHT MAGNET',
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
		name: 'BUBBLE WRAP ENTHUSIAST',
		description: (p) =>
			`Shielded more damage than dealt (${p.totalDamageShieldedOnTeammates} / ${p.totalDamageDealt})`,
		icon: '/badges/shield.svg',
		rarity: 'legendary',
		condition: (p) => p.totalDamageShieldedOnTeammates > p.totalDamageDealt
	},
	{
		id: 'WON_WITH_INHIBITOR_LOST',
		name: 'AGAINST THE ODDS',
		description: () => 'Won a game after losing an inhibitor',
		icon: '/badges/sparkle.svg',
		rarity: 'legendary',
		condition: (p) => p.inhibitorsLost > 0,
		tag: 'COMEBACK'
	},
	{
		id: 'HAD_OPEN_NEXUS',
		name: 'FROM THE ASHES',
		description: () => 'Won a game after having an open nexus',
		icon: '/badges/sparkle.svg',
		rarity: 'legendary',
		condition: (p) => p.challenges && (p.challenges.hadOpenNexus ?? 0) > 0,
		tag: 'COMEBACK'
	},
	{
		id: 'LARGEST_CRITICAL_STRIKE',
		name: 'ONE PUNCH MAN',
		description: (p) => `Dealt a huge critical strike! (${p.largestCriticalStrike})`,
		icon: '/badges/crit.svg',
		rarity: 'legendary',
		condition: (p) => p.largestCriticalStrike > 999
	},
	{
		id: 'OBJECTIVE_STOLEN',
		name: 'YOINK',
		description: () => 'Stole an objective from the enemy team',
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
		name: 'THE BRO CODE',
		description: () => 'Participated in team fist bump!',
		icon: '/badges/sparkle.svg',
		rarity: 'legendary',
		condition: (p) => p.challenges && (p.challenges.fistBumpParticipation ?? 0) > 0
	},
	{
		id: 'ACHIEVED_A_FLAWLESS_ACE',
		name: "DIDN' BREAK A SWEAT",
		description: () => 'Your team has achieved a flawless ace!',
		icon: '/badges/sparkle.svg',
		rarity: 'legendary',
		condition: (p) => p.challenges && (p.challenges.flawlessAces ?? 0) > 0
	},
	{
		id: 'JUNGLE_CS_BEFORE_10MINS',
		name: 'EFFICIENT PATHING',
		description: (p) =>
			`You were ahead of your jungle opponent by ${p.challenges.jungleCsBefore10Minutes}CS in 10th minute`,
		icon: '/badges/jungle.svg',
		rarity: 'legendary',
		condition: (p) => p.challenges && (p.challenges.jungleCsBefore10Minutes ?? 0) > 40,
		gameModes: ['CLASSIC']
	},
	{
		id: 'MAX_CS_ADVANTAGE_ON_LANE_OPPONENT',
		name: 'FLAME HORIZON',
		description: (p) =>
			`At one point in the game, You were ahead of your lane opponent by ${p.challenges.maxCsAdvantageOnLaneOpponent}CS`,
		icon: '/badges/minion.svg',
		rarity: 'legendary',
		condition: (p) => p.challenges && (p.challenges.maxCsAdvantageOnLaneOpponent ?? 0) >= 100,
		gameModes: ['CLASSIC']
	},
	{
		id: 'MULTIKILL_WITH_ONE_SPELL',
		name: 'PRESS R TO WIN',
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
		name: 'NOPE...',
		description: () => 'You insta-cleansed a CC',
		icon: '/badges/sparkle.svg',
		rarity: 'legendary',
		condition: (p) => p.challenges && (p.challenges.quickCleanse ?? 0) > 0
	},
	{
		id: 'LARGE_TEAM_DAMAGE_PERCENTAGE',
		name: 'BRINGER OF DEATH',
		description: (p) => `You had a team damage share of ${p.challenges.teamDamagePercentage}%`,
		icon: '/badges/star.svg',
		rarity: 'legendary',
		condition: (p) => p.challenges && (p.challenges.teamDamagePercentage ?? 0) > 40
	}
];
