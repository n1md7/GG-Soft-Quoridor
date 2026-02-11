import { Game } from '@src/core/game.class.ts';

export class Mode {
  private modeWall = true;

  constructor(private readonly game: Game) {
    this.setWallMode = this.setWallMode.bind(this);
    this.setPawnMode = this.setPawnMode.bind(this);
    this.toggle = this.toggle.bind(this);
    this.isWall = this.isWall.bind(this);
    this.isPawn = this.isPawn.bind(this);
    this.reset = this.reset.bind(this);
  }

  setWallMode() {
    this.modeWall = true;
    this.game.grid.showOverlay();
  }

  setPawnMode() {
    this.modeWall = false;
    this.game.grid.hideOverlay();
  }

  toggle() {
    if (this.modeWall) {
      return this.setPawnMode();
    }

    return this.setWallMode();
  }

  isWall() {
    return this.modeWall;
  }

  isPawn() {
    return !this.modeWall;
  }

  reset() {
    this.modeWall = true;
    this.game.grid.showOverlay();
  }
}
