import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { RiotapiService } from '../../services/riotapi.service';
import { DatadragonService } from '../../services/datadragon.service';
import { DashboardComponent } from './dashboard.component';
import { of } from 'rxjs';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { NgParticlesModule } from 'ng-particles';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
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
      declarations: [ DashboardComponent,
                      DialogComponent ],
      imports: [HttpClientModule,
                MatDialogModule,
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
                MatMenuModule],
      providers: [{ provide: RiotapiService, useValue: mockService },
                  { provide: DatadragonService, useValue: mockService2}]
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
