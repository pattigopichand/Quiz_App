const questions = [
    {
        question: " which is the largest animal in the world?",
        answers:[
            
               { text:"Shark", correct: false},
               { text:"Blue Whale", correct: true},
               { text:"Elephant", correct: false},
               { text:"Giraffe", correct: false},
        ]
    },{
    question: " which is the samllest country in the world?",
        answers:[
            
               { text:"Vatican City", correct: true},
               { text:"Bhutan", correct: false},
               { text:"Nepal", correct: false},
               { text:"Sri Lanka", correct: false},
        ]
    },{
        question: " which is the largest desert in the world?",
        answers:[
            
               { text:"kalahari", correct: false},
               { text:"Gobi", correct: false},
               { text:"Sahara", correct: true},
               { text:"Thar", correct: false},
        ]
    },{
        question: " which is the smallest contitent in the world?",
        answers:[
            
               { text:"Asia", correct: false},
               { text:"Australia", correct: true},
               { text:"Africa", correct: false},
               { text:"Europe", correct: false},
         ]
    }   
];
const quesitonElement=document.getElementById("question");
const answerButtonElement=document.getElementById("answer-buttons");
const nextButtonElement=document.getElementById("next-btn");

let currentQuestionIndex=0;
let score= 0;
function startQuiz(){
    currentQuestionIndex=0;
    score=0;
    nextButtonElement.innerHTML="Next";
    showQuestion();
}
function showQuestion(){
    resetState();
    let currentQuestion= questions[currentQuestionIndex];
    let questionNo= currentQuestionIndex+1;
    quesitonElement.innerHTML=questionNo + "." + currentQuestion.question;

    currentQuestion.answers.forEach(answer =>{
        const button= document.createElement("button");
        button.innerHTML=answer.text;
        button.classList.add("btn");
        answerButtonElement.appendChild(button);
        if(answer.correct){
            button.dataset.correct=answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    });
}
function resetState(){
    nextButtonElement.style.display="none";
    while(answerButtonElement.firstChild){
        answerButtonElement.removeChild(answerButtonElement.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn= e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
         selectedBtn.classList.add('correct');
         score++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtonElement.children).forEach(button=>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled =true;
    });
    nextButtonElement.style.display="block";
}
function showScore(){
    resetState();
    quesitonElement.innerHTML = `You Score ${score} out of ${questions.length}!`;
    nextButtonElement.innerHTML="Play Again";
    nextButtonElement.style.display="block";
}
function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}

nextButtonElement.addEventListener("click",()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
})
startQuiz();