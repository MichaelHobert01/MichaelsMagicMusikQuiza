// This will be the itenerary for the quiz 

var quiz = [
    {
        text: "In 2003 they had produced 43% of the songs on the radio",
        choices: ["The Neptunes", "Metro Boomin", "The Alchemist", "Madlib"],
        answer: "The Neptunes"
    },
    {
        text: "What was the first Shoegaze band?",
        choices: ["Nirvana", "Sweet Trip", "My Bloody Valentine", "Deftones"],
        answer: "My Bloody Valentine"
    },
    {
        text: "Which of these rappers have a collab album?",
        choices: ["Tyler + A$AP", "Drake + Future", "Future + Playboi Carti", "Kayne + Jay-Z"],
        answer: "Kayne + Jay-Z"
    },
    {
        text: "Who in my opinion has the best discography?",
        choices: ["Kayne West", "Radiohead", "Kendrick", "Bjork"],
        answer: "Radiohead"
    },
    {
        text: "Which music platform can you only listen to on certain devices?",
        choices: ["Apple Music", "Pandora", "Spotify", "Soundcloud"],
        answer: "Apple Music"
    }
];

// Making everything connected to the HTML

const score = document.getElementById("score");
const timer = document.getElementById("timer");
const mainText = document.getElementsByClassName("main-text");
const startButton = document.getElementById("start-button");
const theGame = document.getElementById("question-container");
const questionContainer = document.getElementById("question-container");
const question = document.getElementById("question");
const answerChoices = document.getElementById("answers");
const saveButton = document.getElementById("save-button");
const saveInitals = document.getElementById("save-initals");


// Prefunctionate (probably not even a word) variables

let initTime = 50;
let initScore = 0;
let currentQuestionIndex = 0;
let timerIntervalId;

// Function Zone 

// update timer function 

function updateTimer() {
    timer.textContent = `Time left: ${initTime}`; 
}

// end game function 

function endGame() {
    clearInterval(timerIntervalId);
    questionContainer.style.display = "none";
    answerChoices.style.display = "none";
    saveButton.style.display = "block";
    score.textContent = `Score: ${initScore}`; 
    showSaveInitals(); 
}



// Start Button Event Listner Function 

startButton.addEventListener('click', function (event) {
    event.preventDefault()

    // removes current displayed elements and replaces it with the questions.
    function displayQuestion() {
        mainText[0].style.display = "none";
        startButton.style.display = 'none';


        question.textContent = quiz[currentQuestionIndex].text;


        answerChoices.innerHTML = "";

        // Loop through the answer choices in the current object
        for (let i = 0; i < quiz[currentQuestionIndex].choices.length; i++) {

            // Create a new button element for each answer choice 
            var answerButton = document.createElement("button");


            // Set the text of the button to the answer choice
            answerButton.textContent = quiz[currentQuestionIndex].choices[i];


            // Event listener
            answerButton.addEventListener("click", function () {
                // Check if the selected answer is correct
                if (this.textContent === quiz[currentQuestionIndex].answer) {
                    // Increment the score 
                    initScore++;
                    // Update the score on the screen 
                    score.textContent = `Score: ${initScore}`;

                    // Displays the next question
                    currentQuestionIndex++;

                    // Check if the end of the quiz has been reached

                    if (currentQuestionIndex >= quiz.length) {
                        endGame();
                    } else {
                        displayQuestion();
                    } 
                    

                } else {
                    initTime -= 10; 
                    updateTimer();
                } 

            });
            answerChoices.appendChild(answerButton); 
        }


    };

    // calls the displayQuestion function 
    displayQuestion();

    // displays the answer choices
    function displayAnswerChoices() {
        answerChoices.style.display = "block";
    }

    // calls the displayAnserChoices function 
    displayAnswerChoices();


    // starts the timer by adding a interval 
    function startTimer() {
        timerIntervalId = setInterval(function () {
            if (initTime > 0) {
                initTime -= 1;
                updateTimer(); // Call the updateTimer function on each iteration
            } else {
                clearInterval(timerIntervalId); // Stop the timer when it reaches 0
            }
        }, 1000);
    }


    // calls the startTimer function
    startTimer();

});


