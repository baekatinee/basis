$(function () {
  $('.contact-inner-item-info').on('click', function () {
    $(this).next('.contact-inner-item-hidden').slideToggle('active');
    $(this).children('.contact-inner-item-arrow').toggleClass('active');
  }
  );

});



$(document).ready(function () {
  $("button").click(function () {
      $.get("https://basis.clothing/submit-quiz",
          $('form').serialize(),
          function (data, status) {
              $("#outerwearTable tr").remove();
              $("#shirtsTable tr").remove();
              $("#pantsTable tr").remove();
              $.each(data.outerwear, function (i, item) {
                  $("#outerwearTable tbody").append(
                      "<tr>"
                      + "<td> <a href=" + item.page + ">ссылка</a> </td>"
                      + "<td> <img src=" + item.image + " height=200 </td>"
                      + "</tr>"
                  )
              })
              $.each(data.shirts, function (i, item) {
                  $("#shirtsTable tbody").append(
                      "<tr>"
                      + "<td> <a href=" + item.page + ">ссылка</a> </td>"
                      + "<td> <img src=" + item.image + " height=200 </td>"
                      + "</tr>"
                  )
              })
              $.each(data.pants, function (i, item) {
                  $("#pantsTable tbody").append(
                      "<tr>"
                      + "<td> <a href=" + item.page + ">ссылка</a> </td>"
                      + "<td> <img src=" + item.image + " height=200 </td>"
                      + "</tr>"
                  )
              })
          });
  });
});
// эта функция сработает при нажатии на кнопку
function sendJSON(answer) {
  let response = null;
  $.post("https://basis.clothing/submit-data", 
  {"question1": answer[0], "question2": answer[1], "question3": answer[2], "question4": answer[3], "question5": answer[4] },
  function(data) {
    response = data;
    console.log(data);
}).done(function() {
   // TO DO ON DONE
}).fail(function(data, textStatus, xhr) {
     //This shows status code eg. 403
     console.log("error", data.status);
     //This shows status message eg. Forbidden
     console.log("STATUS: "+xhr);
}).always(function() {
     //TO-DO after fail/done request.
     console.log("ended");
})
  

}

const quizData = [{
  id: 1,
  question: 'Ваша цель пополения гардероба?',
  a: 'Повседневная одежда',
  b: 'Одежда для спорта',
  c: 'Одежда для отпуска',
  d: "Одежда для офиса",
  correct: 'c'
}, {
  id: 2,
  question: "Укажите ваш размер",
  a: 'S (44-46)',
  b: "M (46-48)",
  c: 'L (48-50)',
  d: "XL (50-52)",
  correct: 'a',
}, {
  id: 3,
  question: 'Укажите ваш возраст',
  a: "до 18",
  b: "19-30",
  c: '31-45',
  d: 'старше 45',
  correct: 'c',
},
{
  id: 4,
  question: "Какой у вас цвет волос?",
  a: "Брюнет",
  b: "Русый",
  c: "Блондин",
  d: "Шатен",
  correct: "b"
},
{
  id: 5,
  question: "Какой силуэт одежды предпочитаете?",
  a: "Стандартная посадка",
  b: "Немного оверсайз",
  c: "Посадка плотно по фигуре",
  d: "Нет предпочтений по посадке",
  correct: "b"
},
];

let allAnswers = new Array();

const startBtn = document.getElementById('start');
const res_modal = document.querySelector('.result_modal');
const quiz = document.getElementById('quiz');
const quizInner = document.querySelector('.quiz__header');
const quizInfo = document.querySelector('.quiz-info');
const answerEls = document.querySelectorAll('.answer');
const questionEl = document.getElementById('question');
const numberEl = document.getElementById('idQuestion');
const a_text = document.getElementById('a_text');
const b_text = document.getElementById('b_text');
const c_text = document.getElementById('c_text');
const d_text = document.getElementById('d_text');
const submitBtn = document.getElementById('submit');
const result = document.createElement('div');
const reset = document.createElement('button');
const thirdInput = document.createElement('input');
let currentQuiz = 0;
let score = 0;

loadQuiz();

function loadQuiz() {

  deletectAnswers();
  const currentQuizData = quizData[currentQuiz];
  questionEl.innerText = currentQuizData.question;
  numberEl.innerText = currentQuizData.id;
  a_text.innerText = currentQuizData.a;
  b_text.innerText = currentQuizData.b;
  c_text.innerText = currentQuizData.c;
  d_text.innerText = currentQuizData.d;
}

function getSelected() {
  const answerEls = document.querySelectorAll('.answer');
  let answer = undefined;
  answerEls.forEach((answerEl) => {
    if (answerEl.checked) {
      answer = answerEl.id;
    }
  });

  return answer;
}

function deletectAnswers() {
  answerEls.forEach((answerEl) => {
    answerEl.checked = false;
  });
}

submitBtn.addEventListener('click', () => {
  // check to see the answer
  quizInfo.style.display = "none";
  quizInner.style.display = "block";
  submitBtn.innerText = "Дальше";
  const answer = getSelected();
 
  console.log(answer);
  if (answer) {
    currentQuiz++;
    allAnswers.push(answer);
    if (currentQuiz < quizData.length) {
      const currentQuizData = quizData[currentQuiz];
      const answerEls = document.querySelectorAll('.answer');

      loadQuiz();


    } else {

      // res_modal.innerHTML = `<h2>Спасибо за заполнение анкеты ${score}/${quizData.length} вопросов`;
      res_modal.innerHTML = `<h2>Спасибо за заполнение анкеты!</h2>`;
      res_modal.innerHTML = `<h3>Введите ваше имя!</h2>`;
      reset.innerText = `Пройти заново`;
      reset.classList.add('reset__styles');
      result.innerText = `Общий рельльтат - ${score / quizData.length * 100}%`;
      result.classList.add('result__styles');
      result.innerHTML = `<input name="name" placeholder="name" type="text"/>`;
      res_modal.prepend(reset);
      res_modal.append(result);
      res_modal.style.display = "flex";
      sendJSON(allAnswers);
    }
  }
});

reset.addEventListener('click', () => {
  res_modal.style.display = "none";
  currentQuiz = 0;
  score = 0;
  loadQuiz();
});