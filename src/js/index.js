'use strict';

import 'babel-polyfill';

const PROGRESS_INTERBAL = 1800;
const WAIT_TIME = 500;
let progress = 0;
let questionData = [];
let question = {};
let progressTime;
let input = "";
let mistake = 0;
let answeredQuestions = [];
let $start = $('#start');
let $game = $('#game');
let $result = $('#result');

const readQuestionData = () => {
  return new Promise ((resolve, reject) => {
    $.getJSON("/docs/pokemon.json", (data) => {
      resolve(data);
    });
  });
};

const sleep = (ms) => {
 return new Promise((resolve, reject) => {
   setTimeout(resolve, ms);
 });
};

const updateProgress = () => {
  progress += 1;
  $('#progressBar').attr('value', progress)

  if(progress == 100) {
    clearInterval(progressTime);
    $game.hide();
    $result.show();
    finish();
  }
};

const reset = async () => {
  questionData = await readQuestionData();
  questionData = _.shuffle(questionData);
  mistake = 0;
  progress = 0;
  answeredQuestions = [];
  $('#progressBar').attr('value', progress)
};

const init = () => {
  reset();
  $start.find('.start-btn').show();
  $start.find('.start-btn').on('click', (e) => {
    e.preventDefault();
    $start.hide();
    $game.show();
    start();
  });
};

const changeQuestion = async (isSleep = false) => {
  if(isSleep) {
    await sleep(WAIT_TIME);
  }
  input = "";
  question = questionData.pop();
  $game.find('.typing-img img').attr('src', question.image)
  $game.find('.typing-name').text(question.name)
  $game.find('.typing-roma').text(question.roma)
  $game.find('.typing-input').text("");
};

const start = () => {
  changeQuestion();
  progressTime = setInterval(updateProgress, PROGRESS_INTERBAL)
  $(window).keydown((e) => {
    let char = question.roma.charAt(input.length);
    if(char == e.key.toUpperCase()) {
      input += char;
      $game.find('.typing-input').text(input);
    } else {
      mistake += 1;
    }
    if(input == question.roma) {
      answeredQuestions.push(question);
      changeQuestion(true);
    }
  })
};

const finish = () => {
  $(window).off('keydown');
  let test = "";
  _.forEach(answeredQuestions, (answeredQuestion) =>{
    test += answeredQuestion.name
  });
  $result.find('.pokemons').text(test);
  $result.find('.answered-count').text(answeredQuestions.length);
  $result.find('.mistake-count').text(mistake);
  reset();
  $result.find('.restart-btn').show();
  $result.find('.restart-btn').on('click', (e) => {
    e.preventDefault();
    $result.hide();
    $game.show();
    start();
  });
};

init();