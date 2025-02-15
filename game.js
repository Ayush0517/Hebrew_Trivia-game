let score = 0;
let currentQuestion = 0;
let answeredQuestions = new Set();  // אוסף שמירה של שאלות שנענו

const questions = [
    { question: "What did you forget at home that caused you to not be able to pay at the store?", answers: ["Arnak ארנק", "Adanit אדנית", "Organit אורגנית", "Arie אריה", "Avatiach אבטיח"], correct: 0 },
    { question: "Who is sitting under a tree in the zoo?", answers: ["Arnak ארנק", "Adanit אדנית", "Organit אורגנית", "Arie אריה", "Avatiach אבטיח"], correct: 3 },
    { question: "What is full of colorful flowers on the balcony that brighten the morning?", answers: ["Arnak ארנק", "Adanit אדנית", "Organit אורגנית", "Arie אריה", "Avatiach אבטיח"], correct: 1 },
    { question: "What is placed on the picnic table?", answers: ["Arnak ארנק", "Adanit אדנית", "Organit אורגנית", "Arie אריה", "Avatiach אבטיח"], correct: 4 },
    { question: "What instrument does she play?", answers: ["Arnak ארנק", "Adanit אדנית", "Organit אורגנית", "Arie אריה", "Avatiach אבטיח"], correct: 2 },
    { question: "How do you say a Rabbit in Hebrew?", answers: ["Arnav ארנב", "Eyal אייל", "Oger אוגר", "Antilopa אנטילופה"], correct: 0 },
    { question: "How do you say Rice in Hebrew?", answers: ["Orez אורז", "Omelet אומלט", "Walnuts אגוזי מלך"], correct: 0 },
    { question: "How do you say Omelet in Hebrew? There are two words for it — choose the one that starts with the letter א?", answers: ["Orez אורז", "Omelet אומלט", "Walnuts אגוזי מלך"], correct: 1 },
    { question: "What is the dog's breed starting with the letter א?", answers: ["Akita אקיטה", "Golden Retriever גולדן רטריבר", "Siberian Husky האסקי סיבירי"], correct: 0 },
    { question: "How do you say Hamster in Hebrew?", answers: ["Arnav ארנב", "Eyal אייל", "Oger אוגר", "Antilopa אנטילופה"], correct: 2 },
    { question: "How do you say Walnuts in Hebrew?", answers: ["Orez אורז", "Omelet אומלט", "Egozey Melech אגוזי מלך"], correct: 2 },
    { question: "How do you say Deer in Hebrew?", answers: ["Arnav ארנב", "Eyal אייל", "Oger אוגר", "Antilopa אנטילופה"], correct: 1 },
    { question: "How do you say Antelope in Hebrew?", answers: ["Arnav ארנב", "Eyal אייל", "Oger אוגר", "Antilopa אנטילופה"], correct: 3 }
];

function loadQuestion() {
    if (currentQuestion >= questions.length) {
        endGame();
        return;
    }

    let q = questions[currentQuestion];
    document.getElementById("question").textContent = q.question;
    document.getElementById("question-info").textContent = `שאלה ${currentQuestion + 1} מתוך ${questions.length}`;

    let buttons = document.querySelectorAll(".answer-btn");
    buttons.forEach((button, index) => {
        if (index < q.answers.length) {
            button.textContent = q.answers[index];
            button.style.display = "inline-block"; 
            button.onclick = () => checkAnswer(index);
        } else {
            button.style.display = "none";
        }
    });

    updateQuestionNavigation();
}

function checkAnswer(selectedIndex) {
    if (!answeredQuestions.has(currentQuestion)) { // אם זו הפעם הראשונה שעונים
        if (selectedIndex === questions[currentQuestion].correct) {
            score += 10;
            document.getElementById("score").textContent = "Score: " + score;
        }
        answeredQuestions.add(currentQuestion); // סימון שהשאלה נענתה
    }

    currentQuestion++;

    if (currentQuestion >= questions.length) {
        endGame();
    } else {
        loadQuestion();
    }

    updateQuestionNavigation(); // עדכון הצביעה אחרי כל תשובה
}

function updateQuestionNavigation() {
    let navContainer = document.getElementById("question-navigation");
    navContainer.innerHTML = '';

    questions.forEach((_, index) => {
        let questionButton = document.createElement("button");
        questionButton.textContent = index + 1;
        questionButton.onclick = function() {
            currentQuestion = index;
            loadQuestion();
        };

        // אם השאלה נענתה, לצבוע את הכפתור בצבע כהה יותר
        if (answeredQuestions.has(index)) {
            questionButton.style.backgroundColor = "#666"; 
        } else {
            questionButton.style.backgroundColor = "#ccc"; 
        }

        navContainer.appendChild(questionButton);
    });
}

function endGame() {
    let FireworksContainer = document.getElementById("Fireworks-container");
    let questionContainer = document.getElementById("question-container");

    // אם כל השאלות נענו נכון (כל השאלות נענו והציון נכון)
    if (answeredQuestions.size === questions.length && score === questions.length * 10) {
        FireworksContainer.innerHTML = `
            <img src="Fireworks.gif" alt="Fireworks" class="Fireworks-icon">
        `;
        FireworksContainer.style.display = "flex"; // מציג את הזיקוקים
        questionContainer.innerHTML = `
            <h2>Game Over</h2>
            <button onclick="restartGame()" class="restart-btn">Restart</button>
        `;
    } else {
        // אם לא כל השאלות נענו נכון, לא להציג זיקוקים
        FireworksContainer.style.display = "none";  // נסתר את הזיקוקים
        questionContainer.innerHTML = `
            <h2>Game Over</h2>
            <button onclick="restartGame()" class="restart-btn">Restart</button>
        `;
    }
}

function restartGame() {
    score = 0;
    currentQuestion = 0;
    answeredQuestions.clear();
    document.getElementById("score").textContent = "Score: 0";
    document.getElementById("question-container").innerHTML = `
        <p id="question">שאלה תצא כאן...</p>
        <button class="answer-btn">תשובה 1</button>
        <button class="answer-btn">תשובה 2</button>
        <button class="answer-btn">תשובה 3</button>
        <button class="answer-btn">תשובה 4</button>
        <button class="answer-btn">תשובה 5</button>
    `;

    // להסתיר את ה-GIF של הזיקוקים כשהמשחק מאתחל מחדש
    let FireworksContainer = document.getElementById("Fireworks-container");
    FireworksContainer.style.display = "none";  // הסתרת הזיקוקים

    loadQuestion();
}

window.onload = loadQuestion;