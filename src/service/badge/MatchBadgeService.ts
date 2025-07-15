import { Match, Participant } from '../../model/Match.ts';
import { Badge, BADGE_DEFINITIONS, BadgeConfig } from './BadgeDefinitions.ts';
import { BADGE_CONFIG } from './BadgeConfig.ts';
import { wasMatchRemade } from '../../utils/MatchUtils.ts';

export function calculateBadges(match: Match, playerGameName: string, config: BadgeConfig = BADGE_CONFIG): Badge[] {
	const playerParticipant = match.participants.find((p) => p.riotIdGameName === playerGameName);

	if (!playerParticipant || wasMatchRemade(match)) {
		console.log('No participant found for playerSummonerName: ', playerGameName);
		return [];
	}

	const appliedTags: Set<string> = new Set();

	const eligibleBadges = getEligibleBadges(match, playerParticipant, config);

	const finalBadges: Badge[] = [];
	for (const tempBadge of eligibleBadges) {
		const badgeDef = tempBadge.badgeDef;
		if (badgeDef.tag && appliedTags.has(badgeDef.tag)) {
			continue; // Skip if a badge from this tag group has already been added
		}

		finalBadges.push({
			id: badgeDef.id,
			name: badgeDef.name,
			description: badgeDef.description(playerParticipant, match),
			icon: badgeDef.icon,
			priority: tempBadge.priority,
			rarity: badgeDef.rarity
		});

		if (badgeDef.tag) {
			appliedTags.add(badgeDef.tag);
		}

		if (finalBadges.length >= config.maxBadges) {
			break;
		}
	}

	return finalBadges;
}

function getEligibleBadges(match: Match, playerParticipant: Participant, config: BadgeConfig) {
	return BADGE_DEFINITIONS.filter((badgeDef) => !badgeDef.gameModes || badgeDef.gameModes.includes(match.gameMode))
		.filter((badgeDef) => badgeDef.condition(playerParticipant, match))
		.map((badgeDef) => {
			return {
				badgeDef: badgeDef,
				priority: config.badgePriorities.indexOf(badgeDef.id)
			};
		})
		.filter((tempBadge) => tempBadge.priority !== -1)
		.toSorted((a, b) => a.priority - b.priority);
}
