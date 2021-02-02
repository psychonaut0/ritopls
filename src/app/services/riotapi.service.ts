import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Summoner, Matches } from '../models/summoner';
import { Match } from '../models/match-details';


@Injectable({
  providedIn: 'root'
})
export class RiotapiService {

  private apiKey = 'RGAPI-7f2655c9-6f6b-4023-ba4b-6be698e698f6';
  private urlHeader = 'https://';
  private urlCore = '.api.riotgames.com/';
  private params = new HttpParams().set('api_key', this.apiKey);

  summoner: Summoner;
  region: string;
  isLoading = false;
  isShown = true;

  constructor(private http: HttpClient) { }

  // tslint:disable-next-line: typedef
  reInit() {
    this.isShown = false;
    setTimeout(() => {
      this.isShown = true;
    });
  }

  getSummonerByName(name: string, region: string): Observable<Summoner>{
    const reqType = 'lol/summoner/v4/summoners/by-name/';
    const url = this.urlHeader + region + this.urlCore + reqType + name;
    return this.http.get<Summoner>(url, {params: this.params});
  }

  getChampionMastery(region: string): Observable<any>{
    const reqType = 'lol/champion-mastery/v4/champion-masteries/by-summoner/';
    const url = this.urlHeader + region + this.urlCore + reqType + this.summoner.id;
    return this.http.get<any>(url, {params: this.params});
  }

  getLeague(id, region): Observable<any>{
    const reqType = 'lol/league/v4/entries/by-summoner/';
    const url = this.urlHeader + region + this.urlCore + reqType + id;
    return this.http.get<any>(url, {params: this.params});
  }

  getMatchList(accountId, region, start, end, queue): Observable<Matches>{
    const reqType = 'lol/match/v4/matchlists/by-account/';
    let params = this.params;
    params = params.append('endIndex', end);
    params = params.append('beginIndex', start);
    params = params.append('queue', queue);
    const url = this.urlHeader + region + this.urlCore + reqType + accountId;
    return this.http.get<Matches>(url, {params});
  }

  getMatch(matchId, region): Observable<Match>{
    const reqType = 'lol/match/v4/matches/';
    const url = this.urlHeader + region + this.urlCore + reqType + matchId;
    return this.http.get<Match>(url, {params: this.params});
  }

}
