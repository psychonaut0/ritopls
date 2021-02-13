import { Component, OnInit } from '@angular/core';
import { RiotapiService } from '../../services/riotapi.service';
import { DatadragonService } from '../../services/datadragon.service';
import { take } from 'rxjs/operators';
import { Summoner, League } from '../../models/summoner';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  /**
   * Dashboard component. It's the main parent component.
   * It only process the initial card showing general info about
   * the player and calls child components to show match history and searchbar
   */

  constructor(public riot: RiotapiService,
              private ddragon: DatadragonService,
              private dialog: MatDialog) { }


  /* Template summoner and region for testing, assign these to summoner and region
     in getApi() method if you don't want to search every time for a summoner */
  temp = {
    id: 'fA5VJDnRczUp5OHPzzBJJK2jklIcURDfWETI_96FOk0utnvy',
    accountId: '_4Nsuh_19Hu1JbJEnhqEaK_x0-ooKuAbM81AmBgxO_5XWKA',
    puuid: 'iJBM39Kf3vWZ0xcYfXvLi1tmIZ5itKqul4R29b36kN19KhXtqRStLL9z77wUOOKTHrgf-WkZ1xlNUA',
    name: 'Lyrae051',
    profileIconId: 4649,
    revisionDate: 1611174926000,
    summonerLevel: 389
  };
  tempRegion = 'euw1';

  // Assigned in getApi() to store player infos
  region: string;
  summoner: Summoner;
  version: string;
  league: League[];
  leagueInfo = {
    tier: 'unranked',
    division: '',
    image: 'assets/default.png',
    rate: [0, 0, 0], // Array for wins, loses, and win rate
    tier2: 'unranked',
    division2: '',
    image2: 'assets/default.png',
    rate2: [0, 0, 0]
  };

  // object for emblem in the dashboard card containing various sources and level to compose the player badge.
  emblem = {
    level: 0,
    border: 'http://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/content/src/leagueclient/prestigeborders/theme-1-solid-border.png',
    icon: 'http://ddragon.leagueoflegends.com/cdn/11.1.1/img/profileicon/0.png'
  };

  // logic variables for angular ngIf
  isLoading = false;
  completed = false;
  checked = false;

   /**
    * @param sum --> Summoner Object used for the player level
    * @param version --> version of the game
    * Get the assets src from ddragon for the player badge
    */
  getEmblem(sum: Summoner, version: string): void{
    this.emblem.level = sum.summonerLevel;
    this.emblem.icon = this.ddragon.getIcon(version, sum.profileIconId.toString());
    this.emblem.border = this.ddragon.getBorder(sum.summonerLevel);
  }

  // Calculates win rate from wins and loses
  getWinRate(wins: number, losses: number): number{
    const rate = (wins / (wins + losses));
    return rate;
  }

  /**
   * Checks in what ranked games player is placed
   * and stores infos like tier, division and tier badge of the player
   */
  getLeagueInfo(league: League[]): void{
    if (league.length === 0){

    }
    else if (league[0].queueType === 'RANKED_FLEX_SR' && league.length === 1){
      this.leagueInfo.tier2 = league[0].tier.toLowerCase();
      this.leagueInfo.division2 = league[0].rank;
      this.leagueInfo.image2 = this.ddragon.getRankedCrest(league[0].tier.toLowerCase());
      this.leagueInfo.rate2 = [this.league[0].wins, this.league[0].losses, 0];
      this.leagueInfo.rate2[2] = this.getWinRate(this.leagueInfo.rate2[0], this.leagueInfo.rate2[1]);
    }
    else if (league.length >= 2 && league[0].queueType === 'RANKED_FLEX_SR') {
      this.leagueInfo.tier2 = league[0].tier.toLowerCase();
      this.leagueInfo.division2 = league[0].rank;
      this.leagueInfo.image2 = this.ddragon.getRankedCrest(league[0].tier.toLowerCase());
      this.leagueInfo.rate2 = [this.league[0].wins, this.league[0].losses, 0];
      this.leagueInfo.rate2[2] = this.getWinRate(this.leagueInfo.rate2[0], this.leagueInfo.rate2[1]);
      this.leagueInfo.tier = league[1].tier.toLowerCase();
      this.leagueInfo.division = league[1].rank;
      this.leagueInfo.image = this.ddragon.getRankedCrest(league[1].tier.toLowerCase());
      this.leagueInfo.rate = [this.league[1].wins, this.league[1].losses, 0];
      this.leagueInfo.rate[2] = this.getWinRate(this.leagueInfo.rate[0], this.leagueInfo.rate[1]);
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

  // Add user to localStorage
  saveUser(sum: Summoner): void{
    const id = sum.name;
    localStorage.setItem(id, JSON.stringify(sum));
    this.checked = true;
  }

  // Delete user from localStorage
  removeUser(sum: Summoner): void{
    localStorage.removeItem(sum.name);
    this.checked = false;
  }

  // Check if player is already saved in localStorage.
  checkUser(sum: Summoner): void{
    if (sum.name in localStorage){
      this.checked = true;
    }
    else{
      this.checked = false;
    }
  }

  /**
   * It does 2 async call to get latest game version
   * and player league infos.
   * Called in ngOnInit()
   */
  getApi(region, summoner): void{
    this.isLoading = true;
    this.region = region;
    this.summoner = summoner;
    this.ddragon.getVersion().pipe(take(1), ).subscribe( // Get latest version
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
    this.riot.getLeague(this.summoner.id, this.region) .pipe(take(1), ).subscribe( // Get league infos
          data => {
            this.league = data;
          },
          err => {
          this.isLoading = false;
          this.dialog.open(DialogComponent, {
              data: err
          });
          },
          () => {
            this.getLeagueInfo(this.league);
            this.checkUser(this.summoner);
            this.isLoading = false;
            this.completed = true;
          }
    );

  }


  ngOnInit(): void {
    this.getApi(this.riot.region, this.riot.summoner);
  }

}
