import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogComponent } from '../../dialog/dialog.component';

import { SquadComponent } from './squad.component';

describe('SquadComponent', () => {
  let component: SquadComponent;
  let fixture: ComponentFixture<SquadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SquadComponent,
                      DialogComponent ],
      imports: [ HttpClientModule,
                 MatDialogModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SquadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#getKp should return correct value', () => {
    component.part =  [
      {
          participantId: 1,
          teamId: 100,
          championId: 89,
          spell1Id: 14,
          spell2Id: 4,
          stats: {
              participantId: 1,
              win: false,
              item0: 3047,
              item1: 3190,
              item2: 3860,
              item3: 3107,
              item4: 3076,
              item5: 1028,
              item6: 3364,
              kills: 20,
              deaths: 9,
              assists: 0,
              largestKillingSpree: 0,
              largestMultiKill: 0,
              killingSprees: 0,
              longestTimeSpentLiving: 666,
              doubleKills: 0,
              tripleKills: 0,
              quadraKills: 0,
              pentaKills: 0,
              unrealKills: 0,
              totalDamageDealt: 38347,
              magicDamageDealt: 21776,
              physicalDamageDealt: 9114,
              trueDamageDealt: 7456,
              largestCriticalStrike: 14,
              totalDamageDealtToChampions: 14357,
              magicDamageDealtToChampions: 9755,
              physicalDamageDealtToChampions: 3035,
              trueDamageDealtToChampions: 1567,
              totalHeal: 3611,
              totalUnitsHealed: 3,
              damageSelfMitigated: 42050,
              damageDealtToObjectives: 1165,
              damageDealtToTurrets: 1040,
              visionScore: 73,
              timeCCingOthers: 69,
              totalDamageTaken: 29804,
              magicalDamageTaken: 12430,
              physicalDamageTaken: 16156,
              trueDamageTaken: 1216,
              goldEarned: 8490,
              goldSpent: 7875,
              turretKills: 0,
              inhibitorKills: 0,
              totalMinionsKilled: 37,
              neutralMinionsKilled: 0,
              neutralMinionsKilledTeamJungle: 0,
              neutralMinionsKilledEnemyJungle: 0,
              totalTimeCrowdControlDealt: 131,
              champLevel: 13,
              visionWardsBoughtInGame: 3,
              sightWardsBoughtInGame: 0,
              wardsPlaced: 26,
              wardsKilled: 9,
              firstBloodKill: false,
              firstBloodAssist: false,
              firstTowerKill: false,
              firstTowerAssist: false,
              firstInhibitorKill: false,
              firstInhibitorAssist: false,
              combatPlayerScore: 0,
              objectivePlayerScore: 0,
              totalPlayerScore: 0,
              totalScoreRank: 0,
              playerScore0: 0,
              playerScore1: 0,
              playerScore2: 0,
              playerScore3: 0,
              playerScore4: 0,
              playerScore5: 0,
              playerScore6: 0,
              playerScore7: 0,
              playerScore8: 0,
              playerScore9: 0,
              perk0: 8439,
              perk0Var1: 1201,
              perk0Var2: 0,
              perk0Var3: 0,
              perk1: 8446,
              perk1Var1: 587,
              perk1Var2: 0,
              perk1Var3: 0,
              perk2: 8444,
              perk2Var1: 1417,
              perk2Var2: 0,
              perk2Var3: 0,
              perk3: 8242,
              perk3Var1: 85,
              perk3Var2: 0,
              perk3Var3: 0,
              perk4: 8275,
              perk4Var1: 11,
              perk4Var2: 0,
              perk4Var3: 0,
              perk5: 8210,
              perk5Var1: 5,
              perk5Var2: 0,
              perk5Var3: 0,
              perkPrimaryStyle: 8400,
              perkSubStyle: 8200,
              statPerk0: 5008,
              statPerk1: 5002,
              statPerk2: 5001
          },
          timeline: {
              participantId: 1,
              creepsPerMinDeltas: {
                  '10-20': 1,
                  '0-10': 1.6,
                  '20-30': 1.1
              },
              xpPerMinDeltas: {
                  '10-20': 337.70000000000005,
                  '0-10': 247.7,
                  '20-30': 372.4
              },
              goldPerMinDeltas: {
                  '10-20': 289.3,
                  '0-10': 219.5,
                  '20-30': 228
              },
              csDiffPerMinDeltas: {
                  '10-20': 0.04999999999999982,
                  '0-10': 0.6499999999999997,
                  '20-30': 0.24999999999999933
              },
              xpDiffPerMinDeltas: {
                  '10-20': 43.25000000000006,
                  '0-10': 12.09999999999998,
                  '20-30': -12.149999999999977
              },
              damageTakenPerMinDeltas: {
                  '10-20': 647.5,
                  '0-10': 295.4,
                  '20-30': 1288.3
              },
              damageTakenDiffPerMinDeltas: {
                  '10-20': -39.19999999999999,
                  '0-10': 23.150000000000006,
                  '20-30': 225.8499999999999
              },
              role: 'DUO_SUPPORT',
              lane: 'BOTTOM'
          }
      }
    ];
    expect(component.getKp(10, 10)).toBe(1);
  });

  it('#getKda should return correct value if 0 ', () => {
    expect(component.getKda(10, 0, 10)).toBe(20);
  });

  it('#getKda should rerurn correct value', () => {
    expect(component.getKda(10, 2, 10)).toBe(10);
  });
});
