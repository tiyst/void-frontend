export type Summoner = {
	puuid: string;
	accountId: string;
	summonerId: string;
	lastUpdated: number;
	gameName: string;
	tagLine: string;
	server: string;
	profileIcon: number;
	level: number;
	rank: Rank[];
	masteries: ChampionMastery[];
}

export type Rank = {
	id: number;
	leagueId: string;
	queueType: string;
	tier: string;
	division: string;
	leaguePoints: number;
	wins: number;
	losses: number;
	freshBlood: boolean;
	hotStreak: boolean;
	veteran: boolean;
	inactive: boolean;
	rankSeries: RankSeries | null;
}

export type RankSeries = {
	losses: number;
	progress: string;
	target: number;
	wins: number;
}

export type ChampionMastery = {
	id: number;
	championId: number;
	championLevel: number;
	championPoints: number;
	lastPlayTime: number;
	championPointsSinceLastLevel: number;
	championPointsUntilNextLevel: number;
	markRequiredForNextLevel: number;
	tokensEarned: number;
	championSeasonMilestone: number;
	milestoneGrades: string[];
	masteryMilestone: MasteryMilestone;
}

export type MasteryMilestone = {
	id: number;
	requireGradeCounts: Map<string, number>;
	rewardMarks: number;
	bonus: boolean;
	totalGamesRequires: number;
}

