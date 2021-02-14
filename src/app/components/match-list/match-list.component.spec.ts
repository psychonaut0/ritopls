import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgParticlesModule } from 'ng-particles';
import { of } from 'rxjs';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { DatadragonService } from 'src/app/services/datadragon.service';
import { RiotapiService } from 'src/app/services/riotapi.service';
import { DialogComponent } from '../dialog/dialog.component';

import { MatchListComponent } from './match-list.component';

describe('MatchListComponent', () => {
  let component: MatchListComponent;
  let fixture: ComponentFixture<MatchListComponent>;
  let mockService: any;
  let mockService2: any;

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

    mockService2 = {
    getVersion: () => of(['11.1']),
    getChampionAvatarById: () => '',
    getIcon: () => '',
    getSummonerSpell: () => of(''),
    getRunes: () => of(''),
    getSummonerSpellImage: () => '',
    getItemImage: () => '',
    getRunesImage: () => '',
    getQueue: () => '',
    getBorder: () => '',
    getRankedCrest: () => '',
  };

    await TestBed.configureTestingModule({
      declarations: [ MatchListComponent,
                      DialogComponent, ],
      imports: [ HttpClientModule,
                 MatDialogModule,
                HttpClientModule,
                  BrowserModule,
                  AppRoutingModule,
                  FormsModule,
                  BrowserAnimationsModule,
                  MatFormFieldModule,
                  MatIconModule,
                  MatInputModule,
                  MatSelectModule,
                  MatButtonModule,
                  NgParticlesModule,
                  HttpClientModule,
                  MatProgressSpinnerModule,
                  MatProgressBarModule,
                  MatDividerModule,
                  MatExpansionModule,
                  MatPaginatorModule,
                  MatDialogModule,
                  MatMenuModule
      ],
      providers: [{ provide: RiotapiService, useValue: mockService },
                  { provide: DatadragonService, useValue: mockService2}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchListComponent);
    component = fixture.componentInstance;
    component.summoner = mockService.summoner;
    component.getSpellImg = () => {
      return '';
    };
    component.getItemImg = () => {
      return '';
    };
    expect(component).toBeTruthy();
    fixture.detectChanges();
  });

  it('should create', () => {
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
