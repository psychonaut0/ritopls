import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Spell, Queue, Runes } from '../models/summoner';

@Injectable({
  providedIn: 'root'
})
export class DatadragonService {

  /**
   * Service for static data and assets. Every method
   * returns data from data dragon or community dragon.
   * Data dragon is a set of static data files that provides
   * images and info about champions, runes, and items of League of Legends.
   * Community dragon is a massive collection of community-generated files to augment the data in ddragon.
   * Find more info about data dragon here: https://developer.riotgames.com/docs/lol#data-dragon
   */

  // header root for data dragon
  private ddUrl = 'https://ddragon.leagueoflegends.com/cdn/';

  // header root for community dragon
  private cdUrl = 'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/';

  // global version variable used in various component to share the version
  version: string;
  language = 'en_US';

  constructor(private http: HttpClient) { }

  // Return a JSON Observable containing all version of the game from the latest to the earlier
  getVersion(): Observable<any> {
    const url = 'https://ddragon.leagueoflegends.com/api/versions.json';
    return this.http.get(url);
  }

  // Return the image url of a character
  getChampionAvatarById(id: number): string {
    const url = this.cdUrl + 'default/v1/champion-icons/' + id + '.png';
    return url;
  }

  // return the icon image url of a player
  getIcon(version: string, image: string): string {
    const url = this.ddUrl + version + '/img/profileicon/' + image + '.png';
    return url;
  }

  // Return a JSON observable containing all the summoner spell(skills of the game)
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

  // Return a JSON observable containing all the runes of the game (passive abilities of the game)
  getRunes(language: string, version: string): Observable<Runes[]>{
    const url = this.ddUrl + version + '/data/' + language + '/runesReforged.json';
    return this.http.get<Runes[]>(url);
  }

  // Return summoner spell image url
  getSummonerSpellImage(img: string): string{
    const url = this.cdUrl + '/default/data/spells/icons2d/' + img;
    return url;
  }

  // Return item image url (items are bought by the player in a match)
  getItemImage(id: number, version: string): string{
    const url = this.ddUrl + version + '/img/item/' + id + '.png';
    return url;
  }

  // Return runes image url
  getRunesImage(img: string): string{
    const url = this.ddUrl + 'img/' + img;
    return url;
  }

  // Return a JSON observable containing all the queues of the game (game modes. Ex. Normal game, ranked game etc.)
  getQueue(): Observable<Queue[]>{
    const url = 'https://static.developer.riotgames.com/docs/lol/queues.json';
    return this.http.get<Queue[]>(url);
  }

  // Return the border image url of a player based on his level
  getBorder(level: number): string{
    let borderId = Math.floor(level / 25) + 1;
    if (borderId > 21){
      borderId = 21;
    }
    const url = this.cdUrl + 'default/content/src/leagueclient/prestigeborders/theme-' + borderId + '-solid-border.png';
    return url;
  }

  // Return the division image url of a player based on his ranked division
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
