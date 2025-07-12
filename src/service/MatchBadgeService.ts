import { Match } from '../model/Match';

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

const DEFAULT_BADGE_CONFIG: BadgeConfig = {
	maxBadges: 3,
	badgePriorities: [
		'PENTAKILL',
		'QUADRAKILL',
		'TRIPLEKILL',
		'HIGH_KDA',
		'HIGH_DAMAGE',
		'HIGH_CS',
		'NO_DEATHS',
		'FIRST_BLOOD',
		'MOST_GOLD',
		'MOST_VISION'
	]
};

export function calculateBadges(match: Match, playerName: string, config: BadgeConfig = DEFAULT_BADGE_CONFIG): Badge[] {
	const playerParticipant = match.participants.find((p) => p.summonerName === playerName);

	if (!playerParticipant) {
		return [];
	}

	const badges: Badge[] = [];

	// Helper to add badge if criteria met
	const addBadge = (name: string, description: string, icon: string, condition: boolean) => {
		if (condition) {
			const priority = config.badgePriorities.indexOf(name);
			if (priority !== -1) {
				badges.push({ name, description, icon, priority });
			}
		}
	};

	// 1. Pentakill
	addBadge(
		'PENTAKILL',
		'Achieved a Pentakill!',
		'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L1 21h22L12 2zm0 3.84L18.14 19H5.86L12 5.84zM12 10a2 2 0 100 4 2 2 0 000-4z"/></svg>',
		playerParticipant.pentaKills > 0
	);

	// 2. Quadrakill
	addBadge(
		'QUADRAKILL',
		'Achieved a Quadrakill!',
		'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L1 21h22L12 2zm0 3.84L18.14 19H5.86L12 5.84zM12 10a2 2 0 100 4 2 2 0 000-4z"/></svg>',
		playerParticipant.quadraKills > 0
	);

	// 3. Triplekill
	addBadge(
		'TRIPLEKILL',
		'Achieved a Triplekill!',
		'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L1 21h22L12 2zm0 3.84L18.14 19H5.86L12 5.84zM12 10a2 2 0 100 4 2 2 0 000-4z"/></svg>',
		playerParticipant.tripleKills > 0
	);

	// 4. High KDA (e.g., KDA >= 10)
	const kda = (playerParticipant.kills + playerParticipant.assists) / Math.max(1, playerParticipant.deaths);
	addBadge(
		'HIGH_KDA',
		`High KDA (${kda.toFixed(1)})`,
		'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L1 21h22L12 2zm0 3.84L18.14 19H5.86L12 5.84zM12 10a2 2 0 100 4 2 2 0 000-4z"/></svg>',
		kda >= 10
	);

	// 5. High Damage Dealt (top 1 in game)
	const maxDamage = Math.max(...match.participants.map((p) => p.totalDamageDealtToChampions));
	addBadge(
		'HIGH_DAMAGE',
		'Most Damage Dealt',
		'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L1 21h22L12 2zm0 3.84L18.14 19H5.86L12 5.84zM12 10a2 2 0 100 4 2 2 0 000-4z"/></svg>',
		playerParticipant.totalDamageDealtToChampions === maxDamage
	);

	// 6. High CS (e.g., 10 CS/min)
	const gameDurationMinutes = match.gameDuration / 60;
	const csPerMinute = playerParticipant.totalMinionsKilled / gameDurationMinutes;
	addBadge(
		'HIGH_CS',
		`High CS (${csPerMinute.toFixed(1)}/min)`,
		'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L1 21h22L12 2zm0 3.84L18.14 19H5.86L12 5.84zM12 10a2 2 0 100 4 2 2 0 000-4z"/></svg>',
		csPerMinute >= 10
	);

	// 7. No Deaths
	addBadge(
		'NO_DEATHS',
		'No Deaths',
		'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L1 21h22L12 2zm0 3.84L18.14 19H5.86L12 5.84zM12 10a2 2 0 100 4 2 2 0 000-4z"/></svg>',
		playerParticipant.deaths === 0
	);

	// 8. First Blood
	addBadge(
		'FIRST_BLOOD',
		'First Blood',
		'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L1 21h22L12 2zm0 3.84L18.14 19H5.86L12 5.84zM12 10a2 2 0 100 4 2 2 0 000-4z"/></svg>',
		playerParticipant.firstBloodKill || playerParticipant.firstBloodAssist
	);

	// 9. Most Gold Earned (top 1 in game)
	const maxGold = Math.max(...match.participants.map((p) => p.goldEarned));
	addBadge(
		'MOST_GOLD',
		'Most Gold Earned',
		'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L1 21h22L12 2zm0 3.84L18.14 19H5.86L12 5.84zM12 10a2 2 0 100 4 2 2 0 000-4z"/></svg>',
		playerParticipant.goldEarned === maxGold
	);

	// 10. Most Vision Score (top 1 in game)
	const maxVisionScore = Math.max(...match.participants.map((p) => p.visionScore));
	addBadge(
		'MOST_VISION',
		'Most Vision Score',
		'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L1 21h22L12 2zm0 3.84L18.14 19H5.86L12 5.84zM12 10a2 2 0 100 4 2 2 0 000-4z"/></svg>',
		playerParticipant.visionScore === maxVisionScore
	);

	// Sort by priority and return top N
	const finalBadges = badges.toSorted((a, b) => a.priority - b.priority).slice(0, config.maxBadges);

	console.log('Calculated Badges:', finalBadges);
	console.log('Player Participant:', playerParticipant);

	return finalBadges;
}
