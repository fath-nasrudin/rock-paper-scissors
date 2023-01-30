// Get computer choice
const getComputerChoice = () => {
  const choices = ['rock', 'paper', 'scissors']
  return choices[Math.floor(Math.random()*3)] 
}

// validate user input to only choose rock, paper, or scissors
const checkValidValue = (input) => {
  return (input === 'paper' || input === 'rock' || input === 'scissors')
}

// return the winner;
// input: computer and user selection
// output: comp/user/draw/-1;
const compareSelections = (computerSelection, userSelection) => {
  const user = 'user';
  const comp = 'comp';
  const draw = 'draw';
  const err = -1;

  // draw
  if (computerSelection === userSelection) return draw;

  if (computerSelection === 'rock') {
    if (userSelection === 'paper') return user;
    if (userSelection === 'scissors') return comp;
  } 

  if (computerSelection === 'paper') {
    if (userSelection === 'rock') return comp;
    if (userSelection === 'scissors') return user;
  } 

  if (computerSelection === 'scissors') {
    if (userSelection === 'rock') return user;
    if (userSelection === 'paper') return comp;
  } 
  return err;
}

// function to play the game
const playGame = (round=5) => {
  for (let i = 0; i < round; i++) {
    const computerSelection = getComputerChoice();
    const userSelection = getUserChoice();
    
    console.log(playRound(computerSelection, userSelection))
  }
}

// check score
// input: maximal score (number);
// output: boolean
const checkMaxScore = (maxScore = 5) => {
  const userScore = Number(document.querySelector('#user-score-number').textContent);
  const computerScore = Number(document.querySelector('#computer-score-number').textContent);

  return (userScore >= maxScore || computerScore >= maxScore);
}

// return: string -> comp/user/draw;
const getWinner = () => {
  const userScore = Number(document.querySelector('#user-score-number').textContent);
  const computerScore = Number(document.querySelector('#computer-score-number').textContent);

  if (userScore > computerScore) return 'user';
  if (userScore < computerScore) return 'comp';
  if (userScore === computerScore) return 'draw';
  return -1;
}

// update ui score
// input winner name: user/comp/draw/
const updateScoreUI = (winner) => {
  if (winner === 'draw') return;

  // access computer and user score
  if (winner === 'comp') {
    const computerScoreNumber = document.querySelector('#computer-score-number');
    const score = Number(computerScoreNumber.textContent);
    computerScoreNumber.textContent = score + 1;
    return;
  }

  if (winner === 'user') {
    const userScoreNumber = document.querySelector('#user-score-number');
    const score = Number(userScoreNumber.textContent);
    userScoreNumber.textContent = score + 1;
    return;
  }
}

// update log 
// input text string
const addLogUI = (text) => {
  const battleLog = document.querySelector('.battle-log');
  const p = document.createElement('p');
  p.textContent = text;
  battleLog.appendChild(p);
}

// winner: string -> comp/user;
// do: update ui to add the winner;
const addWinnerUI = (winner) => {
  const scoreSection = document.querySelector('.content.score');
  const resultSection = document.createElement('div');
  const resultText = document.createElement('h2');

  let text = '';
  if(winner === 'user') text = 'Congrats. You Win!!';
  if(winner === 'comp') text = 'Unfortunately, You lose :(';
  resultText.textContent = text;

  resultSection.appendChild(resultText);
  scoreSection.after(resultSection);
} 

const addPlayAgainButtonUI = () => {
  const buttonChoiceSection = document.querySelector('.button-choice');
  const link = document.createElement('a');
  link.setAttribute('href', '/'); 

  const playAgainButton = document.createElement('button');
  playAgainButton.textContent = 'Play Again';

  link.appendChild(playAgainButton);
  buttonChoiceSection.before(link);
}

const disableSelectionButtonUI = () => {
  const buttonSelection = document.querySelector('#button-selection');
Array
  .from(buttonSelection.children)
  .forEach(button => {
    button.setAttribute('disabled', '')
  })
  console.log('button disabled')
}

// play 1 round based on user click
const playByClick = (e) => {
  // define selection
  const userSelection = e.target.value;
  const computerSelection = getComputerChoice();

  const roundWinner = compareSelections(computerSelection, userSelection);
  if (roundWinner === -1) console.log('Error: Something went wrong!')
  updateScoreUI(roundWinner);

  // add log
  let text = '';
  if (roundWinner === 'draw') {
    text = `draw: user and computer use ${userSelection}`
  } else
  if (roundWinner !== 'draw') {
    text = `${roundWinner} +1: ${userSelection} ${(roundWinner=== 'user')? 'beats' : 'beaten by'} ${computerSelection}`;
  }
  addLogUI(text);

  const maxScore = checkMaxScore(5);
  if (maxScore) {
    const winner = getWinner();
    addWinnerUI(winner);
    addPlayAgainButtonUI();
    disableSelectionButtonUI();
  }
}

// access button
const buttonSelection = document.querySelector('#button-selection');
Array
  .from(buttonSelection.children)
  .forEach(button => {
    button.addEventListener('click', playByClick);
  })