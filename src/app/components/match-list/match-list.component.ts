import { Component, Input, OnInit } from '@angular/core';
import { RiotapiService } from '../../services/riotapi.service';
import { DatadragonService } from '../../services/datadragon.service';
import {PageEvent} from '@angular/material/paginator';
import { combineAll, take } from 'rxjs/operators';
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

  // Mat paginator inputs
  lenght = 100;
  pageSize = 25;
  pageEvent: PageEvent;

  getMatchList(): void{
    this.riot.getMatchList(this.summoner.accountId, this.region, '0', '25', '').pipe(take(1), ).subscribe(
      data => {
        console.log(data);
        this.matchList = data;
      }
    );
  }

  getPartecipant(index): number{
    for (const partecipant of this.match[index].participantIdentities) {
      if (partecipant.player.summonerId === this.summoner.id) {
        return (partecipant.participantId) - 1;
      }
    }
  }

  getKda(k , d, a): number{
    if (d === 0){
      return k + a;
    }
    else{
      return (k + a) / d;
    }
  }

  getDuration(seconds: number): string{
    let minutes = Math.floor(seconds / 60);
    const sec = (seconds - (minutes * 60));
    if (sec >= 45){
      minutes++;
    }
    return String(minutes).padStart(2, '0') + ' min';
  }

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

  getSpellImg(spellId: number): string{
    for (const spell of this.summonerSpell) {
      if (spell.id === spellId) {
        const x = spell.iconPath.substring(spell.iconPath.lastIndexOf('/') + 1).toLowerCase();
        return this.ddragon.getSummonerSpellImage(x);
      }
    }
  }

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

  getAvatar(id: number): string{
    return this.ddragon.getChampionAvatarById(id);
  }

  getItemImg(id: number): string{
    if (id === 0){
      return '';
    }
    return this.ddragon.getItemImage(id, this.ddragon.version);
  }

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

  getPage(page: PageEvent): void{
    const pages = [];
    const pageEnd = page.pageSize * (page.pageIndex + 1);
    pages.push(pageEnd - page.pageSize);
    pages.push(pageEnd);
    console.log(pages[0].toString());
    this.getApi(pages[0].toString(), pages[1].toString());
  }

  getApi(pageStart, pageEnd): void{
    this.isLoading = true;
    this.riot.getMatchList(this.summoner.accountId, this.region, pageStart, pageEnd, '').pipe(take(1), ).subscribe(
      data => {
        console.log(data);
        this.matchList = data;
        for (const match of this.matchList.matches) {
          this.matchObs.push(this.riot.getMatch(match.gameId, this.region));
        }
      },
      err => {
        console.error(err);
      },
      () => {
        forkJoin(this.matchObs).pipe(take(1), ).subscribe(
          res => {
            this.match = res;
            console.log(res);
          },
          err => {
            console.error(err);
            this.isLoading = false;
            this.dialog.open(DialogComponent, {
              data: err
          });
          },
          () => {
            forkJoin({
              summonerSpell: this.ddragon.getSummonerSpell(''),
              queues: this.ddragon.getQueue(),
              runes: this.ddragon.getRunes(this.ddragon.language, this.ddragon.version)
            }).pipe(take(1), ).subscribe(
              data => {
                this.summonerSpell = data.summonerSpell;
                this.queues = data.queues;
                this.runes = data.runes;
                console.log(data);
              },
              err => {
                console.error(err);
                this.isLoading = false;
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
