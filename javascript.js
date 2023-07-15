// this gives us nodelist of all the buttons present 
const selectionButtons = document.querySelectorAll('[data-selection]')
const finalColumn = document.querySelector('[data-final-column]')
const computerScoreSpan = document.querySelector('[data-computer-score')
const yourScoreSpan = document.querySelector('[data-your-score')

// now for each of these buttons we want to perform some action/expression when they are clicked
// SELECTIONS array to store the info about each button
const SELECTIONS = [
    {
        name: 'rock',
        emoji: '✊',
        beats: 'scissor'
    },
    {
        name: 'paper',
        emoji: '✋',
        beats: 'rock'
    },
    {
        name: 'scissor',
        emoji: '✌️',
        beats: 'paper'
    }
]
selectionButtons.forEach(selectionButton => {
    // eventlistener will attach a function to if the specified event in string happens
    // events like click submit etc
    selectionButton.addEventListener('click', e => {
        // we have already declared data attribute in html
        // dataset gives us access to the properties after data- keyword
        // this will give us name of the button we have clicked ,bcoz we had saved the name in 
        // data attribute's selection property 
        const selectionName = selectionButton.dataset.selection
        // now we have the selection set lets check if the selection button and 
        // selection from set shares the same name
        const selection = SELECTIONS.find(selection => selection.name === selectionName)
        makeSelection(selection)
    })
})
function makeSelection(selection) {
    const computerSelection = randomSelection()
    const yourWinner = isWinner(selection, computerSelection)
    const computerWInner = isWinner(computerSelection, selection)

    addSelectionResult(computerSelection, computerWInner, 2)
    addSelectionResult(selection, yourWinner, 1)
    if (yourWinner) {
        incrementScore(yourScoreSpan)
        youWon()
    }
    else if (computerWInner) {
        incrementScore(computerScoreSpan)
        youLoss()
    }
    else {
        Tie()
    }
}
function Tie() {
    var box = document.getElementsByClassName('dialogue-box')[0];
    box.innerText = "Its a Tie";
}
function youWon() {
    var box = document.getElementsByClassName('dialogue-box')[0];
    box.innerText = "Congrats You Won !";
}
function youLoss() {
    var box = document.getElementsByClassName('dialogue-box')[0];
    box.innerText = "Oops You Loss !";
}

function incrementScore(scoreSpan) {
    scoreSpan.innerText = parseInt(scoreSpan.innerText) + 1
}
function addSelectionResult(selection, winner, a) {
    const div = document.getElementById('your-choice')
    const div2 = document.getElementById('computer-choice')
    if (a == 1) div.innerText = selection.emoji
    if (a == 2) div2.innerText = selection.emoji
}
function isWinner(selection, opponentSelection) {
    return selection.beats === opponentSelection.name
}
// function for computer to select random 
function randomSelection() {
    const randomIndex = Math.floor(Math.random() * 3)
    return SELECTIONS[randomIndex]
}
// //////////////////////////////// 
window.addEventListener('load', function () {
    var preloadingDiv = document.getElementById('preloading');
    var contentDiv = document.getElementById('content');

    // Simulating a delay for preloading each element (e.g., 1 second for Rock, Paper, and Scissors)
    var elementsToPreload = [
        { name: 'Rock', color: 'red' },
        { name: 'Paper', color: 'white' },
        { name: 'Scissors', color: 'green' }
    ];
    var currentElementIndex = 0;

    function preloadNextElement() {
        var preloadingText = document.getElementById('preloading-text');
        preloadingText.innerText = elementsToPreload[currentElementIndex].name;
        preloadingText.style.color = elementsToPreload[currentElementIndex].color;

        // Move to the next element after a delay
        setTimeout(function () {
            currentElementIndex++;

            if (currentElementIndex === elementsToPreload.length) {
                // All elements have been preloaded, hide the preloading div and show the content
                preloadingDiv.style.display = 'none';
                contentDiv.style.display = 'block';
            } else {
                // Preload the next element
                preloadNextElement();
            }
        }, 1000); // Set the delay to 1 second (1000 milliseconds)
    }

    preloadNextElement();
});