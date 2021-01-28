export interface Summoner{
    id: string;
    accountId: string;
    puuid: string;
    name: string;
    profileIconId: number;
    revisionDate: number;
    summonerLevel: number;
}

export interface Match {
    platformId: string;
    gameId: any;
    champion: number;
    queue: number;
    season: number;
    timestamp: any;
    role: string;
    lane: string;
}

export interface Matches {
    matches: Match[];
    startIndex: number;
    endIndex: number;
    totalGames: number;
}

export interface ChampionMastery {
    championId: number;
    championLevel: number;
    championPoints: number;
    lastPlayTime: any;
    championPointsSinceLastLevel: number;
    championPointsUntilNextLevel: number;
    chestGranted: boolean;
    tokensEarned: number;
    summonerId: string;
}

export interface League {
    leagueId: string;
    queueType: string;
    tier: string;
    rank: string;
    summonerId: string;
    summonerName: string;
    leaguePoints: number;
    wins: number;
    losses: number;
    veteran: boolean;
    inactive: boolean;
    freshBlood: boolean;
    hotStreak: boolean;
}

export interface Perks {
    perkIds: number[];
    perkStyle: number;
    perkSubStyle: number;
}

export interface Participant {
    teamId: number;
    spell1Id: number;
    spell2Id: number;
    championId: number;
    profileIconId: number;
    summonerName: string;
    bot: boolean;
    summonerId: string;
    gameCustomizationObjects: any[];
    perks: Perks;
}

export interface Observers {
    encryptionKey: string;
}

export interface Spectator {
    gameId: number;
    mapId: number;
    gameMode: string;
    gameType: string;
    gameQueueConfigId: number;
    participants: Participant[];
    observers: Observers;
    platformId: string;
    bannedChampions: any[];
    gameStartTime: number;
    gameLength: number;
}

export interface Spell {
    id: number;
    name: string;
    description: string;
    summonerLevel: number;
    cooldown: number;
    gameModes: string[];
    iconPath: string;
}

export interface Queue {
    queueId: number;
    map: string;
    description: string;
    notes: string;
}

export interface Rune {
    id: number;
    key: string;
    icon: string;
    name: string;
    shortDesc: string;
    longDesc: string;
}

export interface Slot {
    runes: Rune[];
}

export interface Runes {
    id: number;
    key: string;
    icon: string;
    name: string;
    slots: Slot[];
}


