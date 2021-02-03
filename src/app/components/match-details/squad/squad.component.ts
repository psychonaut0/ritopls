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

  // Input from parent components
  @Input() part: Participant[];
  @Input() partId: ParticipantIdentity[];
  @Input() summonerSpell: Spell[];
  @Input() runes: Runes[];

  // Calculate KDA (rate per death of kills and assists)
  getKda(k , d, a): number{
    if (d === 0){
      return k + a;
    }
    else{
      return (k + a) / d;
    }
  }

  // Calculate kill partecipation
  getKp(k, a): number{
    let sum = 0;
    const x = k + a;
    for (const p of this.part) {
      sum = sum + p.stats.kills;
    }
    return x / sum;
  }

  // Calculate damage percent compared to total squad damage
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

  // Get champion asset from id
  getAvatarImg(id: number): string{
    return this.ddragon.getChampionAvatarById(id);
  }

  // Get item asset from id
  getItemImg(id: number): string{
    if (id === 0){
      return '';
    }
    return this.ddragon.getItemImage(id, this.ddragon.version);
  }

  // Get rune assets from id
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

  // Get spell assets from id
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
