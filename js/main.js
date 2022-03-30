$(function () {
  $('.contact-inner-item-info').on('click', function () {
    $(this).next('.contact-inner-item-hidden').slideToggle('active');
    $(this).children('.contact-inner-item-arrow').toggleClass('active');
  }
  );

});

// эта функция сработает при нажатии на кнопку
function sendJSON(answer) {
  let response = null;
  $.post("https://basis.clothing/submit-data",
    { "question1": answer[0], "question2": answer[1], "question3": answer[2], "question4": answer[3], "question5": answer[4] },
    function (data) {
      response = data;
      console.log(data);
      updateItem(data.shirts);
      updateItem(data.pants);
      updateItem(data.outerwear);
    }).done(function () {
      // TO DO ON DONE
    }).fail(function (data, textStatus, xhr) {
      //This shows status code eg. 403
      console.log("error", data.status);
      //This shows status message eg. Forbidden
      console.log("STATUS: " + xhr);
    }).always(function () {
      //TO-DO after fail/done request.
      console.log("ended");
    })


}
function updateItem(data) {
  $.each(data, function (i, item) {
    $(".result-inner").append(makeItem(item.image, item.page));
  })
}

function makeItem(imgLink, pageLink) {
  return "".concat('<div class="result-inner-item">',
    '<img class="result-inner-item-img" src="' + imgLink + '">',
    '<a class="result-inner-item-link" href="' + pageLink + '">',
    '<div class="link-text">'+
    'Cсылка',
    '</div>',
    '<img class="result-inner-item-img" src="img/arrow-result.svg"',
    '</a>',
    '</div>');
}
const quizData = [{
  id: 1,
  question: 'Ваша цель пополения гардероба?',
  a: 'Повседневная одежда',
  b: 'Одежда для спорта',
  c: 'Одежда для отпуска',
  d: "Одежда для офиса",
  correct: 'c'
},
  {
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
const resultImg = document.querySelector(".result-inner-item-img");
const res_modal = document.querySelector('.result_modal');
const quiz = document.getElementById('quiz');
const quizTitle = document.querySelector('.quiz-title');
const quizTitleTwo = document.querySelector('.quiz-title.two');
const quizSubtitle = document.querySelector('.quiz-subtitle');
const quizInner = document.querySelector('.quiz__header');
const quizResult = document.querySelector('.result');
const quizResultItem = document.querySelector('.result-inner-item');
const quizInfo = document.querySelector('.quiz-info');
const answerEls = document.querySelectorAll('.answer');
const questionEl = document.getElementById('question');
const numberEl = document.getElementById('idQuestion');
const a_text = document.getElementById('a_text');
const b_text = document.getElementById('b_text');
const c_text = document.getElementById('c_text');
const d_text = document.getElementById('d_text');
const submitBtn = document.getElementById('submit');


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
      res_modal.style.position = "unset";
      quizInfo.style.display = "block";
      quizResult.style.display = "block";
      quizInfo.style.display = "block";
      quizInner.style.display = "none";
      quizTitle.innerText = `Ого, ваша персональная`;
      quizTitleTwo.innerText = `подборка готова`;
      quizSubtitle.innerText = `Ниже подборка с ссылками на вещи и подборка образов от эксперта`;
      sendJSON(allAnswers);
      submitBtn.style.display = "none";
    }
  }
});
