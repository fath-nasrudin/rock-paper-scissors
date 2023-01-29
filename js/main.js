// Get computer choice
const getComputerChoice = () => {
  const choices = ['rock', 'paper', 'scissors']
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

const compareSelections = (computerSelection, userSelection) => {
  let message = 'Something went wrong.';

  // draw
  if (computerSelection === userSelection) message = `Draw! both player have chosen ${computerSelection}`;

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

const playRound = (computerSelection, userSelection) => {

  // validate user input
  const userInputValid = checkValidValue(userSelection);
  if (!userInputValid) return `Your input is not valid: ${userSelection}`

  // get the result
  const result = compareSelections(computerSelection, userSelection)
  return result;
}

// function to play the game
const playGame = (round=5) => {
  for (let i = 0; i < round; i++) {
    const computerSelection = getComputerChoice();
    const userSelection = getUserChoice();
    
    console.log(playRound(computerSelection, userSelection))
  }
}

playGame()