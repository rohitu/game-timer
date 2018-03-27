export default class Player  {
  // TODO: currentTime shouldn't be a string - need to find some Timer class
  constructor(number, currentTime) {
    this.number = number;
    this.defaultName = `Player ${number}`;
    this.name = this.defaultName;
    this.currentTime = currentTime;
  }

  setName(name) {
    this.name = name;
  }

  resetName() {
    this.name = this.defaultName;
  }
}
