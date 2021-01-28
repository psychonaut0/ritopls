import { Component, Input, OnInit } from '@angular/core';
import { Runes, Spell } from 'src/app/models/summoner';
import { Match, Participant, ParticipantIdentity} from 'src/app/models/match-details';

@Component({
  selector: 'app-match-details',
  templateUrl: './match-details.component.html',
  styleUrls: ['./match-details.component.css']
})
export class MatchDetailsComponent implements OnInit {

  constructor() { }

  // input from match-list component
  @Input() match: Match;
  @Input() summonerSpell: Spell[];
  @Input() runes: Runes[];

  // values to bind to squad data
  part: Participant[];
  partId: ParticipantIdentity[];

  getTeamParticipant(id: number): Participant[]{
    const part: Participant[] = [];
    for (const p of this.match.participants) {
      if (p.teamId === id){
        part.push(p);
      }
    }
    return part;
  }

  getTeamId(id): ParticipantIdentity[]{
    const part: ParticipantIdentity[] = [];
    for (let i = 0; i < this.match.participants.length; i++) {
      if (this.match.participants[i].teamId === id) {
        part.push(this.match.participantIdentities[i]);
      }
    }
    return part;
  }

  ngOnInit(): void {
  }

}
