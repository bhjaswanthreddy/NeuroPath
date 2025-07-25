// NeuroPath Website JavaScript

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Quiz if quiz container exists
  const quizContainer = document.querySelector('.quiz-container');
  if (quizContainer) {
    initQuiz();
  }

  // Initialize lesson tabs
  const tabs = document.querySelectorAll('.tab');
  const contents = document.querySelectorAll('.lesson-content');
  if (tabs.length > 0 && contents.length > 0) {
    tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        // Remove active from all tabs and contents
        tabs.forEach((t) => t.classList.remove('active'));
        contents.forEach((c) => c.classList.remove('active'));
        // Activate current
        tab.classList.add('active');
        const target = tab.dataset.target;
        const content = document.querySelector(`#${target}`);
        if (content) content.classList.add('active');
      });
    });
    // Activate the first tab by default
    tabs[0].click();
  }

  // Animate dashboard progress bars
  const dashProgressBars = document.querySelectorAll('.progress-bar-inner');
  dashProgressBars.forEach((bar) => {
    const value = bar.dataset.value;
    if (value) {
      setTimeout(() => {
        bar.style.width = value + '%';
      }, 200);
    }
  });

  // Waitlist form submission
  const waitlistForm = document.querySelector('#waitlist-form');
  if (waitlistForm) {
    waitlistForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(waitlistForm);
      // Simulate saving data to remote storage by storing locally
      const entries = JSON.parse(localStorage.getItem('waitlist') || '[]');
      entries.push(Object.fromEntries(formData.entries()));
      localStorage.setItem('waitlist', JSON.stringify(entries));
      waitlistForm.reset();
      const thankYou = document.createElement('div');
      thankYou.className = 'thank-you';
      thankYou.textContent = 'Thank you for joining the NeuroPath waitlist! We will be in touch soon.';
      waitlistForm.parentNode.replaceChild(thankYou, waitlistForm);
    });
  }

  // Contact form submission
  const contactForm = document.querySelector('#contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(contactForm);
      const entries = JSON.parse(localStorage.getItem('feedback') || '[]');
      entries.push(Object.fromEntries(formData.entries()));
      localStorage.setItem('feedback', JSON.stringify(entries));
      contactForm.reset();
      const thankYou = document.createElement('div');
      thankYou.className = 'thank-you';
      thankYou.textContent = 'Thank you for your feedback! We appreciate your input.';
      contactForm.parentNode.replaceChild(thankYou, contactForm);
    });
  }
});

/**
 * Initializes the learning style quiz. The quiz measures preferences across visual,
 * auditory and logical dimensions by tallying scores for each answer.  Once all
 * questions are answered, the user is shown a summary of their dominant style
 * and an invitation to try a personalized lesson.  The progress bar updates
 * after each question.
 */
function initQuiz() {
  const questions = [
    {
      question: 'When studying new material, what helps you remember best?',
      options: [
        { text: 'Diagrams, charts or images', category: 'visual' },
        { text: 'Listening to explanations or podcasts', category: 'auditory' },
        { text: 'Working through formulas or logic steps', category: 'logical' }
      ]
    },
    {
      question: 'How do you prefer to take notes?',
      options: [
        { text: 'Drawing mind maps or sketching', category: 'visual' },
        { text: 'Recording voice memos', category: 'auditory' },
        { text: 'Writing outlines or bullet lists', category: 'logical' }
      ]
    },
    {
      question: 'Which activity do you enjoy more?',
      options: [
        { text: 'Watching tutorials or infographics', category: 'visual' },
        { text: 'Listening to lectures or discussions', category: 'auditory' },
        { text: 'Solving puzzles or brainteasers', category: 'logical' }
      ]
    },
    {
      question: 'When solving a problem, you tend to…',
      options: [
        { text: 'Visualize the solution in your mind', category: 'visual' },
        { text: 'Talk it out loud or listen to others', category: 'auditory' },
        { text: 'Break it down into steps or equations', category: 'logical' }
      ]
    },
    {
      question: 'What kind of teachers inspire you?',
      options: [
        { text: 'Those who use slides, visuals and props', category: 'visual' },
        { text: 'Those who have captivating voices', category: 'auditory' },
        { text: 'Those who focus on reasoning and structure', category: 'logical' }
      ]
    }
  ];
  let currentIndex = 0;
  const scores = { visual: 0, auditory: 0, logical: 0 };

  const progressBar = document.querySelector('.progress');
  const questionEl = document.querySelector('.quiz-question');
  const optionsContainer = document.querySelector('.options');
  const resultContainer = document.querySelector('.result-container');
  const resultTitle = document.querySelector('.result-title');
  const resultMessage = document.querySelector('.result-message');
  const ctaArea = document.querySelector('.result-cta');

  function renderQuestion(index) {
    const q = questions[index];
    questionEl.textContent = q.question;
    optionsContainer.innerHTML = '';
    q.options.forEach((opt, i) => {
      const div = document.createElement('div');
      div.className = 'option';
      div.textContent = opt.text;
      div.addEventListener('click', () => {
        // Deselect others
        const siblings = optionsContainer.querySelectorAll('.option');
        siblings.forEach((sib) => sib.classList.remove('selected'));
        div.classList.add('selected');
        // Add score
        scores[opt.category]++;
        // Proceed after slight delay
        setTimeout(() => {
          nextQuestion();
        }, 300);
      });
      optionsContainer.appendChild(div);
    });
    updateProgressBar();
  }

  function updateProgressBar() {
    const progress = ((currentIndex) / questions.length) * 100;
    progressBar.style.width = progress + '%';
  }

  function nextQuestion() {
    currentIndex++;
    if (currentIndex < questions.length) {
      renderQuestion(currentIndex);
    } else {
      // Show results
      showResults();
    }
  }

  function showResults() {
    // Hide quiz area
    document.querySelector('.quiz-step').classList.remove('active');
    resultContainer.style.display = 'block';
    // Determine dominant and second category
    const entries = Object.entries(scores);
    entries.sort((a, b) => b[1] - a[1]);
    const top = entries[0][1] > 0 ? entries[0][0] : null;
    const second = entries[1][1] > 0 ? entries[1][0] : null;
    let title = '';
    if (top && second && scores[top] === scores[second]) {
      // Combined style
      title = `${capitalize(top)}‑${capitalize(second)} learner`;
    } else if (top) {
      title = `${capitalize(top)} learner`;
    } else {
      title = 'Balanced learner';
    }
    resultTitle.textContent = `You're a ${title}!`;
    // Message describing the style
    const descriptions = {
      visual: 'You learn best through images, diagrams and spatial understanding.',
      auditory: 'You prefer listening to explanations, discussions and audio lessons.',
      logical: 'You excel when information is organized logically with patterns and reasoning.'
    };
    let message = '';
    if (top && second && scores[top] === scores[second]) {
      message = `${descriptions[top]} At the same time, you also benefit from ${descriptions[second].toLowerCase()}`;
    } else if (top) {
      message = descriptions[top];
    } else {
      message = 'You have a balanced learning style across visual, auditory and logical dimensions.';
    }
    resultMessage.textContent = message;
    // CTA prompt
    // Clear any existing content before appending the CTA
    ctaArea.innerHTML = '';
    const cta = document.createElement('button');
    cta.className = 'btn';
    cta.textContent = 'Try a personalized lesson';
    cta.addEventListener('click', () => {
      // When clicked, replace CTA button with email form
      const input = document.createElement('input');
      input.type = 'email';
      input.placeholder = 'Enter your email to unlock';
      input.required = true;
      input.style.marginRight = '1rem';
      const submit = document.createElement('button');
      submit.className = 'btn secondary';
      submit.textContent = 'Unlock';
      const form = document.createElement('form');
      form.style.marginTop = '1rem';
      form.appendChild(input);
      form.appendChild(submit);
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        ctaArea.innerHTML = '';
        const success = document.createElement('p');
        success.className = 'thank-you';
        success.textContent = 'Thanks! We will notify you when your personalized lesson is ready.';
        ctaArea.appendChild(success);
      });
      ctaArea.innerHTML = '';
      ctaArea.appendChild(form);
    });
    ctaArea.appendChild(cta);
  }

  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  // Start the quiz
  document.querySelector('.quiz-step').classList.add('active');
  renderQuestion(currentIndex);
}