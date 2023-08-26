import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FlipCardModel } from "./flip-card/model/flip-card-model";
import * as confetti from 'canvas-confetti';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
})
export class AppComponent implements OnInit {

  @ViewChild('confettiCanvas', { static: true }) confettiCanvas: ElementRef | undefined;

  flipCards: FlipCardModel[] = [];
  winningFlipCards: number[] = [];
  private previousNumberFlippedCard: number = -1;
  private previousIndexFlippedCard: number = -1;

  ngOnInit(): void {
    this.generateArray();
  }

  generateArray(): void {
    const uniqueNumbers: number[] = [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ];
    const duplicateNumbers: number[] = [ ...uniqueNumbers, ...uniqueNumbers ];

    duplicateNumbers.forEach((number) => {
      let flipCardModel = new FlipCardModel(number);
      this.flipCards.push(flipCardModel);
    });

    this.flipCards.sort(() => Math.random() - 0.5);
  }


  flipCardClicked(event: any, index: number): void {
    this.lockAllFlipCards();

    if (this.previousIndexFlippedCard === index) {
      this.previousNumberFlippedCard = -1;
      this.previousIndexFlippedCard = -1;
      this.unlockAllFlipCards();

    } else if (this.previousNumberFlippedCard === -1) {
      this.previousNumberFlippedCard = event;
      this.previousIndexFlippedCard = index;
      this.unlockAllFlipCards();

    } else {
      if (this.previousNumberFlippedCard != event) {

        setTimeout(() => {
          this.flipCards[this.previousIndexFlippedCard].isFlipped = false;
          this.flipCards[index].isFlipped = false;

          this.previousNumberFlippedCard = -1;
          this.previousIndexFlippedCard = -1;
          this.unlockAllFlipCards();
        }, 2000);

      } else {

        this.winningFlipCards.push(event)
        this.previousNumberFlippedCard = -1;
        this.previousIndexFlippedCard = -1;
        this.unlockAllFlipCards();

        if (this.winningFlipCards.length === 9) {
          this.throwConfetti();
        }
      }
    }
  }

  lockAllFlipCards(): void {
    this.flipCards.forEach((flipCard) => {
      if (!this.winningFlipCards.includes(flipCard.number)) {
        flipCard.isLocked = true;
      }
    });
  }

  unlockAllFlipCards(): void {
    this.flipCards.forEach((flipCard) => {
      if (!this.winningFlipCards.includes(flipCard.number)) {
        flipCard.isLocked = false;
      }
    });
  }

  newGame(): void {
    this.winningFlipCards = [];
    this.flipCards = [];
    this.previousIndexFlippedCard = -1;
    this.previousNumberFlippedCard = -1;
    this.generateArray();
  }

  throwConfetti() {
    if (this.confettiCanvas){
      const canvas = this.confettiCanvas.nativeElement;
      const myConfetti = confetti.create(canvas, {
        resize: true
      });

      myConfetti({
        particleCount: 1000,
        spread: 700,
        origin: { y: 0.6 }
      });
    }
  }
}
