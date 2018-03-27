import Player from './player.model';

it('player constructed properly', () => {
  let playerOne = new Player(1, 'mytime');
  expect(playerOne).toBeDefined();
  expect(playerOne.defaultName).toBe('Player 1');
  expect(playerOne.name).toBe('Player 1');
  expect(playerOne.currentTime).toBe('mytime');
});

it('player can set their name', () => {
  let playerTwo = new Player(2, 'mytime');
  expect(playerTwo).toBeDefined();
  expect(playerTwo.defaultName).toBe('Player 2');
  expect(playerTwo.name).toBe('Player 2');
  playerTwo.setName('Bob');
  expect(playerTwo.name).toBe('Bob');
});

it('player can reset their name', () => {
  let playerTwo = new Player(2, 'mytime');
  expect(playerTwo).toBeDefined();
  expect(playerTwo.defaultName).toBe('Player 2');
  expect(playerTwo.name).toBe('Player 2');
  playerTwo.setName('Bob');
  expect(playerTwo.name).toBe('Bob');
  playerTwo.resetName();
  expect(playerTwo.name).toBe('Player 2');
});
