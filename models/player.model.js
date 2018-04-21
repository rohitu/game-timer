export default class Player  {
  constructor(number, timeDurationMs, isActive = false) {
    this.number = number;
    this.defaultName = `Player ${number}`;
    this.name = this.defaultName;

    // TODO I'm kinda inspired by this to write my own timer with react-easy-newState
    // https://www.reddit.com/r/reactjs/comments/7w56q6/a_tiny_stopwatch_with_react_easy_state/
    // https://hackernoon.com/introducing-react-easy-state-1210a156fa16
    this.timeDurationMs = timeDurationMs;

    this.isActive = isActive;
  }

  setName(name) {
    this.name = name;
  }

  resetName() {
    this.name = this.defaultName;
  }

  isDefaultName() {
    return this.name === this.defaultName;
  }

  clone() {
    let clone = new Player(this.number, this.timeDurationMs, this.isActive);
    clone.setName(this.name);
    return clone;
  }
}
