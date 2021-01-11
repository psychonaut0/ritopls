import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Summoner } from '../models/summoner';


@Injectable({
  providedIn: 'root'
})
export class RiotapiService {

  private region = 'euw1';
  private apiKey = 'RGAPI-74bc5c17-0896-422e-9916-c0e2f9920d69';
  private urlHeader = 'https://';
  private urlCore = '.api.riotgames.com/';
  private params = new HttpParams().set('api_key', this.apiKey);

  summoner: Summoner;

  constructor(private http: HttpClient) { }

  getSummonerByName(name: string, region): void{
    const reqType = 'lol/summoner/v4/summoners/by-name/';
    const url = this.urlHeader + this.region + this.urlCore + reqType + name;
    this.http.get<Summoner>(url, {params: this.params}).pipe(take(1), ).subscribe(
      data => {
        console.log(data);
        this.summoner = data;
      },
      err => {
        console.error(err);
      }
    );
  }

  getChampionMastery(): Observable<any>{
    const reqType = 'lol/champion-mastery/v4/champion-masteries/by-summoner/';
    const url = this.urlHeader + this.region + this.urlCore + reqType + this.summoner.id;
    return this.http.get<any>(url, {params: this.params});
  }

  getLeague(): Observable<any>{
    const reqType = 'lol/league/v4/entries/by-summoner/';
    const url = this.urlHeader + this.region + this.urlCore + reqType + this.summoner.id;
    return this.http.get<any>(url, {params: this.params});
  }

  getMatchList(): Observable<any>{
    const reqType = 'lol/match/v4/matchlists/by-account/';
    const url = this.urlHeader + this.region + this.urlCore + reqType + this.summoner.accountId;
    return this.http.get<any>(url, {params: this.params});
  }

  getSpectator(): Observable<any>{
    const reqType = 'lol/spectator/v4/active-games/by-summoner/';
    const url = this.urlHeader + this.region + this.urlCore + reqType + this.summoner.accountId;
    return this.http.get<any>(url, {params: this.params});
  }

}
