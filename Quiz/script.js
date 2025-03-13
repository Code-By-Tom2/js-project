// Global variables
let questions = [];
let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 15;

// Event listeners
document.getElementById('start-button').addEventListener('click', startQuiz);
document.getElementById('replay-button').addEventListener('click', () => {
    document.getElementById('end-screen').style.display = 'none';
    document.getElementById('start-screen').style.display = 'block';
});

// Start the quiz
async function startQuiz() {
    const category = document.getElementById('category').value;
    const difficulty = document.getElementById('difficulty').value;
    questions = await fetchQuestions(category, difficulty);
    if (questions.length === 0) {
        alert('Failed to fetch questions. Please try again.');
        return;
    }
    currentQuestionIndex = 0;
    score = 0;
    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('quiz-screen').style.display = 'block';
    displayQuestion();
}

// Fetch questions from the API
async function fetchQuestions(category, difficulty) {
    const url = `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}&type=multiple`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error('Error fetching questions:', error);
        return [];
    }
}

// Display the current question
function displayQuestion() {
    const question = questions[currentQuestionIndex];
    document.getElementById('question').innerHTML = decodeHtml(question.question);
    
    const optionsContainer = document.getElementById('options');
    optionsContainer.innerHTML = '';
    
    const answers = [...question.incorrect_answers, question.correct_answer];
    shuffleArray(answers);
    
    answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerHTML = decodeHtml(answer);
        button.addEventListener('click', () => selectAnswer(answer));
        optionsContainer.appendChild(button);
    });
    
    document.getElementById('score').innerHTML = `Score: ${score}`;
    startTimer();
}

// Start the timer
function startTimer() {
    timeLeft = 15;
    document.getElementById('timer').innerHTML = `Time left: ${timeLeft}s`;
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').innerHTML = `Time left: ${timeLeft}s`;
        if (timeLeft <= 0) {
            clearInterval(timer);
            selectAnswer(null);
        }
    }, 1000);
}

// Handle answer selection
function selectAnswer(selected) {
    clearInterval(timer);
    const question = questions[currentQuestionIndex];
    const correctAnswer = question.correct_answer;
    const optionsContainer = document.getElementById('options');
    const buttons = optionsContainer.getElementsByTagName('button');
    
    let isCorrect = selected === correctAnswer;
    if (selected === null) {
        isCorrect = false;
    }
    
    Array.from(buttons).forEach(button => {
        if (button.innerHTML === decodeHtml(correctAnswer)) {
            button.classList.add('correct');
        } else if (button.innerHTML === decodeHtml(selected)) {
            button.classList.add('incorrect');
        }
        button.disabled = true;
    });
    
    if (isCorrect) {
        score++;
        document.getElementById('score').innerHTML = `Score: ${score}`;
    }
    
    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            displayQuestion();
        } else {
            endQuiz();
        }
    }, 2000);
}

// End the quiz
function endQuiz() {
    document.getElementById('quiz-screen').style.display = 'none';
    document.getElementById('end-screen').style.display = 'block';
    
    document.getElementById('final-score').innerHTML = score;
    
    let highScore = parseInt(localStorage.getItem('highScore')) || 0;
    if (score > highScore) {
        highScore = score;
        localStorage.setItem('highScore', highScore.toString());
    }
    document.getElementById('high-score').innerHTML = highScore;
}

// Shuffle array (Fisher-Yates algorithm)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Decode HTML entities
function decodeHtml(html) {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
}