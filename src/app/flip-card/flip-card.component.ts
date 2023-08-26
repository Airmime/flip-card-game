import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FlipCardModel } from "./model/flip-card-model";

@Component({
  selector: 'app-flip-card',
  templateUrl: './flip-card.component.html',
  styleUrls: [ './flip-card.component.scss' ]
})
export class FlipCardComponent {
  @Input() flipCardModel: FlipCardModel | undefined;
  @Output() cardClicked: EventEmitter<number> = new EventEmitter<number>();

  toggleFlip() {
    if (this.flipCardModel && !this.flipCardModel.isLocked) {
      this.flipCardModel.isFlipped = !this.flipCardModel?.isFlipped;
      this.cardClicked.emit(this.flipCardModel.number);
    }
  }

  getImgSrc() {
    if (this.flipCardModel) {
      return `assets/img/${ this.flipCardModel.number }.png`;
    } else {
      return undefined;
    }
  }
}
