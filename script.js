const proceedBtn = document.getElementById("proceed-btn");
const startBtn = document.getElementById("start-btn");
const quizScreen = document.getElementById("quiz-screen");
const startScreen = document.getElementById("start-screen");
const nameScreen = document.getElementById("name-screen");
const questionContainer = document.getElementById("question-container");
const nextBtn = document.getElementById("next-btn");
const resultScreen = document.getElementById("result-screen");
const timerElement = document.getElementById("timer");
const tryAgainBtn = document.getElementById("try-again-btn");
const usernameInput = document.getElementById("username");
const displayName = document.getElementById("display-name");

let questions = [
    { question: "What does HTML stand for?", options: ["Hyper Text Markup Language", "Hyperlinks and Text Markup Language", "Home Tool Markup Language", "Hyper Transfer Markup Language"], answer: 0 },
    { question: "Which language is used for styling web pages?", options: ["HTML", "JQuery", "CSS", "XML"], answer: 2 },
    { question: "Which is not a programming language?", options: ["Python", "Java", "C++", "HTML"], answer: 3 },
    { question: "Which symbol is used for comments in JavaScript?", options: ["//", "/* */", "#", "--"], answer: 0 },
    { question: "What does CSS stand for?", options: ["Creative Style Sheets", "Cascading Style Sheets", "Computer Style Sheets", "Colorful Style Sheets"], answer: 1 },
    { question: "Which HTML tag is used to link an external CSS file?", options: ["script", "css", "link", "style"], answer: 2 }
];

let currentQuestionIndex = 0;
let correctAnswers = 0;
let attemptedQuestions = 0;
let timer;
let timeLeft = 120;

proceedBtn.addEventListener("click", function() {
    let username = usernameInput.value.trim();
    if (username === "") {
        alert("Please enter your name!");
        return;
    }
    displayName.innerText = username;
    nameScreen.classList.add("hidden");
    startScreen.classList.remove("hidden");
});

startBtn.addEventListener("click", startQuiz);
nextBtn.addEventListener("click", loadNextQuestion);
tryAgainBtn.addEventListener("click", restartQuiz);

function startQuiz() {
    startScreen.classList.add("hidden");
    quizScreen.classList.remove("hidden");
    startTimer();
    loadQuestion();
}

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        let minutes = Math.floor(timeLeft / 60);
        let seconds = timeLeft % 60;
        timerElement.innerText = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

        if (timeLeft <= 0) {
            clearInterval(timer);
            showResult();
        }
    }, 1000);
}

function loadQuestion() {
    nextBtn.classList.add("hidden");
    let questionData = questions[currentQuestionIndex];
    questionContainer.innerHTML = `
        <div class="question">${questionData.question}</div>
        <div class="options">
            ${questionData.options.map((opt, index) => `<button onclick="selectAnswer(${index})">${opt}</button>`).join("")}
        </div>
    `;
}

function selectAnswer(selectedIndex) {
    attemptedQuestions++;
    let questionData = questions[currentQuestionIndex];
    let buttons = document.querySelectorAll(".options button");

    if (selectedIndex === questionData.answer) {
        correctAnswers++;
        buttons[selectedIndex].classList.add("correct");
    } else {
        buttons[selectedIndex].classList.add("wrong");
        buttons[questionData.answer].classList.add("correct");
    }

    buttons.forEach(btn => btn.disabled = true);
    nextBtn.classList.remove("hidden");
}

function loadNextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    clearInterval(timer);
    quizScreen.classList.add("hidden");
    resultScreen.classList.remove("hidden");

    let percentage = ((correctAnswers / questions.length) * 100).toFixed(2);

    document.getElementById("total-questions").innerText = questions.length;
    document.getElementById("attempted").innerText = attemptedQuestions;
    document.getElementById("correct").innerText = correctAnswers;
    document.getElementById("wrong").innerText = attemptedQuestions - correctAnswers;
    document.getElementById("percentage").innerText = percentage + "%";
}

function restartQuiz() {
    location.reload();
}
