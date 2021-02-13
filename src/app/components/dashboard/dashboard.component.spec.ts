import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { RiotapiService } from '../../services/riotapi.service';
import { DatadragonService } from '../../services/datadragon.service';
import { DashboardComponent } from './dashboard.component';
import { DebugElement } from '@angular/core';
import { of } from 'rxjs';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let mockService: any;


  beforeEach(async () => {
    mockService = {
      summoner: {
        id: 'fA5VJDnRczUp5OHPzzBJJK2jklIcURDfWETI_96FOk0utnvy',
        accountId: '_4Nsuh_19Hu1JbJEnhqEaK_x0-ooKuAbM81AmBgxO_5XWKA',
        puuid: 'iJBM39Kf3vWZ0xcYfXvLi1tmIZ5itKqul4R29b36kN19KhXtqRStLL9z77wUOOKTHrgf-WkZ1xlNUA',
        name: 'Lyrae051',
        profileIconId: 4649,
        revisionDate: 1611174926000,
        summonerLevel: 389
      },
      region: 'euw',
      getLeague: () => of([
        {
            leagueId: 'b2c5c31f-b6be-4a87-8375-9e3707526f1f',
            queueType: 'RANKED_SOLO_5x5',
            tier: 'SILVER',
            rank: 'III',
            summonerId: 'fA5VJDnRczUp5OHPzzBJJK2jklIcURDfWETI_96FOk0utnvy',
            summonerName: 'Lyrae051',
            leaguePoints: 90,
            wins: 80,
            losses: 92,
            veteran: false,
            inactive: false,
            freshBlood: false,
            hotStreak: false
        }
    ])
    };
    await TestBed.configureTestingModule({
      declarations: [ DashboardComponent,
                      DialogComponent ],
      imports: [HttpClientModule,
                MatDialogModule],
      providers: [{ provide: RiotapiService, useValue: mockService }]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#getWinRate should return correct value', () => {
    expect(component.getWinRate(100, 100)).toBe(0.5);
  });
});
