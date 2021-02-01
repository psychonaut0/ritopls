import { Component, Input, OnInit } from '@angular/core';
import { RiotapiService } from '../../services/riotapi.service';
import { DatadragonService } from '../../services/datadragon.service';
import { take } from 'rxjs/operators';
import { Summoner, League } from '../../models/summoner';
import { Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(public riot: RiotapiService,
              private ddragon: DatadragonService,
              private dialog: MatDialog) { }


  // TEMP
  temp = {
    id: 'fA5VJDnRczUp5OHPzzBJJK2jklIcURDfWETI_96FOk0utnvy',
    accountId: '_4Nsuh_19Hu1JbJEnhqEaK_x0-ooKuAbM81AmBgxO_5XWKA',
    puuid: 'iJBM39Kf3vWZ0xcYfXvLi1tmIZ5itKqul4R29b36kN19KhXtqRStLL9z77wUOOKTHrgf-WkZ1xlNUA',
    name: 'Lyrae051',
    profileIconId: 4649,
    revisionDate: 1611174926000,
    summonerLevel: 389
};

  region: string;
  summoner: Summoner;
  version: string;

  emblem = {
    level: 0,
    border: 'http://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/content/src/leagueclient/prestigeborders/theme-1-solid-border.png',
    icon: 'http://ddragon.leagueoflegends.com/cdn/11.1.1/img/profileicon/0.png'
  };

  league: League[];

  leagueInfo = {
    tier: 'unranked',
    division: '',
    image: 'assets/default.png',
    rate: [0, 0, 0],
    tier2: 'unranked',
    division2: '',
    image2: 'assets/default.png',
    rate2: [0, 0, 0]
  };

  isLoading = false;
  completed = false;

  getEmblem(sum: Summoner, version: string): void{
    this.emblem.level = sum.summonerLevel;
    this.emblem.icon = this.ddragon.getIcon(version, sum.profileIconId.toString());
    this.emblem.border = this.ddragon.getBorder(sum.summonerLevel);
  }

  getWinRate(wins: number, losses: number): number{
    const rate = (wins / (wins + losses));
    return rate;
  }

  getLeagueInfo(league: League[]): void{
    if (league.length === 0){

    }
    else if (league[0].queueType === 'RANKED_FLEX_SR'){
      this.leagueInfo.tier2 = league[0].tier.toLowerCase();
      this.leagueInfo.division2 = league[0].rank;
      this.leagueInfo.image2 = this.ddragon.getRankedCrest(league[0].tier.toLowerCase());
      this.leagueInfo.rate2 = [this.league[0].wins, this.league[0].losses, 0];
      this.leagueInfo.rate2[2] = this.getWinRate(this.leagueInfo.rate2[0], this.leagueInfo.rate2[1]);
    }
    else if (league.length >= 2) {
      this.leagueInfo.tier = league[0].tier.toLowerCase();
      this.leagueInfo.division = league[0].rank;
      this.leagueInfo.image = this.ddragon.getRankedCrest(league[0].tier.toLowerCase());
      this.leagueInfo.rate = [this.league[0].wins, this.league[0].losses, 0];
      this.leagueInfo.rate[2] = this.getWinRate(this.leagueInfo.rate[0], this.leagueInfo.rate[1]);
      this.leagueInfo.tier2 = league[1].tier.toLowerCase();
      this.leagueInfo.division2 = league[1].rank;
      this.leagueInfo.image2 = this.ddragon.getRankedCrest(league[1].tier.toLowerCase());
      this.leagueInfo.rate2 = [this.league[1].wins, this.league[1].losses, 0];
      this.leagueInfo.rate2[2] = this.getWinRate(this.leagueInfo.rate2[0], this.leagueInfo.rate2[1]);
    }
    else{
      this.leagueInfo.tier = league[0].tier.toLowerCase();
      this.leagueInfo.division = league[0].rank;
      this.leagueInfo.image = this.ddragon.getRankedCrest(league[0].tier.toLowerCase());
      this.leagueInfo.rate = [this.league[0].wins, this.league[0].losses, 0];
      this.leagueInfo.rate[2] = this.getWinRate(this.leagueInfo.rate[0], this.leagueInfo.rate[1]);
    }
  }

  getApi(region, summoner): void{
    console.log(region + summoner);
    this.isLoading = true;
    this.region = region;
    this.summoner = summoner;
    this.ddragon.getVersion().pipe(take(1), ).subscribe(
          data => {
            this.getEmblem(this.summoner, data[0]);
            this.ddragon.version = data[0];
          },
          err => {
            this.isLoading = false;
            this.dialog.open(DialogComponent, {
              data: err
          });
          }
        );
    this.riot.getLeague(this.summoner.id, 'euw1') .pipe(take(1), ).subscribe(
          data => {
            this.league = data;
            console.log(data);
          },
          err => {
          this.isLoading = false;
          this.dialog.open(DialogComponent, {
              data: err
          });
          },
          () => {
            this.getLeagueInfo(this.league);
            this.isLoading = false;
            this.completed = true;
          }
    );

  }


  ngOnInit(): void {
    this.getApi('euw1', this.riot.summoner);
  }

}
