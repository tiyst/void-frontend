import { Match, Participant, Team } from '../model/Match.ts';

export const didPlayerWinMatch = (match: Match, playerName: string): boolean => {
	const playerParticipant = match.participants.find((participant) => participant.riotIdGameName === playerName);

	return playerParticipant
		? (match.teams.find((team) => team.teamId === playerParticipant.teamId)?.win ?? false)
		: false;
};

export const championPlayedByPlayer = (match: Match, playerName: string): number => {
	return match.participants.find((p) => p.riotIdGameName === playerName)?.championId ?? 0;
};

export const createRandomMatch = (): Match => {
	const randomInt = (min: number, max: number): number => Math.floor(Math.random() * (max - min + 1)) + min;

	const randomBoolean = (): boolean => Math.random() < 0.5;

	const championId = randomInt(1, 160);
	console.log(`Random champ ID ${championId}`);
	const randomParticipant = (teamId: number): Participant => ({
		allInPings: randomInt(0, 10),
		assistMePings: randomInt(0, 10),
		assists: randomInt(0, 20),
		baronKills: randomInt(0, 2),
		basicPings: randomInt(0, 10),
		bountyLevel: randomInt(0, 5),
		challenges: {},
		champExperience: randomInt(10000, 20000),
		champLevel: randomInt(10, 18),
		championId: championId,
		championName: `Champion${randomInt(1, 160)}`,
		championTransform: randomInt(0, 1),
		commandPings: randomInt(0, 10),
		consumablesPurchased: randomInt(0, 10),
		damageDealtToBuildings: randomInt(0, 5000),
		damageDealtToObjectives: randomInt(0, 10000),
		damageDealtToTurrets: randomInt(0, 4000),
		damageSelfMitigated: randomInt(1000, 10000),
		dangerPings: randomInt(0, 5),
		deaths: randomInt(0, 15),
		detectorWardsPlaced: randomInt(0, 5),
		doubleKills: randomInt(0, 2),
		dragonKills: randomInt(0, 3),
		eligibleForProgression: randomBoolean(),
		enemyMissingPings: randomInt(0, 5),
		enemyVisionPings: randomInt(0, 5),
		firstBloodAssist: randomBoolean(),
		firstBloodKill: randomBoolean(),
		firstTowerAssist: randomBoolean(),
		firstTowerKill: randomBoolean(),
		gameEndedInEarlySurrender: randomBoolean(),
		gameEndedInSurrender: randomBoolean(),
		getBackPings: randomInt(0, 5),
		goldEarned: randomInt(10000, 20000),
		goldSpent: randomInt(10000, 20000),
		holdPings: randomInt(0, 5),
		individualPosition: ['Top', 'Jungle', 'Mid', 'Bot', 'Support'][randomInt(0, 4)],
		inhibitorKills: randomInt(0, 2),
		inhibitorTakedowns: randomInt(0, 2),
		inhibitorsLost: randomInt(0, 2),
		item0: randomInt(0, 7000),
		item1: randomInt(0, 7000),
		item2: randomInt(0, 7000),
		item3: randomInt(0, 7000),
		item4: randomInt(0, 7000),
		item5: randomInt(0, 7000),
		item6: randomInt(0, 7000),
		itemsPurchased: randomInt(0, 15),
		killingSprees: randomInt(0, 3),
		kills: randomInt(0, 20),
		lane: ['TOP', 'JUNGLE', 'MID', 'BOT', 'SUPPORT'][randomInt(0, 4)],
		largestCriticalStrike: randomInt(0, 1000),
		largestKillingSpree: randomInt(0, 5),
		largestMultiKill: randomInt(0, 3),
		longestTimeSpentLiving: randomInt(0, 500),
		magicDamageDealt: randomInt(1000, 20000),
		magicDamageDealtToChampions: randomInt(1000, 15000),
		magicDamageTaken: randomInt(1000, 10000),
		missions: { mission1: randomInt(1, 10) },
		needVisionPings: randomInt(0, 5),
		neutralMinionsKilled: randomInt(0, 100),
		nexusKills: randomInt(0, 1),
		nexusLost: randomInt(0, 1),
		nexusTakedowns: randomInt(0, 1),
		objectivesStolen: randomInt(0, 2),
		objectivesStolenAssists: randomInt(0, 2),
		onMyWayPings: randomInt(0, 5),
		participantId: randomInt(1, 10),
		pentaKills: randomInt(0, 1),
		physicalDamageDealt: randomInt(1000, 20000),
		physicalDamageDealtToChampions: randomInt(1000, 15000),
		physicalDamageTaken: randomInt(1000, 10000),
		placement: randomInt(1, 10),
		playerAugment1: randomInt(0, 500),
		playerAugment2: randomInt(0, 500),
		playerAugment3: randomInt(0, 500),
		playerAugment4: randomInt(0, 500),
		playerAugment5: randomInt(0, 500),
		playerAugment6: randomInt(0, 500),
		playerSubteamId: teamId,
		profileIcon: randomInt(1, 1000),
		pushPings: randomInt(0, 5),
		puuid: `puuid-${randomInt(1000, 9999)}`,
		quadraKills: randomInt(0, 1),
		riotIdGameName: `Player${randomInt(1, 100)}`,
		riotIdTagline: `${randomInt(1000, 9999)}`,
		role: ['Top', 'Jungle', 'Mid', 'BOT', 'Support'][randomInt(0, 4)],
		sightWardsBoughtInGame: randomInt(0, 3),
		spell1Casts: randomInt(0, 100),
		spell2Casts: randomInt(0, 100),
		spell3Casts: randomInt(0, 100),
		spell4Casts: randomInt(0, 100),
		subteamPlacement: randomInt(1, 10),
		summoner1Casts: randomInt(0, 5),
		summoner1Id: randomInt(1, 20),
		summoner2Casts: randomInt(0, 5),
		summoner2Id: randomInt(1, 20),
		summonerId: `SUM-${randomInt(1000, 9999)}`,
		summonerLevel: randomInt(1, 500),
		summonerName: `Summoner${randomInt(1, 100)}`,
		teamEarlySurrendered: randomBoolean(),
		teamId: teamId,
		teamPosition: ['Top', 'Jungle', 'Mid', 'BOT', 'Support'][randomInt(0, 4)],
		timeCCingOthers: randomInt(0, 100),
		timePlayed: randomInt(1000, 4000),
		totalAllyJungleMinionsKilled: randomInt(0, 50),
		totalDamageDealt: randomInt(10000, 50000),
		totalDamageDealtToChampions: randomInt(10000, 40000),
		totalDamageShieldedOnTeammates: randomInt(0, 1000),
		totalDamageTaken: randomInt(10000, 40000),
		totalEnemyJungleMinionsKilled: randomInt(0, 50),
		totalHeal: randomInt(0, 5000),
		totalHealsOnTeammates: randomInt(0, 500),
		totalMinionsKilled: randomInt(0, 200),
		totalTimeCCDealt: randomInt(0, 100),
		totalTimeSpentDead: randomInt(0, 1000),
		totalUnitsHealed: randomInt(0, 10),
		tripleKills: randomInt(0, 2),
		trueDamageDealt: randomInt(1000, 10000),
		trueDamageDealtToChampions: randomInt(1000, 5000),
		trueDamageTaken: randomInt(1000, 5000),
		turretKills: randomInt(0, 3),
		turretTakedowns: randomInt(0, 3),
		turretsLost: randomInt(0, 3),
		unrealKills: randomInt(0, 1),
		visionClearedPings: randomInt(0, 5),
		visionScore: randomInt(0, 50),
		visionWardsBoughtInGame: randomInt(0, 5),
		wardsKilled: randomInt(0, 20),
		wardsPlaced: randomInt(0, 20),
		win: randomBoolean()
	});

	const randomTeam = (teamId: number): Team => ({
		teamId,
		win: randomBoolean(),
		objectives: {
			baron: { first: randomBoolean(), kills: randomInt(0, 2) },
			dragon: { first: randomBoolean(), kills: randomInt(0, 4) }
		},
		championBans: Array(5)
			.fill(null)
			.map(() => randomInt(1, 160))
	});

	const game = {
		endOfGameResult: 'GameComplete',
		gameDuration: randomInt(1200, 3600),
		gameMode: 'Classic',
		gameType: 'Ranked',
		mapId: 11,
		participants: [
			...Array(5)
				.fill(null)
				.map(() => randomParticipant(100)),
			...Array(5)
				.fill(null)
				.map(() => randomParticipant(200))
		],
		platformId: 'NA1',
		queueId: 420,
		objectives: {
			baron: { first: randomBoolean(), kills: randomInt(0, 2) },
			dragon: { first: randomBoolean(), kills: randomInt(0, 4) }
		},
		teams: [randomTeam(100), randomTeam(200)],
		retrievedDate: new Date().toISOString()
	};

	const randomIndex = Math.floor(Math.random() * game.participants.length);
	game.participants[randomIndex] = {
		...game.participants[randomIndex],
		...{ riotIdGameName: 'Team1Top' }
	};
	return game;
};
