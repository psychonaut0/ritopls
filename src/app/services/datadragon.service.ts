import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Spell, Queue, Runes } from '../models/summoner';

@Injectable({
  providedIn: 'root'
})
export class DatadragonService {

  private ddUrl = 'http://ddragon.leagueoflegends.com/cdn/';
  private cdUrl = 'http://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/';
  version: string;
  language = 'en_US';

  constructor(private http: HttpClient) { }

  getVersion(): Observable<any> {
    const url = 'https://ddragon.leagueoflegends.com/api/versions.json';
    return this.http.get(url);
  }

  getChampionAvatarById(id: number): string {
    const url = this.cdUrl + 'default/v1/champion-icons/' + id + '.png';
    return url;
  }

  getIcon(version: string, image: string): string {
    const url = this.ddUrl + version + '/img/profileicon/' + image + '.png';
    return url;
  }

  getSummonerSpell(language: string): Observable<Spell[]> {
    let l = language;
    if (l === '') {
      l = 'default';
    }
    else {
      l = l.toLowerCase();
    }
    const url = this.cdUrl + l + '/v1/summoner-spells.json';
    return this.http.get<Spell[]>(url);
  }

  getRunes(language: string, version: string): Observable<Runes[]>{
    const url = this.ddUrl + version + '/data/' + language + '/runesReforged.json';
    return this.http.get<Runes[]>(url);
  }

  getSummonerSpellImage(img: string): string{
    const url = this.cdUrl + '/default/data/spells/icons2d/' + img;
    return url;
  }

  getItemImage(id: number, version: string): string{
    const url = this.ddUrl + version + '/img/item/' + id + '.png';
    return url;
  }

  getRunesImage(img: string): string{
    const url = this.ddUrl + 'img/' + img;
    return url;
  }

  getQueue(): Observable<Queue[]>{
    const url = 'http://static.developer.riotgames.com/docs/lol/queues.json';
    return this.http.get<Queue[]>(url);
  }

  getBorder(level: number): string{
    let borderId = Math.floor(level / 25) + 1;
    if (borderId > 21){
      borderId = 21;
    }
    const url = this.cdUrl + 'default/content/src/leagueclient/prestigeborders/theme-' + borderId + '-solid-border.png';
    return url;
  }

  getRankedCrest(rank: string): string{
    let url = '';
    switch (rank.toLowerCase()) {
      case 'iron':
        url = 'rankedcrests/01_iron/images/iron_baseface_matte.png';
        break;
      case 'bronze':
        url = 'rankedcrests/02_bronze/images/bronze_baseface_matte.png';
        break;
      case 'silver':
        url = 'rankedcrests/03_silver/images/silver_baseface_matte.png';
        break;
      case 'gold':
        url = 'rankedcrests/04_gold/images/gold_baseface_matte.png';
        break;
      case 'platinum':
        url = 'rankedcrests/05_platinum/images/platinum_baseface_matte.png';
        break;
      case 'diamond':
        url = 'rankedcrests/06_diamond/images/diamond_baseface_matte.png';
        break;
      case 'master':
        url = 'rankedcrests/07_master/images/master_baseface_matte.png';
        break;
      case 'grandmaster':
        url = 'rankedcrests/08_grandmaster/images/grandmaster_baseface_matte.png';
        break;
      case 'challenger':
        url = 'rankedcrests/09_challenger/images/challenger_baseface_matte.png';
        break;
      default:
        url = 'assets/default.svg';
        break;
    }
    return this.cdUrl + 'default/content/src/leagueclient/' + url;
  }


}
