export class Mode {
  private modeWall = true;

  constructor() {
    this.setWallMode = this.setWallMode.bind(this);
    this.setPawnMode = this.setPawnMode.bind(this);
    this.toggle = this.toggle.bind(this);
    this.isWall = this.isWall.bind(this);
    this.isPawn = this.isPawn.bind(this);
  }

  setWallMode() {
    this.modeWall = true;
  }

  setPawnMode() {
    this.modeWall = false;
  }

  toggle() {
    this.modeWall = !this.modeWall;
  }

  isWall() {
    return this.modeWall;
  }

  isPawn() {
    return !this.modeWall;
  }
}
