import { Match } from '../model/Match';
import { BADGE_DEFINITIONS, Badge, BadgeConfig, DEFAULT_BADGE_CONFIG } from './BadgeDefinitions.ts';



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
		.toSorted((a, b) => a.priority - b.priority);

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
