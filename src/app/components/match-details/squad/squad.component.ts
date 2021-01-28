import { Component, Input, OnInit } from '@angular/core';
import { Participant, ParticipantIdentity } from 'src/app/models/match-details';
import { Runes, Spell } from 'src/app/models/summoner';
import { DatadragonService } from '../../../services/datadragon.service';

@Component({
  selector: 'app-squad',
  templateUrl: './squad.component.html',
  styleUrls: ['./squad.component.css']
})
export class SquadComponent implements OnInit {

  constructor(private ddragon: DatadragonService) { }

  @Input() part: Participant[];
  @Input() partId: ParticipantIdentity[];
  @Input() summonerSpell: Spell[];
  @Input() runes: Runes[];

  getKda(k , d, a): number{
    if (d === 0){
      return k + a;
    }
    else{
      return (k + a) / d;
    }
  }

  getKp(k, a): number{
    let sum = 0;
    const x = k + a;
    for (const p of this.part) {
      sum = sum + p.stats.kills;
    }
    return x / sum;
  }

  getDamage(dmg): number{
    let sum = 0;
    for (const p of this.part) {
      if (sum < p.stats.totalDamageDealtToChampions){
        sum = p.stats.totalDamageDealtToChampions;
      }
    }
    sum = (dmg / sum) * 100;
    return Math.floor(sum);
  }

  getAvatarImg(id: number): string{
    return this.ddragon.getChampionAvatarById(id);
  }

  getItemImg(id: number): string{
    if (id === 0){
      return '';
    }
    return this.ddragon.getItemImage(id, this.ddragon.version);
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

  getSpellImg(spellId: number): string{
    for (const spell of this.summonerSpell) {
      if (spell.id === spellId) {
        const x = spell.iconPath.substring(spell.iconPath.lastIndexOf('/') + 1).toLowerCase();
        return this.ddragon.getSummonerSpellImage(x);
      }
    }
  }

  ngOnInit(): void {
  }

}
