import { Animations } from './../components/shared/animations';
import { Marker } from './../interfaces/marker';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  animations: [Animations.slideInOut, Animations.opacity]
})
export class ModalComponent implements OnInit {
  private cringyPhrases = [
    'Give 110 percent',
    'Think outside the box',
    'Hammer it out',
    'Heavy lifting',
    'Throw them under the bus',
    'Don’t count your chickens before they’ve hatched',
    'Pushing the envelope',
    'Let the cat out of the bag',
    'Let’s circle back',
    'Win-win situation',
    'Blue-sky thinking',
    'Boil the ocean',
    'Synergy',
    'Low-hanging fruit',
    'Take it to the next level',
    'Barking up the wrong tree',
    'Going forward',
    'Let’s ballpark this',
    'Run this up the flagpole',
    'Back to square one',
    'There’s no I in team',
    'Back to the drawing board',
    'Paradigm shift',
    'Elephant in the room',
    'Raise the bar',
    'Drill down',
    'Best thing since sliced bread',
    'Deep dive',
    'Skin in the game',
    'Reach out',
    'Touch base',
    'Play hardball',
    'Don’t reinvent the wheel',
    'Kept in the loop',
    'The bottom line',
    'Down the road',
    'I’ll loop you in',
    'Hit the nail on the head',
    'ASAP',
    'Team player'
  ];
  currentPhrase = '';
  turdDetailModal = false;
  showBackground = false;
  activeTurd: Marker;

  constructor() { }

  ngOnInit() {
  }

  toggleTurdDetailModal(turd: Marker) {
    this.getRandomPhrase();
    this.turdDetailModal = !this.turdDetailModal;
    this.showBackground = !this.showBackground;
    this.activeTurd = turd;
  }

  getFormattedTimestamp(timeInMilliSeconds) {
    return moment(parseInt(timeInMilliSeconds, 10)).format('DD.MM.YYYY HH:mm');
  }

  private getRandomPhrase() {
    this.currentPhrase = this.cringyPhrases[Math.floor(Math.random() * this.cringyPhrases.length)];
  }
}
