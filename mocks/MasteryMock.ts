import { ChampionMastery } from '../src/model/Summoner';

export const mockMasteries: ChampionMastery[] = [
	{
		id: 1,
		championId: 101,
		championLevel: 7,
		championPoints: 145000,
		lastPlayTime: 1672531200000,
		championPointsSinceLastLevel: 0,
		championPointsUntilNextLevel: 0,
		markRequiredForNextLevel: 0,
		tokensEarned: 3,
		championSeasonMilestone: 4,
		milestoneGrades: ['S', 'A', 'A+'],
		masteryMilestone: {
			id: 1,
			requireGradeCounts: {
				S: 5,
				A: 10,
				B: 20
			},
			rewardMarks: 2,
			bonus: true,
			totalGamesRequires: 50
		}
	},
	{
		id: 2,
		championId: 222,
		championLevel: 6,
		championPoints: 89000,
		lastPlayTime: 1672444800000,
		championPointsSinceLastLevel: 5000,
		championPointsUntilNextLevel: 10000,
		markRequiredForNextLevel: 1,
		tokensEarned: 2,
		championSeasonMilestone: 3,
		milestoneGrades: ['A', 'B', 'B+'],
		masteryMilestone: {
			id: 2,
			requireGradeCounts: {
				S: 3,
				A: 8,
				B: 15
			},
			rewardMarks: 1,
			bonus: false,
			totalGamesRequires: 40
		}
	}
];
