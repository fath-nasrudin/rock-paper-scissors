/**
 * Algorithm proposed
 * 
 * This game will have 5 rounds
 * 
 * we need to get computer choice
 * get user choice
 * turn the round
 * show the result
 * 
 * repeat until 5 rounds
 * 
 * send the final result
 */

const choices = ['rock', 'paper', 'scissors']

// Get computer choice
const getComputerChoice = () => {
  return choices[Math.floor(Math.random()*3)] 
}

// Get user choice
const getUserChoice = () => {
  const result = prompt(`Choose between, 'rock', 'paper', 'scissors'`);
  return result.toLowerCase();
}

// validate user input to only choose rock, paper, or scissors
const checkValidValue = (input) => {
  return (input === 'paper' || input === 'rock' || input === 'scissors')
}

const playRound = (computerSelection, userSelection) => {

  // validate user input
  const userInputValid = checkValidValue(userSelection);
  if (!userInputValid) return `Your input is not valid: ${userSelection}`

  let message = 'Something went wrong.';

  // tie
  if (computerSelection === userSelection) message = `Tie! both player have chosen ${computerSelection}`

  if (computerSelection === 'rock') {
    if (userSelection === 'paper') message = 'You win! paper beats rock'
    if (userSelection === 'scissors') message = 'You Lose! rock beats scissors'
  } 

  if (computerSelection === 'paper') {
    if (userSelection === 'rock') message = 'You Lose! paper beats rock'
    if (userSelection === 'scissors') message = 'You Win! scissors beats paper'
  } 

  if (computerSelection === 'scissors') {
    if (userSelection === 'rock') message = 'You win! rock beats scissors'
    if (userSelection === 'paper') message = 'You Lose! scissors beats paper'
  } 
  
  return message;
}

const computerSelection = getComputerChoice();
const userSelection = getUserChoice();

console.log(playRound(computerSelection, userSelection))