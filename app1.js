const quizData = [
    {
        question: "In which year, parliament passed the Citizenship Act?",
                a: "1950",
                b: "1955",
                c: "1960",
                d: "1965",
          correct: "b"     
    },
    {
        question: "Who administers oaths of office and secrecy to a minister of Parliament?",
                a: "President",
                b: "Prime Minister",
                c: "Chief Justice of India",
                d: "Speaker of Lok Sabha",
        correct: "a"
        

    },
    {
        question: "Which of the following has the power to transfer any case anywhere in India?",
                a: "President",
                b: "Prime Minister",
                c: "Supreme Court",
                d:  "Parliament",
        correct: "c"
        

    },
    {
        question: "Who can extend the term of state legislative assembly during Emergency?",
               a: "The State Legislature",
               b: "The Governor of State",
               c: "The Parliament",
               d: "The President",
        correct: "c"
        

    }
]

const myQuiz = document.querySelector("#quiz")
const resultEls = document.querySelector("#result")
const answerEls = document.querySelectorAll(".answer")
const labelEls = document.querySelectorAll(".op_label")
const questionEls = document.querySelector("#question")
const a_text = document.querySelector("#a_text")
const b_text = document.querySelector("#b_text")
const c_text = document.querySelector("#c_text")
const d_text = document.querySelector("#d_text")
const prevBtn = document.querySelector("#prev")
const nextBtn = document.querySelector("#next")
const submitBtn = document.querySelector("#submit")
const scoreEls = document.querySelector("#score")
const showAnsEls = document.querySelector("#showAns")
const reloadBtn = document.querySelector("#reload")
let currentQtn = 0
let answered = 0
let submited = false
let userSelected = {

}
loadQuiz()
function loadQuiz()
{
    // load songs and options
    questionEls.innerText = quizData[currentQtn].question
    a_text.innerText =  quizData[currentQtn].a
    b_text.innerText =  quizData[currentQtn].b
    c_text.innerText =  quizData[currentQtn].c
    d_text.innerText =  quizData[currentQtn].d
    deSelectAnswer()
    if(userSelected[currentQtn])
    {
        let selected = userSelected[currentQtn]
        document.getElementById(selected).checked = true
    }
    if(currentQtn==quizData.length-1)
    {
        nextBtn.style.display = "none"
        if(submited)
        {
        submitBtn.style.display = "none"
        reloadBtn.style.display = "block"
        }
        else{
            submitBtn.style.display = "block"
            reloadBtn.style.display = "none"
        }
    }

    if(submited)
    {
        let activalAnswer = quizData[currentQtn].correct
        let userSelected = userSelected[currentQtn]
        labelEls.forEach(
            (labelEle)=>{
                labelEle.classList.remove("correct")
                labelEle.classList.remove("wrong")
            }
        )
        if(activalAnswer===userSelected)
        {
            let op = activalAnswer + "_text"
            document.getElementById("op").classList.add("correct")
        }
        else{

            let correct_op = activalAnswer + "_text"
            document.getElementById("correct_op").classList.add("correct")
            let user_op = userSelected + "_text"
            document.getElementById(user_op).classList.add("wrong")

        }
    }

}
function deSelectAnswer()
{
    answerEls.forEach (
        (answerEle)=>{
            answerEle.checked = false
        }
    )

}
nextBtn.addEventListener("click",()=>{

    let answer = getSelected()
    if(!submited)
    {
    if(answer)
    {
    if(answer == quizData[currentQtn].correct)
    {
    
    answered++
     
    }
    currentQtn++
    if(currentQtn<quizData.length){
        loadQuiz()
     }
    

}
    }
    else{
        currentQtn++
        loadQuiz()
    }
})
 submitBtn.addEventListener("click", ()=>{
    if(getSelected())
    {
        submited = true
        myQuiz.style.display = "none"
        resultEls.style.display = "block"
        scoreEls.innerText = answered + "/" + quizData.length + "questions answered correct"
    }
 })
 
prevBtn.addEventListener("click",()=>
{
    if(currentQtn>0)
    {
        currentQtn--
        loadQuiz()
    }
}
)

function getSelected()
{
    let answer
    answerEls.forEach (
        (answerEle)=>{
            if(answerEle.checked)
            {
              answer = answerEle.id
              userSelected[currentQtn] = answer
            }
        }
    )
    return answer


}
function loadAns()
{
    currentQtn = 0
    myQuiz.style.display = "block"
    resultEls.style.display = "none"
    answerEls.forEach (
        (answerEle)=>{
            answerEle.disabled = true

        }
    )
    submitBtn.style.display = "none"
    nextBtn.style.display = "block"
    loadQuiz()

}