var winCounter = 0;
var loseCounter = 0;
var whichQuestion = 0;
var currentScreen = "start";

var questionsArray = [
    {
        question: "Where do you link your JavaScript in your HTML?",
        answer1: "In the title",
        answer2: "After the body tag",
        answer3: "Before the body tag",
        answer4: "You don't need to link them",
        correctAnswer: "Before the body tag",
    },
    {
        question: "What data type is true or false?",
        answer1: "String",
        answer2: "Array",
        answer3: "Boolean",
        answer4: "Undefined",
        correctAnswer: "Boolean",
    },
    {
        question: "What does concatenation mean?",
        answer1: "Adding multiple variables and data types together",
        answer2: "When you have too many cats",
        answer3: "The ability to do math using variables",
        answer4: "Adding content to the page",
        correctAnswer: "Adding multiple variables and data types together",
    },
    {
        question: "Which logical operator will tell you if two expressions are both true",
        answer1: "||",
        answer2: "===",
        answer3: "&&",
        answer4: "!==",
        correctAnswer: "&&",
    },
    {
        question: "If I wanted to create code to perform a specific task multiple times, I would use a:",
        answer1: "For loop",
        answer2: "Function",
        answer3: "Console log",
        answer4: "Iterator",
        correctAnswer: "Function",
    }
];

//create timer for 1 minute
var timerEl = document.getElementById("timer");
var finalScoreEl = document.getElementById("final-score");
var secondsLeft = 60;

function setTime() {
     var timerInterval = setInterval(function() {
            secondsLeft--;
        timerEl.textContent = secondsLeft + "  Seconds Remaining";

        if (currentScreen === "results") {
            clearInterval(timerInterval);
        }

        if (secondsLeft === 0) {
            clearInterval(timerInterval);
            setScreen("results");
        }
    }, 1000);

}



    //timer should stop when quiz is complete
    //game is over when timer equals 0 loseGame function
    //timer should only start when start button is pressed

//create opening page with rules
   // Attach event listener to start button to call startGame function on click
    function setScreen(screenName) {
        currentScreen = screenName;

        if (screenName == "start") {
            document.getElementById("start-screen").classList.remove("hide-screen");
            document.getElementById("question-screen").classList.add("hide-screen");            
            document.getElementById("results-screen").classList.add("hide-screen");            
            document.getElementById("high-screen").classList.add("hide-screen");
        } else if (screenName == "quiz") {
            document.getElementById("start-screen").classList.add("hide-screen");
            document.getElementById("question-screen").classList.remove("hide-screen");            
            document.getElementById("results-screen").classList.add("hide-screen");            
            document.getElementById("high-screen").classList.add("hide-screen");
        } else if  (screenName == "results") {
            finalScoreEl.textContent = secondsLeft;
            document.getElementById("start-screen").classList.add("hide-screen");
            document.getElementById("question-screen").classList.add("hide-screen");            
            document.getElementById("results-screen").classList.remove("hide-screen");            
            document.getElementById("high-screen").classList.add("hide-screen");
        } else if (screenName == "high") {
            document.getElementById("start-screen").classList.add("hide-screen");
            document.getElementById("question-screen").classList.add("hide-screen");            
            document.getElementById("results-screen").classList.add("hide-screen");            
            document.getElementById("high-screen").classList.remove("hide-screen");
        }
    }

   function startQuiz() {
        setScreen("quiz")
        setTime();
        displayQuestion(0);
        secondsLeft = 60;
        whichQuestion = 0;
   }

//display question and answers

    function displayQuestion(questionNumber) {
        document.getElementById("question").textContent = questionsArray[questionNumber].question;
        document.getElementById("answer1").textContent = questionsArray[questionNumber].answer1;
        document.getElementById("answer2").textContent = questionsArray[questionNumber].answer2;
        document.getElementById("answer3").textContent = questionsArray[questionNumber].answer3;
        document.getElementById("answer4").textContent = questionsArray[questionNumber].answer4;
    }

    
    //correct answer should load the next question
function nextQuestion(clickedAnswer) {
    var answer = questionsArray[whichQuestion][clickedAnswer];
    var correctAnswer = questionsArray[whichQuestion].correctAnswer;

    if (answer == correctAnswer) {
        document.getElementById("correctness").textContent = "Correct"
    } else  {
        document.getElementById("correctness").textContent = "Wrong!";
        secondsLeft = secondsLeft - 10;

    }

    if (whichQuestion < questionsArray.length-1) {
        whichQuestion++;
    displayQuestion(whichQuestion); }
    else {
        setScreen("results")
    }

}
   



//create high scores page with local storage
    //create form for people to enter their initials 
    //combine secondsleft as high score plus initials as an array
 var lineNumber = 1;
 var highScore = JSON.parse(localStorage.getItem("highScore")) || [];

 for (let i = 0; i < highScore.length; i++) {
    addScore(highScore[i]);
    lineNumber++;
 }

    //when button clicked on form, info is saved. when submitted need to change screens
    function submitScore(event) {
        event.preventDefault();
        setScreen("high")

        addScore(lineNumber + ". " + event.target.elements.initials.value + " - " + secondsLeft)

        highScore.push(lineNumber + ". " + event.target.elements.initials.value + " - " + secondsLeft);

        localStorage.setItem("highScore", JSON.stringify(highScore));
        document.getElementById("form").reset();

        lineNumber++;
    }

    //add score to page
    function addScore(entry) {
        var rowString = `<div class="entry">` + entry + `</div>`;
        document.getElementById("high-score-list").innerHTML += rowString;
    }

    //clear high scores button
    function clearHistory() {
        highScore = [];
        localStorage.clear();
        lineNumber = 1;
        document.getElementById("high-score-list").innerHTML = "";
    }

