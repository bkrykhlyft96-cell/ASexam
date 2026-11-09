let studentName = "";
let studentClass = "";
let currentQuestionIndex = 0;
let timerInterval;
let timeLeft = 40 * 60; // 40 دقيقة
let userAnswers = {};

const questions = [
  {
    question:
      "1. في مرحلة الإرسال التلفزيوني، ما هي وظيفة الميكروفون الأساسية؟",
    options: [
      "تحويل الصوت إلى إشارة كهربية",
      "تكبير إشارة الصورة",
      "تحويل الصورة إلى إشارة كهربية",
      "مزج الصوت مع الصورة",
    ],
    correct: 0,
    image:
      "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=600&q=80",
  },
  {
    question:
      "2. ما هي الوظيفة الأساسية لمرحلة (المازج) في جهاز الإرسال التلفزيوني؟",
    options: [
      "تكبير الصوت فقط",
      "لمزج إشارة الصوت مع إشارة الصورة",
      "تحويل الإشارة إلى موجات كهرومغناطيسية",
      "فصل الصوت عن الصورة",
    ],
    correct: 1,
  },
  {
    question:
      "3. في مرحلة الاستقبال، المكون المسؤول عن التقاط الإشارة المرسلة من الجو هو:",
    options: ["مكبر الصوت", "الشاشة", "الهوائي (Antenna)", "فاصل الإشارات"],
    correct: 2,
    image:
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80",
  },
  {
    question:
      "4. ما هي الوظيفة الأساسية لمرحلة (الفاصل) في جهاز الاستقبال التلفزيوني؟",
    options: [
      "فصل إشارة الصوت عن إشارة الصورة",
      "تكبير التردد العالي",
      "تغذية الشاشة بالجهد العالي",
      "تنظيم التيار المستمر",
    ],
    correct: 0,
  },
  {
    question: "5. من عيوب نظام (الإرسال التناظري) مقارنة بالرقمي:",
    options: [
      "صورة فائقة الدقة والوضوح",
      "يعاني الصوت من التشويش وانخفاض استجابة التردد",
      "توفير كامل لعرض النطاق الترددي",
      "سرعة معالجة عالية جداً",
    ],
    correct: 1,
  },
  {
    question:
      "6. ما هي الأقسام الرئيسية الثلاثة التي يتكون منها جهاز التلفزيون؟",
    options: [
      "قسم التغذية، قسم المعالج، وقسم الذاكرة",
      "قسم الصوت، قسم الصورة، وقسم الإنحراف",
      "قسم الألوان، قسم الإرسال، وقسم الصوت",
      "قسم الشاشة، قسم الريموت، وقسم الباور",
    ],
    correct: 1,
  },
  {
    question: "7. ما هي الوظيفة التي يقوم بها (قسم الإنحراف) في التلفزيون؟",
    options: [
      "تكبير الصوت وتوصيله للسماعة",
      "كشف إشارات التزامن وتحريك الشعاع الإلكتروني",
      "تحويل الجهد المتغير إلى مستمر",
      "اختيار القنوات الفضائية",
    ],
    correct: 1,
  },
  {
    question: "8. في دائرة منظم الجهد الرئيسية، ما هي وظيفة (محول العزل)؟",
    options: [
      "زيادة الجهد الكهربي للضعف",
      "عزل دوائر الملف الابتدائي عن دوائر الملف الثانوي للأمان",
      "توليد موجات مربعة",
      "فصل التيار نهائياً",
    ],
    correct: 1,
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80",
  },
  {
    question: "9. ترانزستور القدرة في دائرة التغذية يعمل بشكل أساسي كـ:",
    options: [
      "مكبر صوت فقط",
      "مفتاح فصل وتوصيل (Switch)",
      "مقاومة متغيره لتخفيض الحرارة",
      "مصدر لتوليد الأشعة الحمراء",
    ],
    correct: 1,
  },
  {
    question:
      "10. دائرة التشغيل والإطفاء في محول خرج الأفقي تعمل على تغذية ثلاث جهات أساسية هي:",
    options: [
      "دائرة التحكم والنظام، لوحة المفاتيح، ودائرة بدء التشغيل/الإطفاء",
      "السماعة، الشاشة، والهوائي",
      "المازج، الفاصل، ومكبر الصورة",
      "منظم الجهد، دائرة التنعيم، ومحول العزل",
    ],
    correct: 0,
  },
  {
    question: "11. ما هي أنواع الترددات التي يستقبلها هوائي التلفزيون؟",
    options: [
      "التردد المنخفض والمتوسط (LF & MF)",
      "التردد العالي (VHF) والتردد فوق العالي (UHF)",
      "ترددات الصوت الخالصة فقط",
      "الترددات الرقمية المشفرة",
    ],
    correct: 1,
  },
  {
    question:
      "12. ما هي الوظيفة الرئيسية لـ (منخب القنوات - Tuner) في التلفزيون؟",
    options: [
      "اختيار قناة تلفزيونية محددة وتكبير وخفض ترددها إلى التردد البيني (IF)",
      "عرض الصورة على الشاشة مباشرة",
      "توليد الجهد العالي لشاشة العرض",
      "إصدار الأصوات عبر السماعات",
    ],
    correct: 0,
  },
  {
    question:
      "13. النطاق الترددي للتردد البيني (IF) الناتج من منتخب القنوات محصور عادة بين:",
    options: [
      "1 MHz و 5 MHz",
      "41.25 MHz و 45.75 MHz",
      "100 MHz و 200 MHz",
      "10 GHz و 15 GHz",
    ],
    correct: 1,
  },
  {
    question:
      "14. ماذا تعني لوحة المفاتيح ومستقبل الأشعة الحمراء المرتبطة بدائرة التحكم؟",
    options: [
      "المسؤولة عن استقبال أوامر الريموت كنترول والأزرار الأمامية",
      "المسؤولة عن تبريد الجهاز من الداخل",
      "المسؤولة عن إضاءة لمبة البيان فقط",
      "المسؤولة عن تنقية الصورة من التشويش",
    ],
    correct: 0,
  },
  {
    question: "15. دائرة التنعيم في قسم التغذية مهمتها الأساسية هي:",
    options: [
      "تحويل الجهد المتغير إلى جهد مستمر نقي وثابت",
      "زيادة سرعة معالجة القنوات",
      "تخزين البيانات المؤقتة",
      "تكبير الموجات الكهرومغناطيسية",
    ],
    correct: 0,
  },
  {
    question: "16. ما هو الغرض من (مولد النبضات) في دوائر التلفزيون؟",
    options: [
      "توليد موجة مربعة لتشغيل ترانزستور القدرة وتنظيم الجهد",
      "إصدار نغمات صوتية عند الأعطال",
      "توليد صورة ملونة",
      "التحكم في إضاءة الشاشة",
    ],
    correct: 0,
  },
  {
    question:
      "17. أي مما يلي يُعتبر من المراحل الأساسية لجهاز التلفزيون الموضحة بالمخطط الشامل؟",
    options: [
      "مرحلة الصوت، مرحلة الصورة، ومرحلة الألوان",
      "مرحلة معالجة النصوص",
      "مرحلة التسجيل الرقمي",
      "مرحلة الاتصال اللاسلكي بالإنترنت",
    ],
    correct: 0,
  },
  {
    question: "18. ما هي وظيفة (مرحلة الصورة) داخل الجهاز؟",
    options: [
      "تأخذ الإشارة المرئية، تكبرها، تكشفها، وتحولها إلى الشاشة",
      "تفصل الصوت عن الصورة",
      "تغذي السماعة الخارجية مباشرة",
      "تلتقط الموجات من الجو",
    ],
    correct: 0,
  },
  {
    question:
      "19. ما هو الفرق الأساسي بين الإرسال التناظري والرقمي في التلفزيون؟",
    options: [
      "التناظري يعاني من التشويش وانخفاض الجودة بخلاف الرقمي",
      "الرقمي أبطأ بكثير من التناظري",
      "التناظري لا يحتوى على صوت",
      "لا يوجد أي فرق بينهما",
    ],
    correct: 0,
  },
  {
    question:
      "20. نظام الإرسال والاستقبال في الأجهزة الحديثة ينقسم إلى نوعين أساسيين هما:",
    options: [
      "التناظري (Analog) والرقمي (Digital)",
      "الداخلي والخارجي",
      "السلكي واللاسلكي المباشر",
      "المرئي والمسموع فقط",
    ],
    correct: 0,
  },
];

function startExam() {
  studentName = document.getElementById("student-name").value.trim();
  studentClass = document.getElementById("student-class").value.trim();

  if (studentName === "" || studentClass === "") {
    alert("الرجاء إدخال اسم الطالب والفصل قبل بدء الامتحان.");
    return;
  }

  document.getElementById("student-form").style.display = "none";
  document.getElementById("quiz-screen").style.display = "block";
  startTimer();
  showQuestion();
}

function startTimer() {
  timerInterval = setInterval(() => {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    document.getElementById("timer").textContent =
      `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      alert("انتهى وقت الامتحان!");
      finishExam();
    }
    timeLeft--;
  }, 1000);
}

function showQuestion() {
  let q = questions[currentQuestionIndex];
  let container = document.getElementById("question-container");

  let html = `<h3>${q.question}</h3>`;
  if (q.image) {
    html += `<img src="${q.image}" class="question-img" alt="صورة توضيحية من المنهج">`;
  }

  html += `<div class="answers-grid">`;
  q.options.forEach((opt, index) => {
    let isChecked =
      userAnswers[currentQuestionIndex] === index ? "checked" : "";
    html += `
            <label class="answer-card">
                <input type="radio" name="question" value="${index}" ${isChecked}>
                <span>${opt}</span>
            </label>
        `;
  });
  html += `</div>`;

  container.innerHTML = html;

  if (currentQuestionIndex > 0) {
    document.getElementById("prev-btn").style.display = "block";
  } else {
    document.getElementById("prev-btn").style.display = "none";
  }

  let nextBtn = document.getElementById("next-btn");
  if (currentQuestionIndex === questions.length - 1) {
    nextBtn.textContent = "إنهاء الامتحان";
  } else {
    nextBtn.textContent = "السؤال التالي";
  }
}

function saveCurrentAnswer() {
  let selected = document.querySelector('input[name="question"]:checked');
  if (selected) {
    userAnswers[currentQuestionIndex] = parseInt(selected.value);
  }
}

function nextQuestion() {
  let selected = document.querySelector('input[name="question"]:checked');
  if (!selected) {
    alert("الرجاء اختيار إجابة قبل الانتقال.");
    return;
  }

  saveCurrentAnswer();

  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    clearInterval(timerInterval);
    finishExam();
  }
}

function prevQuestion() {
  saveCurrentAnswer();
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    showQuestion();
  }
}

function finishExam() {
  document.getElementById("quiz-screen").style.display = "none";
  document.getElementById("result-screen").style.display = "block";

  let score = 0;
  questions.forEach((q, index) => {
    if (userAnswers[index] === q.correct) {
      score++;
    }
  });

  let percentage = Math.round((score * 100) / questions.length);
  document.getElementById("final-score-text").innerHTML =
    `عزيزي الطالب: <b>${studentName}</b> (الفصل: ${studentClass})<br>لقد حصلت على درجة: <b>${score} من ${questions.length}</b> (${percentage}%)`;

  let reviewContainer = document.getElementById("review-container");
  let reviewHtml = "";

  questions.forEach((q, index) => {
    let studentChoice = userAnswers[index];
    reviewHtml += `<div class="review-question-box">`;
    reviewHtml += `<p><b>س${index + 1}: ${q.question}</b></p>`;

    q.options.forEach((opt, optIndex) => {
      let className = "review-option";
      let iconText = "";

      if (optIndex === q.correct) {
        className += " correct-answer-highlight";
        iconText = " ✔️ (الإجابة الصحيحة)";
      }

      if (studentChoice === optIndex && studentChoice !== q.correct) {
        className += " wrong-answer-highlight";
        iconText = " ❌ (إجابتك الخاطئة)";
      } else if (studentChoice === optIndex && studentChoice === q.correct) {
        iconText = " ✔️ (إجابتك الصحيحة)";
      }

      reviewHtml += `<div class="${className}">${opt} ${iconText}</div>`;
    });

    reviewHtml += `</div>`;
  });

  reviewContainer.innerHTML = reviewHtml;

  sendResultToGoogleSheets(score, percentage);
}

function sendResultToGoogleSheets(finalScore, percentage) {
  let scriptURL =
    "https://script.google.com/macros/s/ضع_رابط_الـ_Web_App_هنا/exec"; // ضع رابط جوجل شيت هنا

  let form = document.createElement("form");
  form.method = "POST";
  form.action = scriptURL;
  form.target = "hidden_iframe";

  let data = {
    name: studentName,
    className: studentClass,
    score: finalScore + " من " + questions.length,
    percentage: percentage + "%",
    date: new Date().toLocaleString("ar-EG"),
  };

  for (let key in data) {
    let input = document.createElement("input");
    input.type = "hidden";
    input.name = key;
    input.value = data[key];
    form.appendChild(input);
  }

  document.body.appendChild(form);
  form.submit();
  document.body.removeChild(form);
}
