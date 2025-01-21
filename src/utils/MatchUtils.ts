import { Match, Participant, Team } from '../model/Match.ts';

export const didPlayerWinMatch = (match: Match, playerName: string): boolean => {
	const playerParticipant = match.participants.find((participant) => participant.riotIdGameName === playerName);

	return playerParticipant
		? (match.teams.find((team) => team.teamId === playerParticipant.teamId)?.win ?? false)
		: false;
};

export const getSummonerSpellIconUrl = (summoneSpellId: number): string => {
	return summonerSpellIconUrlTranslations[summoneSpellId] || emptySummonerSpellIconUrl;
};

export const championPlayedByPlayer = (match: Match, playerName: string): number => {
	return match.participants.find((p) => p.riotIdGameName === playerName)?.championId ?? 0;
};

export const findPlayer = (match: Match, playerName: string) => {
	const player = match.participants.find((p) => p.riotIdGameName === playerName);
	if (!player) {
		throw new Error(`Player with name "${playerName}" not found`);
	}
	return player;
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
		championId: championIds[randomInt(0, 160)],
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
		individualPosition: ['TOP', 'JUNGLE', 'MIDDLE', 'BOTTOM', 'UTILITY'][randomInt(0, 4)],
		inhibitorKills: randomInt(0, 2),
		inhibitorTakedowns: randomInt(0, 2),
		inhibitorsLost: randomInt(0, 2),
		item0: itemIds[randomInt(0, 602)],
		item1: itemIds[randomInt(0, 602)],
		item2: itemIds[randomInt(0, 602)],
		item3: itemIds[randomInt(0, 602)],
		item4: itemIds[randomInt(0, 602)],
		item5: itemIds[randomInt(0, 602)],
		item6: itemIds[randomInt(0, 602)],
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
		summoner1Id: [21, 1, 14, 3, 4, 6, 7, 13, 31, 11, 39][randomInt(0, 10)],
		summoner2Casts: randomInt(0, 5),
		summoner2Id: [21, 1, 14, 3, 4, 6, 7, 13, 31, 11, 39][randomInt(0, 10)],
		summonerId: `SUM-${randomInt(1000, 9999)}`,
		summonerLevel: randomInt(1, 500),
		summonerName: `Summoner${randomInt(1, 100)}`,
		teamEarlySurrendered: randomBoolean(),
		teamId: teamId,
		teamPosition: ['Top', 'Jungle', 'MIDDLE', 'BOTTOM', 'UTILITY'][randomInt(0, 4)],
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

// Sources:
// https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/data/spells/icons2d/
// https://ddragon.leagueoflegends.com/cdn/15.1.1/data/en_US/summoner.json
const emptySummonerSpellIconUrl =
	'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/data/spells/icons2d/summoner_empty.png';
const summonerSpellIconUrlTranslations: { [key: number]: string } = {
	21: 'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/data/spells/icons2d/summonerbarrier.png',
	1: 'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/data/spells/icons2d/summoner_boost.png',
	14: 'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/data/spells/icons2d/summonerignite.png',
	3: 'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/data/spells/icons2d/summoner_exhaust.png',
	4: 'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/data/spells/icons2d/summoner_flash.png',
	6: 'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/data/spells/icons2d/summoner_haste.png',
	7: 'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/data/spells/icons2d/summoner_heal.png',
	13: 'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/data/spells/icons2d/summonermana.png',
	31: 'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/data/spells/icons2d/summoner_mark.png',
	11: 'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/data/spells/icons2d/summoner_smite.png',
	39: 'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/data/spells/icons2d/summoner_mark.png'
	// "30": "SummonerPoroRecall",
	// "2202": "SummonerCherryFlash",
	// "2201": "SummonerCherryHold",
};

const championIds = [
	266, 103, 84, 166, 12, 799, 32, 34, 1, 523, 22, 136, 893, 268, 432, 200, 53, 63, 201, 233, 51, 164, 69, 31, 42, 122,
	131, 119, 36, 245, 60, 28, 81, 9, 114, 105, 3, 41, 86, 150, 79, 104, 887, 120, 74, 910, 420, 39, 427, 40, 59, 24,
	126, 202, 222, 145, 429, 43, 30, 38, 55, 10, 141, 85, 121, 203, 240, 96, 897, 7, 64, 89, 876, 127, 236, 117, 99, 54,
	90, 57, 11, 902, 21, 62, 82, 25, 950, 267, 75, 111, 518, 76, 895, 56, 20, 2, 61, 516, 80, 78, 555, 246, 133, 497,
	33, 421, 526, 888, 58, 107, 92, 68, 13, 360, 113, 235, 147, 875, 35, 98, 102, 27, 14, 15, 72, 901, 37, 16, 50, 517,
	134, 223, 163, 91, 44, 17, 412, 18, 48, 23, 4, 29, 77, 6, 110, 67, 45, 161, 711, 254, 234, 112, 8, 106, 19, 498,
	101, 5, 157, 777, 83, 350, 154, 238, 221, 115, 26, 142, 143
];

const itemIds = [
	1001, 1004, 1006, 1011, 1018, 1026, 1027, 1028, 1029, 1031, 1033, 1035, 1036, 1037, 1038, 1039, 1040, 1042, 1043,
	1052, 1053, 1054, 1055, 1056, 1057, 1058, 1082, 1083, 1101, 1102, 1103, 1104, 1105, 1106, 1107, 126697, 1500, 1501,
	1502, 1503, 1504, 1506, 1507, 1508, 1509, 1510, 1511, 1512, 1515, 1516, 1517, 1518, 1519, 1520, 1521, 1522, 2003,
	2010, 2015, 2019, 2020, 2021, 2022, 2031, 2033, 2049, 2050, 2051, 2052, 2055, 2056, 2065, 2138, 2139, 2140, 2141,
	2142, 2143, 2144, 2145, 2150, 2151, 2152, 220000, 220001, 220002, 220003, 220004, 220005, 220006, 220007, 221011,
	221026, 221031, 221038, 221043, 221053, 221057, 221058, 222022, 222051, 222065, 222141, 222502, 222503, 222504,
	223001, 223002, 223003, 223004, 223005, 223006, 223009, 223011, 223020, 223026, 223031, 223032, 223033, 223036,
	223039, 223040, 223042, 223046, 223047, 223050, 223053, 223057, 223065, 223067, 223068, 223071, 223072, 223073,
	223074, 223075, 223078, 223084, 223085, 223087, 223089, 223091, 223094, 223095, 223100, 223102, 223105, 223107,
	223109, 223110, 223111, 223112, 223115, 223116, 223118, 223119, 223121, 223124, 223135, 223137, 223139, 223142,
	223143, 223146, 223152, 223153, 223156, 223157, 223158, 223161, 223165, 223172, 223177, 223181, 223184, 223185,
	223190, 223193, 223222, 223302, 223504, 223508, 223742, 223748, 223814, 224004, 224005, 224401, 224403, 224628,
	224629, 224633, 224636, 224637, 224644, 224645, 224646, 226035, 226333, 226609, 226610, 226616, 226617, 226620,
	226621, 226630, 226631, 226632, 226653, 226655, 226656, 226657, 226662, 226664, 226665, 226667, 226671, 226672,
	226673, 226675, 226676, 226691, 226692, 226693, 226694, 226695, 226696, 226697, 226698, 226699, 226701, 228001,
	228002, 228003, 228004, 228005, 228006, 228008, 228020, 2403, 2420, 2421, 2422, 2501, 2502, 2503, 2504, 2508, 3001,
	3002, 3003, 3004, 3005, 3006, 3009, 3010, 3011, 3012, 3013, 3020, 3023, 3024, 3026, 3031, 3032, 3033, 3035, 3036,
	3039, 3040, 3041, 3042, 3044, 3046, 3047, 3050, 3051, 3053, 3057, 3065, 3066, 3067, 3068, 3070, 3071, 3072, 3073,
	3074, 3075, 3076, 3077, 3078, 3082, 3083, 3084, 3085, 3086, 3087, 3089, 3091, 3094, 3095, 3100, 3102, 3105, 3107,
	3108, 3109, 3110, 3111, 3112, 3113, 3114, 3115, 3116, 3117, 3118, 3119, 3121, 3123, 3124, 3128, 3131, 3133, 3134,
	3135, 3137, 3139, 3140, 3142, 3143, 3144, 3145, 3146, 3147, 3152, 3153, 3155, 3156, 3157, 3158, 3161, 3165, 3170,
	3171, 3172, 3173, 3174, 3175, 3176, 3177, 3179, 3181, 3184, 3190, 3193, 3211, 322065, 3222, 323002, 323003, 323004,
	323050, 323070, 323075, 323107, 323109, 323110, 323119, 323190, 323222, 323504, 324005, 326616, 326617, 326620,
	326621, 326657, 328020, 3302, 3330, 3340, 3348, 3349, 3363, 3364, 3400, 3430, 3504, 3508, 3513, 3599, 3600, 3742,
	3748, 3801, 3802, 3803, 3814, 3850, 3851, 3853, 3854, 3855, 3857, 3858, 3859, 3860, 3862, 3863, 3864, 3865, 3866,
	3867, 3869, 3870, 3871, 3876, 3877, 3901, 3902, 3903, 3916, 4003, 4004, 4005, 4010, 4011, 4012, 4013, 4014, 4015,
	4016, 4017, 4401, 4402, 4403, 443054, 443055, 443056, 443058, 443059, 443060, 443061, 443062, 443063, 443064,
	443069, 443079, 443080, 443081, 443090, 443193, 444636, 444637, 444644, 446632, 446656, 446667, 446671, 446691,
	446693, 447100, 447101, 447102, 447103, 447104, 447105, 447106, 447107, 447108, 447109, 447110, 447111, 447112,
	447113, 447114, 447115, 447116, 447118, 447119, 447120, 447121, 447122, 447123, 4628, 4629, 4630, 4632, 4633, 4635,
	4636, 4637, 4638, 4641, 4642, 4643, 4644, 4645, 4646, 6029, 6035, 6333, 6609, 6610, 6616, 6617, 6620, 6621, 6630,
	6631, 6632, 6653, 6655, 6656, 6657, 6660, 6662, 6664, 6665, 6667, 6670, 6671, 6672, 6673, 6675, 6676, 6677, 6690,
	6691, 6692, 6693, 6694, 6695, 6696, 6697, 6698, 6699, 6700, 6701, 7050, 8001, 8010, 8020, 9168, 9171, 9172, 9173,
	9174, 9175, 9176, 9177, 9178, 9179, 9180, 9181, 9183, 9184, 9185, 9187, 9188, 9189, 9190, 9192, 9193, 9271, 9272,
	9273, 9274, 9275, 9276, 9277, 9278, 9279, 9280, 9281, 9283, 9284, 9285, 9287, 9288, 9289, 9290, 9292, 9293, 9300,
	9301, 9302, 9303, 9304, 9305, 9306, 9307, 9308, 9400, 9401, 9402, 9403, 9404, 9405, 9406, 9407, 9408
];
