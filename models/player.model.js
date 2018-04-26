export default class Player  {
  constructor(number, timeDurationMs, isActive = false) {
    this.number = number;
    this.defaultName = `Player ${number}`;
    this.name = this.defaultName;

    // TODO I'm kinda inspired by this to write my own timer with react-easy-newState
    // https://www.reddit.com/r/reactjs/comments/7w56q6/a_tiny_stopwatch_with_react_easy_state/
    // https://hackernoon.com/introducing-react-easy-state-1210a156fa16
    this.timeDurationMs = timeDurationMs;

    // Whether the current player is the active player or not.
    this.isActive = isActive;
  }

  setName(name) {
    this.name = name ? name : this.defaultName;
  }

  resetName() {
    this.name = this.defaultName;
  }

  isDefaultName() {
    return this.name === this.defaultName;
  }

  /**
   * Helper function to clone the current player. This is used by the
   * redux reducers so that the reducers can be stateless (so it can
   * more easily copy the previous state into a new one to modify it.
   */
  clone() {
    let clone = new Player(this.number, this.timeDurationMs, this.isActive);
    clone.setName(this.name);
    return clone;
  }
}
