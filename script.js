const questions = [
  {
    id: "ai_usage_frequency",
    title: "Как часто вы пользуетесь нейросетями вроде ChatGPT?",
    type: "single",
    options: [
      "Почти каждый день",
      "Несколько раз в неделю",
      "Иногда",
      "Пробовал/а пару раз",
      "Не пользуюсь"
    ]
  },
  {
    id: "ai_usage_goal",
    title: "Для чего вы чаще всего используете нейросети или похожие сервисы?",
    type: "single",
    options: [
      "Объяснить сложную тему",
      "Найти ответ на вопрос",
      "Написать или улучшить текст",
      "Разобраться с заданием",
      "Найти идею или пример",
      "Не использую"
    ]
  },
  {
    id: "messages_needed",
    title: "Сколько сообщений обычно нужно, чтобы получить нормальный ответ?",
    type: "single",
    options: [
      "Одного хватает",
      "2-3 сообщения",
      "Нужно долго уточнять",
      "Часто ответ все равно не подходит",
      "Затрудняюсь ответить"
    ]
  },
  {
    id: "best_answer_priority",
    title: "Что для вас самое главное в хорошем ответе?",
    type: "single",
    options: [
      "Чтобы был точным",
      "Чтобы был простым и понятным",
      "Чтобы подходил именно к моей ситуации",
      "Чтобы был коротким",
      "Чтобы объяснял пошагово",
      "Чтобы можно было проверить, откуда взята информация"
    ]
  },
  {
    id: "assistant_irritation",
    title: "Что вас чаще всего раздражает в нейросетях или цифровых помощниках?",
    type: "single",
    options: [
      "Отвечают слишком общо",
      "Ошибаются или придумывают",
      "Нужно долго объяснять контекст",
      "Слишком много текста",
      "Непонятно, можно ли доверять ответу",
      "Не раздражает"
    ]
  },
  {
    id: "help_format",
    title: "Как вам удобнее получать помощь по учебе или работе?",
    type: "single",
    options: [
      "Короткий ответ",
      "Пошаговая инструкция",
      "Пример готового решения",
      "Объяснение простыми словами",
      "Сначала кратко, потом подробнее",
      "Через диалог с уточнениями"
    ]
  },
  {
    id: "long_materials_frequency",
    title: "Как часто вам приходится разбираться с длинными текстами, правилами, инструкциями, материалами или заданиями?",
    type: "single",
    options: [
      "Часто",
      "Иногда",
      "Редко",
      "Почти никогда"
    ]
  },
  {
    id: "materials_pain",
    title: "Что в таких материалах обычно неудобнее всего?",
    type: "single",
    options: [
      "Слишком много текста",
      "Сложно найти главное",
      "Непонятно, что делать дальше",
      "Сложный язык",
      "Нужно открывать много разных источников",
      "Ничего особенного"
    ]
  },
  {
    id: "trust_factor",
    title: "Если сервис отвечает на ваш вопрос, что больше всего повысит ваше доверие?",
    type: "single",
    options: [
      "Он показывает источник",
      "Он говорит простыми словами",
      "Он признает, если не знает точного ответа",
      "Он задает уточняющий вопрос",
      "Он дает пример",
      "Мне достаточно, чтобы ответ звучал логично"
    ]
  },
  {
    id: "use_case",
    title: "В каких ситуациях такой помощник был бы полезнее всего?",
    type: "single",
    options: [
      "Быстро понять тему",
      "Найти нужную информацию",
      "Подготовить текст или ответ",
      "Проверить свою идею",
      "Разобраться с заданием",
      "Объяснить материал другому человеку"
    ]
  },
  {
    id: "interest_level",
    title: "Насколько вам был бы интересен сервис, который помогает быстро получать понятные ответы по учебным или рабочим материалам?",
    type: "single",
    options: [
      "Очень интересен",
      "Скорее интересен",
      "Не уверен/а",
      "Скорее не интересен",
      "Не интересен"
    ]
  },
  {
    id: "most_useful_feature",
    title: "Какая одна функция была бы для вас самой полезной?",
    type: "text",
    placeholder: "Напишите в свободной форме"
  }
];

const animationClasses = ["enter-rise", "enter-slide", "enter-scale"];

const state = {
  currentIndex: 0,
  answers: {},
  isStarted: false,
  isSubmitting: false,
  isTransitioning: false
};

const hero = document.getElementById("hero");
const surveyForm = document.getElementById("surveyForm");
const questionFrame = document.getElementById("questionFrame");
const progressText = document.getElementById("progressText");
const progressBar = document.getElementById("progressBar");
const nextButton = document.getElementById("nextButton");
const completeState = document.getElementById("completeState");
const startButton = document.getElementById("startButton");

questionFrame.addEventListener("change", (event) => {
  const question = getCurrentQuestion();
  const target = event.target;

  if (!(target instanceof HTMLInputElement)) {
    return;
  }

  if (question.type !== "single" || target.name !== question.id || state.isSubmitting) {
    return;
  }

  state.answers[question.id] = target.value;
  const errorText = document.getElementById("errorText");
  if (errorText) {
    errorText.textContent = "";
  }

  if (state.currentIndex < questions.length - 1) {
    goToNextQuestion();
  }
});

function startSurvey() {
  state.isStarted = true;
  hero.classList.add("hidden");
  completeState.classList.add("hidden");
  surveyForm.classList.remove("hidden");
  renderQuestion();
}

function getCurrentQuestion() {
  return questions[state.currentIndex];
}

function renderQuestion() {
  const question = getCurrentQuestion();
  const animation = animationClasses[state.currentIndex % animationClasses.length];
  const savedValue = state.answers[question.id] ?? "";
  const isLast = state.currentIndex === questions.length - 1;

  progressText.textContent = `Вопрос ${state.currentIndex + 1} из ${questions.length}`;
  progressBar.style.width = `${((state.currentIndex + 1) / questions.length) * 100}%`;
  nextButton.classList.toggle("hidden", question.type === "single");

  if (question.type === "single") {
    nextButton.textContent = isLast ? "Отправить" : "Далее";
    const optionsMarkup = question.options.map((option, index) => {
      const checked = savedValue === option ? "checked" : "";
      const optionId = `${question.id}-${index}`;
      return `
        <label class="option" for="${optionId}">
          <input id="${optionId}" type="radio" name="${question.id}" value="${escapeHtml(option)}" ${checked}>
          <span class="option-label">${escapeHtml(option)}</span>
        </label>
      `;
    }).join("");

    questionFrame.innerHTML = `
      <article class="question-card ${animation}">
        <div class="question-heading">
          <span class="question-index">Шаг ${state.currentIndex + 1}</span>
          <h2 class="question-title">${escapeHtml(question.title)}</h2>
        </div>
        <div class="options">${optionsMarkup}</div>
        <div class="error" id="errorText"></div>
      </article>
    `;
    fitQuestionTitle();
    return;
  }

  nextButton.textContent = savedValue.trim() ? "Отправить" : "Просто отправить";

  questionFrame.innerHTML = `
    <article class="question-card ${animation}">
      <div class="question-heading">
        <span class="question-index">Шаг ${state.currentIndex + 1}</span>
        <h2 class="question-title">${escapeHtml(question.title)}</h2>
      </div>
      <div class="textarea-wrap">
        <textarea
          class="textarea"
          id="${question.id}"
          name="${question.id}"
          placeholder="${escapeHtml(question.placeholder)}"
        >${escapeHtml(savedValue)}</textarea>
      </div>
      <div class="error" id="errorText"></div>
    </article>
  `;
  fitQuestionTitle();
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function validateCurrentQuestion() {
  const question = getCurrentQuestion();
  const errorText = document.getElementById("errorText");

  if (question.type === "single") {
    const checked = questionFrame.querySelector(`input[name="${question.id}"]:checked`);
    if (!checked) {
      errorText.textContent = "Выберите один вариант, чтобы продолжить.";
      return false;
    }
    state.answers[question.id] = checked.value;
    errorText.textContent = "";
    return true;
  }

  const textarea = document.getElementById(question.id);
  const value = textarea.value.trim();
  state.answers[question.id] = value;
  errorText.textContent = "";
  return true;
}

function goToNextQuestion() {
  if (state.isTransitioning || state.currentIndex >= questions.length - 1) {
    return;
  }

  state.isTransitioning = true;
  state.currentIndex += 1;
  renderQuestion();
  window.setTimeout(() => {
    state.isTransitioning = false;
  }, 120);
}

function fitQuestionTitle() {
  const title = questionFrame.querySelector(".question-title");
  if (!title) {
    return;
  }

  title.style.fontSize = "";

  window.requestAnimationFrame(() => {
    const computed = window.getComputedStyle(title);
    const lineHeight = parseFloat(computed.lineHeight);
    if (!lineHeight) {
      return;
    }

    const maxHeight = lineHeight * 3.15;
    let size = parseFloat(computed.fontSize);

    while (title.offsetHeight > maxHeight && size > 16) {
      size -= 0.5;
      title.style.fontSize = `${size}px`;
    }
  });
}

async function submitSurvey() {
  const endpoint = window.SURVEY_CONFIG?.endpoint;
  if (!endpoint || endpoint.includes("__GOOGLE_APPS_SCRIPT_URL__")) {
    throw new Error("Не настроен URL Google Apps Script.");
  }

  const payload = {
    submittedAt: new Date().toISOString(),
    userAgent: navigator.userAgent,
    answers: questions.map((question, index) => ({
      index: index + 1,
      id: question.id,
      title: question.title,
      answer: state.answers[question.id] ?? ""
    }))
  };

  const response = await fetch(endpoint, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "text/plain;charset=utf-8"
    },
    body: JSON.stringify(payload)
  });

  const result = await response.json().catch(() => ({}));
  if (!response.ok || result.ok !== true) {
    throw new Error(result.error || "Не удалось отправить ответы.");
  }
}

async function handleNext(event) {
  event.preventDefault();
  if (state.isSubmitting) {
    return;
  }

  const isValid = validateCurrentQuestion();
  if (!isValid) {
    return;
  }

  const isLast = state.currentIndex === questions.length - 1;
  if (!isLast) {
    goToNextQuestion();
    return;
  }

  try {
    state.isSubmitting = true;
    nextButton.disabled = true;
    nextButton.textContent = "Отправка...";
    await submitSurvey();
    surveyForm.classList.add("hidden");
    completeState.classList.remove("hidden");
  } catch (error) {
    const errorText = document.getElementById("errorText");
    errorText.textContent = error.message || "Произошла ошибка при отправке.";
  } finally {
    state.isSubmitting = false;
    nextButton.disabled = false;
    nextButton.textContent = "Отправить";
  }
}

startButton.addEventListener("click", startSurvey);
surveyForm.addEventListener("submit", handleNext);
window.addEventListener("resize", fitQuestionTitle);

questionFrame.addEventListener("input", (event) => {
  const question = getCurrentQuestion();
  const target = event.target;

  if (!(target instanceof HTMLTextAreaElement) || question.type !== "text" || target.id !== question.id) {
    return;
  }

  nextButton.textContent = target.value.trim() ? "Отправить" : "Просто отправить";
});
