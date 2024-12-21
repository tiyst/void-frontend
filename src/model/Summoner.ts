export class Summoner {
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

	constructor(
		puuid: string,
		accountId: string,
		summonerId: string,
		lastUpdated: number,
		gameName: string,
		tagLine: string,
		server: string,
		profileIcon: number,
		level: number,
		rank: Rank[] = [],
		masteries: ChampionMastery[] = []
	) {
		this.puuid = puuid;
		this.accountId = accountId;
		this.summonerId = summonerId;
		this.lastUpdated = lastUpdated;
		this.gameName = gameName;
		this.tagLine = tagLine;
		this.server = server;
		this.profileIcon = profileIcon;
		this.level = level;
		this.rank = rank;
		this.masteries = masteries;
	}
}

export class Rank {
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

	constructor(
		id: number,
		summoner: Summoner,
		leagueId: string,
		queueType: string,
		tier: string,
		division: string,
		leaguePoints: number,
		wins: number,
		losses: number,
		freshBlood: boolean,
		hotStreak: boolean,
		veteran: boolean,
		inactive: boolean,
		rankSeries: RankSeries
	) {
		this.id = id;
		this.summoner = summoner;
		this.leagueId = leagueId;
		this.queueType = queueType;
		this.tier = tier;
		this.division = division;
		this.leaguePoints = leaguePoints;
		this.wins = wins;
		this.losses = losses;
		this.freshBlood = freshBlood;
		this.hotStreak = hotStreak;
		this.veteran = veteran;
		this.inactive = inactive;
		this.rankSeries = rankSeries;
	}
}

export class RankSeries {
	losses: number;
	progress: string;
	target: number;
	wins: number;

	constructor(
		losses: number,
		progress: string,
		target: number,
		wins: number
	) {
		this.losses = losses;
		this.progress = progress;
		this.target = target;
		this.wins = wins;
	}
}

export class ChampionMastery {
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

	constructor(
		id: number,
		summoner: Summoner,
		championId: number,
		championLevel: number,
		championPoints: number,
		lastPlayTime: number,
		championPointsSinceLastLevel: number,
		championPointsUntilNextLevel: number,
		markRequiredForNextLevel: number,
		tokensEarned: number,
		championSeasonMilestone: number,
		milestoneGrades: string[] = [],
		masteryMilestone: MasteryMilestone
	) {
		this.id = id;
		this.summoner = summoner;
		this.championId = championId;
		this.championLevel = championLevel;
		this.championPoints = championPoints;
		this.lastPlayTime = lastPlayTime;
		this.championPointsSinceLastLevel = championPointsSinceLastLevel;
		this.championPointsUntilNextLevel = championPointsUntilNextLevel;
		this.markRequiredForNextLevel = markRequiredForNextLevel;
		this.tokensEarned = tokensEarned;
		this.championSeasonMilestone = championSeasonMilestone;
		this.milestoneGrades = milestoneGrades;
		this.masteryMilestone = masteryMilestone;
	}
}

export class MasteryMilestone {
	id: number;
	requireGradeCounts: Map<string, number>;
	rewardMarks: number;
	bonus: boolean;
	totalGamesRequires: number;

	constructor(
		id: number,
		requireGradeCounts: Map<string, number>,
		rewardMarks: number,
		bonus: boolean,
		totalGamesRequires: number
	) {
		this.id = id;
		this.requireGradeCounts = requireGradeCounts;
		this.rewardMarks = rewardMarks;
		this.bonus = bonus;
		this.totalGamesRequires = totalGamesRequires;
	}
}

