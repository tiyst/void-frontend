export interface Summoner {
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

export interface Rank {
	id: number;
	summoner: Summoner;
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
	rankSeries: RankSeries;
}

export interface RankSeries {
	losses: number;
	progress: string;
	target: number;
	wins: number;
}

export interface ChampionMastery {
	id: number;
	summoner: Summoner;
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

export interface MasteryMilestone {
	id: number;
	requireGradeCounts: Map<string, number>;
	rewardMarks: number;
	bonus: boolean;
	totalGamesRequires: number;
}

