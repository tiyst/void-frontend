import {Rank} from "../src/model/Summoner";

export const mockRanks: Rank[] = [
	{
		id: 1,
		leagueId: "123456",
		queueType: "RANKED_SOLO_5x5",
		tier: "Platinum",
		division: "I",
		leaguePoints: 75,
		wins: 30,
		losses: 20,
		freshBlood: false,
		hotStreak: true,
		veteran: true,
		inactive: false,
		rankSeries: {
			progress: "WWL",
			wins: 2,
			losses: 1,
			target: 3,
		},
	},
	{
		id: 2,
		leagueId: "654321",
		queueType: "RANKED_FLEX_SR",
		tier: "Gold",
		division: "III",
		leaguePoints: 40,
		wins: 25,
		losses: 22,
		freshBlood: true,
		hotStreak: false,
		veteran: false,
		inactive: false,
		rankSeries: null,
	}
];