import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { of } from 'rxjs';
import { RiotapiService } from 'src/app/services/riotapi.service';
import { DialogComponent } from '../dialog/dialog.component';

import { MatchListComponent } from './match-list.component';

describe('MatchListComponent', () => {
  let component: MatchListComponent;
  let fixture: ComponentFixture<MatchListComponent>;
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
    getMatchList: () => of({
      matches: [
          {
              platformId: 'EUW1',
              gameId: 5092875055,
              champion: 222,
              queue: 420,
              season: 13,
              timestamp: 1613226648719,
              role: 'DUO_CARRY',
              lane: 'BOTTOM'
          },
          {
              platformId: 'EUW1',
              gameId: 5092844904,
              champion: 222,
              queue: 420,
              season: 13,
              timestamp: 1613223405975,
              role: 'DUO_CARRY',
              lane: 'BOTTOM'
          },
          {
              platformId: 'EUW1',
              gameId: 5092700799,
              champion: 103,
              queue: 420,
              season: 13,
              timestamp: 1613217173944,
              role: 'SOLO',
              lane: 'MID'
          }
      ],
      startIndex: 0,
      endIndex: 3,
      totalGames: 182
  }),
  getMatch: () => of()
  };

    await TestBed.configureTestingModule({
      declarations: [ MatchListComponent,
                      DialogComponent, ],
      imports: [ HttpClientModule,
                 MatDialogModule ],
      providers: [{ provide: RiotapiService, useValue: mockService }]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchListComponent);
    component = fixture.componentInstance;
    component.summoner = mockService.summoner;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#getKda should return correct value if 0 ', () => {
    expect(component.getKda(10, 0, 10)).toBe(20);
  });

  it('#getKda should rerurn correct value', () => {
    expect(component.getKda(10, 2, 10)).toBe(10);
  });

  it('#getDuration should return correct string', () => {
    expect(component.getDuration(480)).toBe('08 min');
  });

});
