const words = [
    "bananas",
    "grapes",
    "carousel",
    "milkshake",
    "javascript",
    "limousine",
    "chocolate",
    "programming",
    "meatloaf",
    "ukulele",
    "mango",
];

let wins = 0;
let losses = 0;
let currentWord;

class Word {
    constructor(word) {
        this.word = word;
        this.displayWord = word.replaceAll(/[\w]/g, "_");
        this.remainingGuesses = 10;
        this.incorrectLetters = [];
        this.correctLetters = [];
    }

    // implement the guessLetter function:
    // Should accept a letter as an argument and check whether that letter is included in the word.
    // If it is, it will update displayWord to replace any placeholder underscores in the word with that letter. It will add the letter to thecorrectLetters array.
    // If the letter is not included, it will decrement remainingGuesses by 1 and add the letter to the incorrectLetters.
    guessLetter(letter) {
        console.log(this.word);
        if (this.word.includes(letter)) {
            this.updateScreen(letter);
        }
    }

    // implement the updateScreen function:
    // Should update the HTML with data from the object.
    // Should update #remaining-guesses with the value in remainingGuesses.
    // Should update #incorrect-letters with the value in incorrectLetters.
    // Should update #word-to-guess with the value in displayWord.
    updateScreen(letter) {
        console.log(this.word);
        const wordToGuessEl = document.getElementById("word-to-guess");
        var wordToGuessLength = this.word.length;
        if (wordToGuessEl.textContent == "") {
            while (wordToGuessLength > 0) {
                wordToGuessEl.textContent += "_";
                wordToGuessLength--;
            }
        }

        var wordMatch = false;
        var displayedWordArr = wordToGuessEl.textContent.split("");

        this.word.split("").forEach((letterToGuess, index) => {
            if (letter == letterToGuess) {
                wordMatch = true;
                // console.log(e.key + " is correct. Index: " + index);
                this.word.replace(letterToGuess, "");
                displayedWordArr[index] = letterToGuess;
                console.log("guess");
            } else {
                console.log("guess");
                // console.log(e.key + " is incorrect. Index: " + index);
            }
        });

        wordToGuessEl.textContent = displayedWordArr.join("");
    }

    // implement the isGameOver function:
    isGameOver() {}

    // implement the getWinOrLoss function:
    getWinOrLoss() {}
}

function newGame() {
    const randomWord = words[Math.floor(Math.random() * words.length)];
    currentWord = new Word(randomWord);
    currentWord.updateScreen();
}

document.onkeyup = function (e) {
    const pressedKey = e.key.toLowerCase();
    // early exit for non-letter key presses
    if (!/^[a-z]{1}$/g.test(pressedKey)) return;

    // pass in guessed letter to word obj
    currentWord.guessLetter(pressedKey);
    // allow word obj to update screen
    currentWord.updateScreen();

    // check if game is over
    const gameOver = currentWord.isGameOver();

    // if game is over, update wins/losses and start new game
    if (gameOver) {
        const previousWord = document.getElementById("previous-word");
        const winDisplay = document.getElementById("wins");
        const lossDisplay = document.getElementById("losses");
        previousWord.textContent = currentWord.word;
        const result = currentWord.getWinOrLoss();
        if (result === "win") {
            wins++;
            winDisplay.textContent = wins;
        } else if (result === "loss") {
            losses++;
            lossDisplay.textContent = losses;
        }
        newGame();
    }
};

newGame();
