import { Component, OnInit } from '@angular/core';
import { RiotapiService } from '../../services/riotapi.service';
import { take } from 'rxjs/operators';
import {Router} from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

 /**
  * Homepage component. It only has the search form for initial search.
  * You can also search from the saved summoner menu that shows all the localStorage entries
  */

  constructor(private riot: RiotapiService,
              private router: Router,
              private dialog: MatDialog) { }

  // Default region
  selected = 'euw1';

  // Form data
  name: string;
  region = 'euw1';

  // Logic data for angular
  isLoading = false;

  /**
   * Get player ids and level from input name and region
   */
  getSummoner(name, region): void{
    this.isLoading = true;
    this.riot.getSummonerByName(name, region).pipe(take(1), ).subscribe(
      data => {
        this.riot.summoner = data;
        this.riot.region = region;
      },
      err => {
        this.isLoading = false;
        this.dialog.open(DialogComponent, {
            data: err
        });
      },
      () => {
        this.isLoading = false;
        this.router.navigate(['/dashboard', name]);
      }

    );
  }

  /**
   * Get player ids and level from localStorage
   */
  getSummonerSaved(key): void{
      const sum = localStorage.getItem(key);
      this.riot.summoner = JSON.parse(sum);
      this.riot.region = 'euw1';
      this.router.navigate(['/dashboard', key]);
  }

  // Get localStorage entries
  getLocalstorage(): string[]{
     return Object.keys(localStorage);
  }

  ngOnInit(): void {
  }

  // ParticleJS (Animated background in the homepage) settings
  // tslint:disable-next-line: member-ordering
  particlesOptions = {
    background: {

        color: {
            value: 'transparent'
        }

    },
    fpsLimit: 144,
    interactivity: {

        detectsOn: 'canvas',
        events: {
            onClick: {
                enable: false,
                mode: 'push'
            },
            onHover: {
                enable: true,
                mode: 'bubble'
            },
            resize: true
        },
        modes: {
            bubble: {
                distance: 400,
                duration: 2,
                opacity: 0.5,
                size: 10,
                speed: 3
            },
            push: {
                quantity: 4
            },
            repulse: {
                distance: 150,
                duration: 0.2
            }
        }

    },
    particles: {

        color: {
            value: '#ffffff'
        },
        links: {
            color: '#ffffff',
            distance: 150,
            enable: true,
            opacity: 0.1,
            width: 1
        },
        collisions: {
            enable: false
        },
        move: {
            direction: 'none',
            enable: true,
            outMode: 'bounce',
            random: false,
            speed: 1,
            straight: false
        },
        number: {
            density: {
                enable: true,
                value_area: 800
            },
            value: 100
        },
        opacity: {
            value: 0.2
        },
        shape: {
            type: 'triangle'
        },
        size: {
            random: true,
            value: 5
        }

    },
    detectRetina: true
};

}
