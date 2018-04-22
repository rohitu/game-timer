import Player from './player.model';

describe('Player', () => {
  it('constructed properly', () => {
    let playerOne = new Player(1, 1000);
    expect(playerOne).toBeDefined();
    expect(playerOne.defaultName).toBe('Player 1');
    expect(playerOne.name).toBe('Player 1');
    expect(playerOne.timeDurationMs).toBe(1000);
    expect(playerOne.isActive).toBe(false);
  });

  it('can set their name', () => {
    let playerTwo = new Player(2, 500);
    expect(playerTwo).toBeDefined();
    expect(playerTwo.defaultName).toBe('Player 2');
    expect(playerTwo.name).toBe('Player 2');
    playerTwo.setName('Bob');
    expect(playerTwo.name).toBe('Bob');
  });

  it('can reset their name', () => {
    let playerTwo = new Player(2, 500);
    expect(playerTwo).toBeDefined();
    expect(playerTwo.defaultName).toBe('Player 2');
    expect(playerTwo.name).toBe('Player 2');
    playerTwo.setName('Bob');
    expect(playerTwo.name).toBe('Bob');
    playerTwo.resetName();
    expect(playerTwo.name).toBe('Player 2');
  });

  it('cloning copies the player', () => {
    let playerOne = new Player(1, 1000);
    playerOne.setName('Alice');
    playerOne.isActive = true;
    expect(playerOne).toBeDefined();
    expect(playerOne.name).toBe('Alice');
    expect(playerOne.isActive).toBe(true);

    let playerTwo = playerOne.clone();
    expect(playerTwo).toBeDefined();
    expect(playerTwo.defaultName).toBe('Player 1');
    expect(playerTwo.name).toBe('Alice');
    expect(playerTwo.timeDurationMs).toBe(1000);
    expect(playerTwo.isActive).toBe(true);

    // If I change playerOne after cloning, it doesn't change playerTwo
    playerOne.isActive = false;
    playerOne.resetName();
    expect(playerOne.name).toBe('Player 1');
    expect(playerOne.isActive).toBe(false);
    expect(playerTwo.name).toBe('Alice');
    expect(playerTwo.isActive).toBe(true);
  });
});
