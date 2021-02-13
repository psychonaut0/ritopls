import { Component, Input, OnInit } from '@angular/core';
import { RiotapiService } from '../../services/riotapi.service';
import { DatadragonService } from '../../services/datadragon.service';
import { take } from 'rxjs/operators';
import { Matches, Summoner, Spell, Queue, Runes } from '../../models/summoner';
import { Match } from '../../models/match-details';
import { forkJoin, Observable } from 'rxjs';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-match-list',
  templateUrl: './match-list.component.html',
  styleUrls: ['./match-list.component.css']
})
export class MatchListComponent implements OnInit {

  /**
   * Match list component. It shows the match history of a searched player
   * using angular material expansion panel. It calls match details component
   * for in-depth details of a match.
   */

  constructor(public riot: RiotapiService,
              private ddragon: DatadragonService,
              private dialog: MatDialog) { }

  // Input from dashboard component
  @Input() region: string;
  @Input() summoner: Summoner;

  // Other values
  isLoading = false;

  // Match values
  matchList: Matches;
  matchObs: Observable<Match>[] = [];
  match: Match[];

  // Spell values
  summonerSpell: Spell[];
  runes: Runes[];

  // gamemode values
  queues: Queue[];

  // Get partecipant id of a match
  getPartecipant(index): number{
    for (const partecipant of this.match[index].participantIdentities) {
      if (partecipant.player.summonerId === this.summoner.id) {
        return (partecipant.participantId) - 1;
      }
    }
  }

  // Get KDA (per death kills and assists rate)
  getKda(k , d, a): number{
    if (d === 0){
      return k + a;
    }
    else{
      return (k + a) / d;
    }
  }

  // Get the duration of a match in seconds. Returns minutes and seconds of the match
  getDuration(seconds: number): string{
    let minutes = Math.floor(seconds / 60);
    const sec = (seconds - (minutes * 60));
    if (sec >= 45){
      minutes++;
    }
    return String(minutes).padStart(2, '0') + ' min';
  }

  // Get the date of the match in timestamp and shows time elapsed from that match in hours or days
  getDate(timestamp: number): string{
    const elapsed = Date.now() - new Date(timestamp).getTime();
    const hours = Math.round(elapsed / 1000 / 60 / 60);
    if (hours > 24){
      return Math.round(hours / 24).toString() + 'd ago';
    }
    else {
      return hours.toString() + 'h ago';
    }

  }

  // Get spell assets urls
  getSpellImg(spellId: number): string{
    for (const spell of this.summonerSpell) {
      if (spell.id === spellId) {
        const x = spell.iconPath.substring(spell.iconPath.lastIndexOf('/') + 1).toLowerCase();
        return this.ddragon.getSummonerSpellImage(x);
      }
    }
  }

  // Get runes assets urls
  getRunesImg(perkvar: number): string{
    for (const rune of this.runes){
      if (perkvar === rune.id) {
        return this.ddragon.getRunesImage(rune.icon);
      }
      else {
        for (const slot of rune.slots[0].runes){
          if (perkvar === slot.id) {
            return this.ddragon.getRunesImage(slot.icon);
          }
        }
      }
    }
  }

  // Get champion (the chararacter of the game) asset url
  getAvatar(id: number): string{
    return this.ddragon.getChampionAvatarById(id);
  }

  getItemImg(id: number): string{
    if (id === 0){
      return '';
    }
    return this.ddragon.getItemImage(id, this.ddragon.version);
  }

  // Get the type of a match played (normal, draft)
  getQueue(gameId: number): string {
    let str;
    for (const queue of this.queues) {
      if (queue.queueId === gameId) {
        str = queue.description.replace(/ games/g, '');
        str = str.replace(/5v5 /g, '');
        return str;
      }
    }
  }

  /**
   * Nested async calls to get match history, match details and assets of a searched player
   * It uses subscribe() for single observable async call, and ForkJoin (similar to 'Promise.all()') to get
   * multiple calls at once (mostly for assets).
   *
   * The method initially takes the match list, and push in an Observable array details of every match
   * (match list and match details are 2 different endpoints).
   * After Forkjoin the Observable array, the method calls another forkjoin for the various assets and static data.
   * The various calls are nested because every async call is dependent on the previous one.
   */
  getApi(pageStart, pageEnd): void{
    this.isLoading = true;
    this.riot.getMatchList(this.summoner.accountId, this.region, pageStart, pageEnd, '').pipe(take(1), ).subscribe(// get the match list
      data => {
        this.matchList = data;
        for (const match of this.matchList.matches) {
          this.matchObs.push(this.riot.getMatch(match.gameId, this.region)); // Push every observable in a local array
        }
      },
      err => {
        this.dialog.open(DialogComponent, {
          data: err
      });
      },
      () => {
        forkJoin(this.matchObs).pipe(take(1), ).subscribe( // Forkjoin the array
          res => {
            this.match = res;
          },
          err => {
            this.dialog.open(DialogComponent, {
              data: err
          });
          },
          () => {
            forkJoin({ // Forkjoin assets and static data
              summonerSpell: this.ddragon.getSummonerSpell(''),
              queues: this.ddragon.getQueue(),
              runes: this.ddragon.getRunes(this.ddragon.language, this.ddragon.version)
            }).pipe(take(1), ).subscribe(
              data => {
                this.summonerSpell = data.summonerSpell;
                this.queues = data.queues;
                this.runes = data.runes;
              },
              err => {
                this.dialog.open(DialogComponent, {
                  data: err
              });
              },
              () => {
                this.isLoading = false;
              }
            );
          }
        );
      }
    );
  }

  ngOnInit(): void {
    this.getApi('0', '25');
  }
}
