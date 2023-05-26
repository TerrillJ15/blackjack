/** Available cards for the game. */
const CARDS = [
  // SPADES
  { suite: 'Spades', name: 'Ace', value: -1, html: '&#127137;' },
  { suite: 'Spades', name: 'Two', value: 2, html: '&#127138;' },
  { suite: 'Spades', name: 'Three', value: 3, html: '&#127139;' },
  { suite: 'Spades', name: 'Four', value: 4, html: '&#127140;' },
  { suite: 'Spades', name: 'Five', value: 5, html: '&#127141;' },
  { suite: 'Spades', name: 'Six', value: 6, html: '&#127142;' },
  { suite: 'Spades', name: 'Seven', value: 7, html: '&#127143;' },
  { suite: 'Spades', name: 'Eight', value: 8, html: '&#127144;' },
  { suite: 'Spades', name: 'Nine', value: 9, html: '&#127145;' },
  { suite: 'Spades', name: 'Ten', value: 10, html: '&#127146;' },
  { suite: 'Spades', name: 'Jack', value: 10, html: '&#127147;' },
  { suite: 'Spades', name: 'Queen', value: 10, html: '&#127149;' },
  { suite: 'Spades', name: 'King', value: 10, html: '&#127150;' },
  // HEARTS
  { suite: 'Hearts', name: 'Ace', value: -1, html: '&#127153;' },
  { suite: 'Hearts', name: 'Two', value: 2, html: '&#127154;' },
  { suite: 'Hearts', name: 'Three', value: 3, html: '&#127155;' },
  { suite: 'Hearts', name: 'Four', value: 4, html: '&#127156;' },
  { suite: 'Hearts', name: 'Five', value: 5, html: '&#127157;' },
  { suite: 'Hearts', name: 'Six', value: 6, html: '&#127158;' },
  { suite: 'Hearts', name: 'Seven', value: 7, html: '&#127159;' },
  { suite: 'Hearts', name: 'Eight', value: 8, html: '&#127160;' },
  { suite: 'Hearts', name: 'Nine', value: 9, html: '&#127161;' },
  { suite: 'Hearts', name: 'Ten', value: 10, html: '&#127162;' },
  { suite: 'Hearts', name: 'Jack', value: 10, html: '&#127163;' },
  { suite: 'Hearts', name: 'Queen', value: 10, html: '&#127165;' },
  { suite: 'Hearts', name: 'King', value: 10, html: '&#127166;' },
  // DIAMONDS
  { suite: 'Diamonds', name: 'Ace', value: -1, html: '&#127169;' },
  { suite: 'Diamonds', name: 'Two', value: 2, html: '&#127170;' },
  { suite: 'Diamonds', name: 'Three', value: 3, html: '&#127171;' },
  { suite: 'Diamonds', name: 'Four', value: 4, html: '&#127172;' },
  { suite: 'Diamonds', name: 'Five', value: 5, html: '&#127173;' },
  { suite: 'Diamonds', name: 'Six', value: 6, html: '&#127174;' },
  { suite: 'Diamonds', name: 'Seven', value: 7, html: '&#127175;' },
  { suite: 'Diamonds', name: 'Eight', value: 8, html: '&#127176;' },
  { suite: 'Diamonds', name: 'Nine', value: 9, html: '&#127177;' },
  { suite: 'Diamonds', name: 'Ten', value: 10, html: '&#127178;' },
  { suite: 'Diamonds', name: 'Jack', value: 10, html: '&#127179;' },
  { suite: 'Diamonds', name: 'Queen', value: 10, html: '&#127181;' },
  { suite: 'Diamonds', name: 'King', value: 10, html: '&#127182;' },
  // CLUBS
  { suite: 'Clubs', name: 'Ace', value: -1, html: '&#127185;' },
  { suite: 'Clubs', name: 'Two', value: 2, html: '&#127186;' },
  { suite: 'Clubs', name: 'Three', value: 3, html: '&#127187;' },
  { suite: 'Clubs', name: 'Four', value: 4, html: '&#127188;' },
  { suite: 'Clubs', name: 'Five', value: 5, html: '&#127189;' },
  { suite: 'Clubs', name: 'Six', value: 6, html: '&#127190;' },
  { suite: 'Clubs', name: 'Seven', value: 7, html: '&#127191;' },
  { suite: 'Clubs', name: 'Eight', value: 8, html: '&#127192;' },
  { suite: 'Clubs', name: 'Nine', value: 9, html: '&#127193;' },
  { suite: 'Clubs', name: 'Ten', value: 10, html: '&#127194;' },
  { suite: 'Clubs', name: 'Jack', value: 10, html: '&#127195;' },
  { suite: 'Clubs', name: 'Queen', value: 10, html: '&#127197;' },
  { suite: 'Clubs', name: 'King', value: 10, html: '&#127198;' },
]

/** Represents a faced down card. */
const CARD_BACK = { html: '&#127136;' };

// DATA

/** The shuffled cards available for a round. */
let deck = [];

/** Array of cards in the player hand. */
let playerHand = [];
/** Array of cards in the dealer hand. */
let dealerHand = [];

/** The tracked wins for the current game. */
let wins = 0;
/** The tracked losses for the current game. */
let losses = 0;
/** The tracked pushes for the current game. */
let pushes = 0;

/** The player balance for the current game. Starts at 100. */
let balance = 100;
/** The bet selected in the current game. Minimum is 10. */
let bet = 10;

// LIFECYCLE

/** Called on load of the page to create a new game.*/
window.onload = function() {
  newGame();
  renderNewRoundButton('Play Now');
};

// HANDLERS

/** 
* Starts a new game by resetting the balance and stats, 
* then updates the view to represent the new game state.
*/
function newGame() {
  balance = 100;
  onReset();
  renderBalance();
  renderBet();
}

/** 
* Starts a new round by drawing cards and determining
* if the player or dealer has already won via a blackjack.
* If the balance is less than the minimum bet,
* then the game should be restarted prior to the new round.
* If the balance is less than the selected bet,
* then prompt the user to lower the bet.
*/
function newRound() {
  if (balance < 10) {
    newGame();
  } else if (balance < bet) {
    renderMessage('Insufficient Balance!\nPlease lower your bet');
    return;
  }
  updateBalance(bet * -1);
  deck = getShuffledCards();
  playerHand = [];
  dealerHand = [];
  renderGameStart();
  addPlayerCard();
  addDealerCard(true); // do not show dealers first card
  addPlayerCard();
  addDealerCard();
  let playerSum = getHighestPlayerTotal();
  let dealerSum = getDealerTotals().high;
  if (playerSum === 21 && dealerSum === 21) {
    wins++;
    // flip the dealer's first card to show push
    flipDealerCard();
    // trigger push
    triggerGamePushBlackjack();
  } else if (playerSum === 21) {
    // trigger win with blackjack; do not show first card
    triggerGameWonBlackjack();
  } else if (dealerSum === 21) {
    // flip the dealer's first card to show they won
    flipDealerCard();
    // trigger loss with dealer black jack
    triggerGameLossBlackjack();
  }
}

/** Reset the stats and updates the view. */
function onReset() {
  wins = losses = pushes = 0;
  renderStats();
}

/** 
* When the hit button is selected it will add a card to the 
* players hand, then the players hand will be checked to
* determine if the player should automatically stand on 21
* or if the user lost due to a bust.
*/
function onHit() {
  addPlayerCard();
  checkPlayerHand();
}

/** 
* When the stand button is selected, the face down card is shown * and the dealer will draw until a hard value of 17 is reached.
* If the dealer busts, then the user wins. Otherwise, both hands
* are checked and whoever has the highest value wins the round.
*/
function onStand() {
  // flip the dealer's first card
  flipDealerCard()
  // loop until dealer's base value is at least 17
  let dealerSum = getDealerTotals().base;
  while (dealerSum < 17) {
    addDealerCard();
    dealerSum = getDealerTotals().base;
  }
  // determine the winner
  const playerSum = getHighestPlayerTotal();
  if (dealerSum > 21 || playerSum > dealerSum) {
    triggerGameWon();
  } else if (playerSum < dealerSum) {
    triggerGameLoss();
  } else {
    triggerGamePush();
  }
}

/** 
* Sets the bet to increment up by 10.
*/
function onBetPlus() {
  if (bet + 10 <= balance) {
    bet += 10;
    renderBet();
  }
}

/** 
* Sets the bet to decrement down by 10.
*/
function onBetMinus() {
  if (bet - 10 >= 10) {
    bet -= 10;
    renderBet();
  }
}

// HELPERS

/** 
* Shuffles available cards into a new array.
*
* @returns The shuffled array.
*/
function getShuffledCards() {
  const shuffled = [...CARDS];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
* Removes the top card from the deck and adds it to the player's 
* hand, then renders. 
*/
function addPlayerCard() {
  let newCard = getDeckCard();
  playerHand.push(newCard);
  renderPlayerCard(newCard);
}

/**
* Removes the top card from the deck and adds it to the dealer's 
* hand, then renders. If the card should be hidden, then the 
* face down card is rendered.
*
* @param hide True if the card should be hidden.
*/
function addDealerCard(hide) {
  let newCard = getDeckCard();
  dealerHand.push(newCard);
  if (hide) {
    renderDealerCard(CARD_BACK);
  } else {
    renderDealerCard(newCard);
  }
}

/** 
* Removes the top card in the deck and returns it.
*
* @returns The top card.
*/
function getDeckCard() {
  return deck.pop();
}

/** 
* Determines and returns base and high totals
* handling when aces are present. If there is 
* an ace, then the base sum will treat them as 1
* and the high sum will return the highest possible
* sum with the aces.
* 
* @param arr Array of cards in a hand.
* @returns Object with 'base' and 'high' totals.
*/
function getTotals(arr) {
  // determine base sum treating aces as 1's
  let aceCount = 0
  let baseSum = arr.reduce((sum, current) => {
    if (current.value === -1) {
      aceCount++;
      sum++;
    } else {
      sum += current.value;
    }
    return sum;
  }, 0)
  // convert aces to number of 11s under 21
  let highestSum = baseSum
  for (let i = 0; i < aceCount; i++) {
    if (highestSum + 10 <= 21) {
      highestSum = highestSum + 10;
    }
  }
  // return totals
  return { base: baseSum, high: highestSum };
}

/** 
* Get the highest playable player total based on the 
* current player hand. If there is not a playable hand,
* then the highest value is returned.
* 
*
* @return The highest playable total or highest total.
*/
function getHighestPlayerTotal() {
  // get the base and high totals
  let totals = getTotals(playerHand);
  // get the highest playable card combination
  return totals.high;
}

/** 
* Determines the dealer's base and high totals
* handling when aces are present. If there is 
* an ace, then the base sum will treat them as 1
* and the high sum will return the highest possible
* sum with the aces.
* 
* @returns Object with 'base' and 'high' totals.
*/
function getDealerTotals() {
  return getTotals(dealerHand);
}

/** 
* Checks the player hand to determine if the player should stand
* on 21 or if they busted and lost.
*/
function checkPlayerHand() {
  // add player values together
  const sum = getHighestPlayerTotal();

  // if 21, then show winner and show menu buttons
  if (sum === 21) {
    onStand();
  } else if (sum > 21) {
    triggerGameLossBusted();
  }
}

// ROUND OVER STATES

/** 
* Triggers the game won state by increasing the wins,
* updating the balance based on the bet, and rendering
* the desired win message. 
*
* @param message The message to display.
* @param isBlackjack True if a blackjack occurred and the
*                    winnings should be 3-2.
*/
function triggerGameWon(message = 'You won!', isBlackjack) {
  wins++;
  // a blacjack is 3-2 winnings
  updateBalance(bet * 2 + (isBlackjack ? bet / 2 : 0));
  renderRoundOverMessage(message);
  renderNextHandButton();
}

/** 
* Triggers the game won state by increasing the wins,
* updating the balance based on the bet, and rendering
* the desired win message. Winnings will be 3-2.
*/
function triggerGameWonBlackjack() {
  triggerGameWon('Blackjack!!! You won!', true); // is blackjack
}

/** 
* Triggers the game loss state by increasing the losses
* and rendering the desired lost message. 
* If the balance is less than the minium bet then the game 
* over state is rendered.
* 
* @param message The message to display.
*/
function triggerGameLoss(message = 'You loss') {
  losses++;
  if (balance < 10) {
    renderRoundOverMessage('Game Over\nNo money left! Please play again.');
    renderNewRoundButton('Play Again');
  } else {
    renderRoundOverMessage(message);
    renderNextHandButton();
  }
}

/** 
* Triggers the game loss state by increasing the losses
* and rendering the bust message. 
* If the balance is less than the minium bet then the game 
* over state is rendered.
*/
function triggerGameLossBusted() {
  triggerGameLoss('You Busted');
}

/** 
* Triggers the game loss state by increasing the losses
* and rendering the dealer blackjack message. 
* If the balance is less than the minium bet then the game 
* over state is rendered.
*/
function triggerGameLossBlackjack() {
  triggerGameLoss('Dealer Blackjack. You Loss...');
}

/** 
* Triggers the game push state by increasing the push
* and rendering the push message. Player gets their bet back.
* If the balance is less than the minium bet then the game 
* over state is rendered.
* 
* @param message The message to display.
*/
function triggerGamePush(message = 'Pushed!') {
  updateBalance(bet); // gets their bet back
  pushes++;
  renderRoundOverMessage(message);
  renderNextHandButton();
}

/** 
* Triggers the game push blackjack state by increasing the push
* and rendering the push blackjack message. 
* If the balance is less than the minium bet then the game 
* over state is rendered.
*/
function triggerGamePushBlackjack() {
  renderRoundOverMessage('Pushed Blackjacks... Unfortunate');
}

/** 
* Updates the balance and displays the new balance.
*
* @param val The value to add to the balance. 
*            Use negative value to subtract.
*/
function updateBalance(val) {
  balance += val;
  renderBalance();
}

// RENDER FUNCTIONS

/**
* Renders the provided card in the player's hand on the display.
*
* @param card The card to render.
*/
function renderPlayerCard(card) {
  renderCard('player-hand', card);
}

/**
* Renders the provided card in the dealer's hand on the display.
*
* @param card The card to render.
* @param True if the facedown card should be replaced with the 
*        provided card.
*/
function renderDealerCard(card, replaceFaceDown) {
  renderCard('dealer-hand', card, replaceFaceDown ? CARD_BACK.html : undefined);
}

/**
* Replaces the facedown card with the actual card in the 
* dealers hand within the display.
*/
function flipDealerCard() {
  // render the actual card by replacing the facedown card
  renderDealerCard(dealerHand[0], true);
}

/** 
* Renders a provided card in the desired hand.
*
* @param hand The id of the hand to add to.
* @param card The card to render.
* @param replaceId Optional id of the card to replace.
*/
function renderCard(hand, card, replaceId) {
  console.log(card);
  const el = document.createElement("div");
  el.id = card.html;
  el.classList.add("game-card");
  el.innerHTML = card.html;
  el.style.color = ['Spades', 'Clubs'].includes(card.suite) ? 'black' : 'red';
  if (replaceId) {
    // id to replace provided
    const replaceEl = document.getElementById(replaceId);
    document.getElementById(hand).replaceChild(el, replaceEl);
  } else {
    // add
    document.getElementById(hand).appendChild(el);
  }
}

/** 
* Removes all the cards from the desired hand. 
*
* @param hand The hand to remove all the cards from.
*/
function removeCards(hand) {
  let handDiv = document.getElementById(hand);
  while (handDiv.hasChildNodes()) {
    handDiv.removeChild(handDiv.firstChild)
  }
}

/** 
* Renders the initial game start state. 
*/
function renderGameStart() {
  // clear the rendered hands
  removeCards('player-hand');
  removeCards('dealer-hand');
  // reset message to hit or stand
  document.getElementById('messages').innerText = 'Hit or Stand?';
  // render the game buttons
  renderGameButtons();
}

/**
* Renders the desired message, updated stats, and shows the menu 
* buttons.
*
* @param message The message to render.
*/
function renderRoundOverMessage(message) {
  renderMessage(message);
  renderMenuButtons();
  renderStats();
}

/**
* Renders the message.
*
* @param message The message to render.
*/
function renderMessage(message) {
  document.getElementById('messages').innerText = message;
}

/**
* Renders the current wins, losses, and pushes in the stats.
*/
function renderStats() {
  document.getElementById('wins').innerText = wins;
  document.getElementById('losses').innerText = losses;
  document.getElementById('pushes').innerText = pushes;
}

/**
* Renders the game buttons and hides the menu buttons.
*/
function renderGameButtons() {
  // hide menu buttons
  document.getElementById('menu-buttons').style.display = 'none';
  // show game buttons
  document.getElementById('game-buttons').style.display = 'block';
}

/**
* Renders the menu buttons and hides the game buttons.
*/
function renderMenuButtons() {
  // hide game buttons
  document.getElementById('game-buttons').style.display = 'none';
  // show menu buttons
  document.getElementById('menu-buttons').style.display = 'block';
}

/**
* Renders the current balance. 
*/
function renderBalance() {
  document.getElementById('balance').innerText = balance;
}

/**
* Renders the current bet amount. 
*/
function renderBet() {
  document.getElementById('bet').innerText = bet;
}

/**
* Renders the desired text on the new round button.
*
* @param text The text to render on the button. 
*/
function renderNewRoundButton(text) {
  document.getElementById('btn-new-round').innerText = text;
}

/**
* Renders the next hand text on the new round button. 
*/
function renderNextHandButton() {
  renderNewRoundButton('Next Hand');
}