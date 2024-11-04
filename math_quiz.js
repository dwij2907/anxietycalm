document.addEventListener('DOMContentLoaded', function() {
    startQuiz();
});

let questions = [];
let currentQuestionIndex = 0;
const totalQuestions = 5;

function startQuiz() {
    generateQuestions();
    showQuestion(currentQuestionIndex);
}

function generateQuestions() {
    // Generate 5 simple addition or subtraction questions
    for (let i = 0; i < totalQuestions; i++) {
        const question = createQuestion();
        questions.push(question);
    }
}

function showQuestion(index) {
    const quizContainer = document.getElementById('quiz-container');
    quizContainer.innerHTML = ''; // Clear previous content

    if (index < totalQuestions) {
        const questionObj = questions[index];
        const questionDiv = document.createElement('div');
        questionDiv.className = 'question';

        const questionText = document.createElement('span');
        questionText.textContent = `${questionObj.num1} ${questionObj.operator} ${questionObj.num2} = `;

        const inputField = document.createElement('input');
        inputField.type = 'number';
        inputField.id = 'answer-input';
        inputField.autocomplete = 'off';

        // Feedback message area
        const feedbackDiv = document.createElement('div');
        feedbackDiv.id = 'feedback';

        // Append elements to the quiz container
        questionDiv.appendChild(questionText);
        quizContainer.appendChild(questionDiv);
        quizContainer.appendChild(inputField);
        quizContainer.appendChild(feedbackDiv);

        // Focus on the input field
        inputField.focus();

        // Add event listener to input field
        inputField.addEventListener('input', function() {
            checkAnswer(inputField, questionObj, feedbackDiv);
        });
    } else {
        // All questions answered, proceed to check-in
        quizContainer.classList.add('hidden');
        document.getElementById('check-in').classList.remove('hidden');
    }
}

function createQuestion() {
    const operators = ['+', '-'];
    const operator = operators[Math.floor(Math.random() * operators.length)];
    let num1, num2, correctAnswer;

    if (operator === '+') {
        num1 = getRandomInt(0, 20);
        num2 = getRandomInt(0, 20);
        correctAnswer = num1 + num2;
    } else {
        num1 = getRandomInt(0, 20);
        num2 = getRandomInt(0, num1); // Ensure the result is not negative
        correctAnswer = num1 - num2;
    }

    return { num1, num2, operator, correctAnswer };
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function checkAnswer(inputField, currentQuestion, feedbackDiv) {
    const userAnswer = parseInt(inputField.value);

    if (isNaN(userAnswer)) {
        feedbackDiv.textContent = '';
        return;
    }

    if (userAnswer === currentQuestion.correctAnswer) {
        feedbackDiv.textContent = 'Correct!';
        feedbackDiv.className = 'feedback';

        // Disable the input field to prevent further input
        inputField.disabled = true;

        // Move to the next question after a short delay
        setTimeout(() => {
            currentQuestionIndex++;
            showQuestion(currentQuestionIndex);
        }, 1000);
    } else {
        feedbackDiv.textContent = 'Incorrect, please try again.';
        feedbackDiv.className = 'error';
    }
}

function handleResponse(response) {
    if (response === 'yes') {
        window.location.href = 'index.html';
    } else if (response === 'no') {
        window.location.href = 'coloring.html';
    }
}
