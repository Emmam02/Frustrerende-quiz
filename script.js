const questions = [
    {
        question: 'Hva er det minste primtallet?',
        answers: [
            { text: '3', correct: false },
            { text: '5', correct: false },
            { text: '2', correct: true },
            { text: '1', correct: false }
        ]
    },
    {
        question: 'Hva er den kjemiske formelen for rubidiumperoksid?',
        answers: [
            { text: 'RbO2', correct: false },
            { text: 'Rb2O2', correct: true },
            { text: 'Rb2O', correct: false },
            { text: '1RbO', correct: false }
        ]
    },
    {
        question: 'Hvem var den første kvinnen som vant en Nobelpris?',
        answers: [
            { text: 'Rosalind Franklin', correct: false },
            { text: 'Marie Curie', correct: true },
            { text: 'Dorothy Crowfoot Hodgkin', correct: false },
            { text: 'Gerty Cori', correct: false }
        ]
    },
    {
        question: 'Hvor mange sonetter skrev William Shakespeare?',
        answers: [
            { text: '154', correct: true },
            { text: ' 130', correct: false },
            { text: '112', correct: false },
            { text: '180', correct: false }
        ]
    },
    {
        question: 'Hva er navnet på den første romsonden som ble sendt til Mars av Sovjetunionen i 1960?',
        answers: [
            { text: 'Luna 9', correct: false },
            { text: ' Marsnik 1', correct: true },
            { text: 'Phobos 2', correct: false },
            { text: 'Venera 7', correct: false }
        ]
    },
    {
        question: 'Hvem formulerte den første presise beregningen av lyshastigheten?',
        answers: [
            { text: 'Christiaan Huygens', correct: false },
            { text: ' Ole Rømer', correct: false },
            { text: 'Max Planck', correct: false },
            { text: ' Albert Michelson', correct: true }
        ]
    },
    {
        question: 'Hvor mange symfonier skrev Ludwig van Beethoven?',
        answers: [
            { text: '9', correct: true },
            { text: '7', correct: false },
            { text: '12', correct: false },
            { text: ' 6', correct: false }
        ]
    },
    {
        question: 'Hvem formulerte teorien om det usikre prinsippet?',
        answers: [
            { text: 'Niels Bohr', correct: false },
            { text: 'Max Planck', correct: false },
            { text: 'Werner Heisenberg', correct: true },
            { text: 'Erwin Schrödinger', correct: false }
        ]
    },
    {
        question: 'Hva er kjent som det sjette sansorganet hos noen dyr?',
        answers: [
            { text: 'Magnetoresepsjon', correct: false },
            { text: 'Elektroresepsjon', correct: false },
            { text: 'Proprioception', correct: true },
            { text: 'Thermoception', correct: false }
        ]
    },
    {
        question: 'Hva er navnet på den teoretiske partikkelen antatt å være ansvarlig for masse i universet?',
        answers: [
            { text: 'Graviton', correct: false },
            { text: 'Higgs-boson', correct: true },
            { text: 'Photon', correct: false },
            { text: 'Neutrino', correct: false }
        ]
    },
]
const questionDiv = document.getElementById('question');
const answerButton = document.getElementById('answerButton');
const nextButton = document.getElementById('nextQuestion');

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = 'Next';
    showQuestion();
}

function showQuestion() {
    resetPreviousQnA();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNumber = currentQuestionIndex + 1;
    questionDiv.innerHTML = questionNumber + '.' + currentQuestion.question;

    currentQuestion.answers.forEach(answers => {
        const button = document.createElement('button');
        button.innerHTML = answers.text;
        button.classList.add('buttin');
        answerButton.appendChild(button);
        if (answers.correct) {
            button.dataset.correct = answers.correct;
        }
        button.addEventListener('click', chosenAnswer)
    })
}

function resetPreviousQnA() {
    nextButton.style.display = 'none';
    while (answerButton.firstChild) {
        answerButton.removeChild(answerButton.firstChild);
    }
}

function chosenAnswer(e) {
    const selectedButton = e.target;
    const correctAnswer = selectedButton.dataset.correct === 'true';
    if (correctAnswer) {
        selectedButton.classList.add('correct');
        score++;
    } else {
        selectedButton.classList.add('incorrect');
    }
    handleAnswerButtons(answerButton.children);

    nextButton.style.display = 'block';
}

function handleAnswerButtons(buttons) {
    for (let i = 0; i < buttons.length; i++) {
        const button = buttons[i];
        if (button.dataset.correct === 'true') {
            button.classList.add('correct');
        }
        button.disabled = true;
    }
}

function showScore() {
    resetPreviousQnA();
    if(score < questions.length){
        questionDiv.innerHTML = `"Du fikk bare ${score} av ${questions.length}..."`;
    }else{
        questionDiv.innerHTML = `"Du fikk ${score} av ${questions.length}! Itte Dåli"`;
    }
nextButton.innerHTML = 'Prøv igjen';
nextButton.style.display = 'block';
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener('click', handleNextButton);
function handleNextButton() {
    if (currentQuestionIndex < questions.length) {
        nextQuestion();
    } else {
        startQuiz();
    }
}
startQuiz();