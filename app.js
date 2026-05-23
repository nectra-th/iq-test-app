(() => {
    const TOTAL_QUESTIONS = 25;
    const START_LEVEL = 3;
    const MIN_LEVEL = 1;
    const MAX_LEVEL = 5;

    // DOM Elements
    const startScreen = document.getElementById('start-screen');
    const quizScreen = document.getElementById('quiz-screen');
    const resultScreen = document.getElementById('result-screen');
    const startBtn = document.getElementById('start-btn');
    const nextBtn = document.getElementById('next-btn');
    const retryBtn = document.getElementById('retry-btn');
    const questionNumber = document.getElementById('question-number');
    const timerDisplay = document.getElementById('timer');
    const progressFill = document.getElementById('progress-fill');
    const questionVisual = document.getElementById('question-visual');
    const choicesContainer = document.getElementById('choices');
    const iqScoreEl = document.getElementById('iq-score');
    const iqLabelEl = document.getElementById('iq-label');
    const iqDescriptionEl = document.getElementById('iq-description');
    const correctCountEl = document.getElementById('correct-count');
    const totalTimeEl = document.getElementById('total-time');

    let currentIndex = 0;
    let selectedAnswer = null;
    let answered = false;
    let timerInterval = null;
    let elapsedSeconds = 0;

    // Adaptive state
    let activeQuestions = [];   // The 25 questions selected adaptively
    let currentLevel = START_LEVEL;
    let responses = [];         // { difficulty, correct } for each answered question
    let usedIndices = new Set(); // Track which questions from the pool have been used
    let questionPool = {};      // { 1: [...], 2: [...], ... 5: [...] }

    function showScreen(screen) {
        [startScreen, quizScreen, resultScreen].forEach(s => s.classList.remove('active'));
        screen.classList.add('active');
    }

    function shuffleArray(arr) {
        const shuffled = [...arr];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    function startTimer() {
        elapsedSeconds = 0;
        timerInterval = setInterval(() => {
            elapsedSeconds++;
            const mins = String(Math.floor(elapsedSeconds / 60)).padStart(2, '0');
            const secs = String(elapsedSeconds % 60).padStart(2, '0');
            timerDisplay.textContent = `เวลา: ${mins}:${secs}`;
        }, 1000);
    }

    function stopTimer() {
        clearInterval(timerInterval);
    }

    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        if (mins === 0) return `${secs} วินาที`;
        return `${mins} นาที ${secs} วินาที`;
    }

    // --- Adaptive question selection ---

    function buildPool() {
        questionPool = {};
        for (let l = MIN_LEVEL; l <= MAX_LEVEL; l++) {
            questionPool[l] = [];
        }
        questions.forEach((q, i) => {
            const level = q.difficulty;
            if (questionPool[level]) {
                questionPool[level].push({ ...q, _poolIndex: i });
            }
        });
        // Shuffle each level
        for (let l = MIN_LEVEL; l <= MAX_LEVEL; l++) {
            questionPool[l] = shuffleArray(questionPool[l]);
        }
    }

    function pickQuestion(level) {
        // Try requested level first, then adjacent levels
        const tryOrder = [level];
        for (let offset = 1; offset <= MAX_LEVEL; offset++) {
            if (level + offset <= MAX_LEVEL) tryOrder.push(level + offset);
            if (level - offset >= MIN_LEVEL) tryOrder.push(level - offset);
        }

        for (const lv of tryOrder) {
            for (const q of questionPool[lv]) {
                if (!usedIndices.has(q._poolIndex)) {
                    usedIndices.add(q._poolIndex);
                    return q;
                }
            }
        }
        return null; // Pool exhausted
    }

    function getNextLevel(wasCorrect) {
        if (wasCorrect) {
            return Math.min(currentLevel + 1, MAX_LEVEL);
        } else {
            return Math.max(currentLevel - 1, MIN_LEVEL);
        }
    }

    // --- Quiz flow ---

    function startQuiz() {
        currentIndex = 0;
        selectedAnswer = null;
        answered = false;
        currentLevel = START_LEVEL;
        responses = [];
        usedIndices = new Set();
        activeQuestions = [];

        buildPool();

        // Pick first question
        const firstQ = pickQuestion(START_LEVEL);
        if (firstQ) activeQuestions.push(firstQ);

        showScreen(quizScreen);
        startTimer();
        loadQuestion();
    }

    function loadQuestion() {
        const q = activeQuestions[currentIndex];
        selectedAnswer = null;
        answered = false;
        nextBtn.disabled = true;

        questionNumber.textContent = `ข้อ ${currentIndex + 1} / ${TOTAL_QUESTIONS}`;
        progressFill.style.width = `${(currentIndex / TOTAL_QUESTIONS) * 100}%`;

        questionVisual.innerHTML = '';
        questionVisual.style.display = '';
        choicesContainer.innerHTML = '';

        switch (q.type) {
            case 'matrix':
                questionVisual.appendChild(SVGEngine.renderMatrix(q.grid));
                choicesContainer.className = 'choices visual-choices';
                renderOptionButtons(q.options);
                break;
            case 'series':
                questionVisual.appendChild(SVGEngine.renderSeries(q.sequence));
                choicesContainer.className = 'choices visual-choices';
                renderOptionButtons(q.options);
                break;
            case 'odd-one-out':
                questionVisual.style.display = 'none';
                choicesContainer.className = 'choices oddoneout-choices';
                q.figures.forEach((figure, index) => {
                    const btn = document.createElement('button');
                    btn.className = 'choice-btn';
                    btn.appendChild(SVGEngine.renderCell(figure, 70, 70));
                    btn.addEventListener('click', () => selectAnswer(index));
                    choicesContainer.appendChild(btn);
                });
                break;
            case 'rotation':
                questionVisual.appendChild(SVGEngine.renderRotationStimulus(q.original, q.transform));
                choicesContainer.className = 'choices visual-choices';
                renderOptionButtons(q.options);
                break;
        }

        nextBtn.textContent = currentIndex === TOTAL_QUESTIONS - 1 ? 'ดูผลลัพธ์' : 'ข้อถัดไป';
    }

    function renderOptionButtons(options) {
        options.forEach((option, index) => {
            const btn = document.createElement('button');
            btn.className = 'choice-btn';
            btn.appendChild(SVGEngine.renderCell(option, 80, 80));
            btn.addEventListener('click', () => selectAnswer(index));
            choicesContainer.appendChild(btn);
        });
    }

    function selectAnswer(index) {
        if (answered) return;

        answered = true;
        selectedAnswer = index;
        const q = activeQuestions[currentIndex];
        const correct = index === q.answer;
        const buttons = choicesContainer.querySelectorAll('.choice-btn');

        buttons.forEach((btn, i) => {
            btn.style.pointerEvents = 'none';
            if (i === q.answer) btn.classList.add('correct');
            if (i === index && !correct) btn.classList.add('wrong');
        });

        // Record response
        responses.push({ difficulty: q.difficulty, correct });

        // Adapt: pick next question at new level
        currentLevel = getNextLevel(correct);
        if (currentIndex + 1 < TOTAL_QUESTIONS) {
            const nextQ = pickQuestion(currentLevel);
            if (nextQ) activeQuestions.push(nextQ);
        }

        nextBtn.disabled = false;
    }

    function nextQuestion() {
        currentIndex++;
        if (currentIndex >= TOTAL_QUESTIONS || currentIndex >= activeQuestions.length) {
            showResults();
        } else {
            loadQuestion();
        }
    }

    // --- Scoring based on Raven's SPM norms ---

    function calculateIQ() {
        // Weighted score: each correct answer scores its difficulty level
        // Max possible = if all 25 at level 5 = 125
        // Realistic high = mix of level 4-5 = ~100
        const weightedScore = responses.reduce((sum, r) => {
            return sum + (r.correct ? r.difficulty : 0);
        }, 0);
        const maxWeighted = responses.reduce((sum, r) => sum + r.difficulty, 0);
        const weightedRatio = maxWeighted > 0 ? weightedScore / maxWeighted : 0;

        // Average difficulty of questions attempted (shows adaptive ceiling)
        const avgDifficulty = responses.reduce((sum, r) => sum + r.difficulty, 0) / responses.length;

        // Theta: ability estimate combining accuracy at difficulty level
        // Range: ~1.0 (all wrong at level 1) to ~5.0 (all right at level 5)
        const theta = avgDifficulty * weightedRatio + (1 - weightedRatio) * 1;

        // Map theta to IQ using normal distribution
        // theta 1.0 → ~70, theta 3.0 → ~100, theta 5.0 → ~145
        // Linear mapping: IQ = 55 + theta * 18.75
        // But use slight curve to compress extremes
        const rawIQ = 55 + theta * 18;

        // Small time bonus (max +3): rewards decisive answers
        const avgTime = elapsedSeconds / responses.length;
        let timeBonus = 0;
        if (avgTime < 12) timeBonus = 3;
        else if (avgTime < 20) timeBonus = 2;
        else if (avgTime < 30) timeBonus = 1;

        const finalIQ = Math.round(rawIQ + timeBonus);
        return Math.min(Math.max(finalIQ, 55), 155);
    }

    function getIQCategory(iq) {
        if (iq >= 145) return { label: "อัจฉริยะ", description: "ระดับสูงสุด — ความสามารถในการหาแบบแผนซับซ้อนอยู่ในกลุ่มบนสุด" };
        if (iq >= 130) return { label: "ฉลาดมาก", description: "สูงกว่าคนทั่วไปอย่างชัดเจน มองเห็น pattern หลายชั้นได้ดี" };
        if (iq >= 115) return { label: "สูงกว่าปกติ", description: "เหนือค่าเฉลี่ย มีความสามารถในการวิเคราะห์ pattern ที่ดี" };
        if (iq >= 100) return { label: "ปกติ (สูง)", description: "อยู่ในเกณฑ์ปกติถึงค่อนข้างดี ใกล้เคียงค่าเฉลี่ยประชากร" };
        if (iq >= 85) return { label: "ปกติ", description: "อยู่ในเกณฑ์ปกติ ค่าเฉลี่ยประชากรอยู่ที่ IQ 100" };
        if (iq >= 70) return { label: "ต่ำกว่าปกติเล็กน้อย", description: "ลองทำอีกครั้งแบบไม่เร่ง อาจได้คะแนนดีขึ้น" };
        return { label: "ต่ำกว่าปกติ", description: "แบบทดสอบนี้เป็นการประเมินเบื้องต้นเท่านั้น" };
    }

    function showResults() {
        stopTimer();
        progressFill.style.width = '100%';

        const correctCount = responses.filter(r => r.correct).length;
        const iq = calculateIQ();
        const category = getIQCategory(iq);

        iqScoreEl.textContent = iq;
        iqLabelEl.textContent = category.label;
        iqDescriptionEl.textContent = category.description;
        correctCountEl.textContent = `${correctCount} / ${responses.length}`;
        totalTimeEl.textContent = formatTime(elapsedSeconds);

        showScreen(resultScreen);
    }

    // Event listeners
    startBtn.addEventListener('click', startQuiz);
    nextBtn.addEventListener('click', nextQuestion);
    retryBtn.addEventListener('click', startQuiz);
})();
