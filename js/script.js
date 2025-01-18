document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('goal-form');
    const goalInput = document.getElementById('goal');
    const targetInput = document.getElementById('target');
    const progressInput = document.getElementById('progress');
    const goalVisualization = document.getElementById('goal-visualization');
    const motivationalTip = document.getElementById('motivational-tip');
    const clearGoalsButton = document.getElementById('clear-goals');

    const motivationalQuotes = [
        "Believe you can and you're halfway there.",
        "The only way to achieve the impossible is to believe it is possible.",
        "Don't watch the clock; do what it does. Keep going.",
        "Keep your eyes on the stars, and your feet on the ground.",
        "The future belongs to those who believe in the beauty of their dreams.",
        "It does not matter how slowly you go as long as you do not stop.",
        "You are never too old to set another goal or to dream a new dream."
    ];

    form?.addEventListener('submit', function(event) {
        event.preventDefault();
        const goal = goalInput.value.trim();
        const target = parseInt(targetInput.value.trim());
        const progress = parseInt(progressInput.value.trim());
        if (goal && target && progress >= 0) {
            saveGoal({ goal, target, progress });
            goalInput.value = '';
            targetInput.value = '';
            progressInput.value = '';
            alert('Goal saved!');
        }
    });

    clearGoalsButton?.addEventListener('click', function() {
        localStorage.removeItem('goals');
        displayGoals();
        alert('All goals have been cleared!');
    });

    function saveGoal(goalData) {
        let goals = JSON.parse(localStorage.getItem('goals')) || [];
        goals.push(goalData);
        localStorage.setItem('goals', JSON.stringify(goals));
        displayGoals();
    }

    function updateProgress(index, amount) {
        let goals = JSON.parse(localStorage.getItem('goals')) || [];
        if (goals[index]) {
            goals[index].progress = Math.min(goals[index].target, Math.max(0, goals[index].progress + amount));
            localStorage.setItem('goals', JSON.stringify(goals));
            displayGoals();
        }
    }

    function displayGoals() {
        let goals = JSON.parse(localStorage.getItem('goals')) || [];
        goalVisualization.innerHTML = '';
        goals.forEach(function(goalData, index) {
            const goalElement = document.createElement('div');
            goalElement.classList.add('goal-item');
            
            const goalTitle = document.createElement('h3');
            goalTitle.textContent = goalData.goal;
            goalElement.appendChild(goalTitle);
            
            const progressBarContainer = document.createElement('div');
            progressBarContainer.classList.add('progress-bar');
            const progressBar = document.createElement('div');
            const progress = (goalData.progress / goalData.target) * 100;
            progressBar.style.width = progress + '%';
            const progressLabel = document.createElement('span');
            progressLabel.textContent = Math.round(progress) + '%';
            progressBar.appendChild(progressLabel);
            progressBarContainer.appendChild(progressBar);
            goalElement.appendChild(progressBarContainer);
            
            const progressText = document.createElement('p');
            progressText.textContent = `Progress: ${goalData.progress} / ${goalData.target}`;
            goalElement.appendChild(progressText);

            const buttonContainer = document.createElement('div');
            buttonContainer.classList.add('button-container');

            const decrementButton = document.createElement('button');
            decrementButton.textContent = '-';
            decrementButton.addEventListener('click', function() {
                updateProgress(index, -1);
            });
            buttonContainer.appendChild(decrementButton);

            const incrementButton = document.createElement('button');
            incrementButton.textContent = '+';
            incrementButton.addEventListener('click', function() {
                if (goalData.progress < goalData.target) {
                    updateProgress(index, 1);
                    if (goalData.progress + 1 >= goalData.target) {
                        confetti({
                            particleCount: 100,
                            spread: 70,
                            origin: { y: 0.6 }
                        });
                    }
                }
            });
            buttonContainer.appendChild(incrementButton);

            goalElement.appendChild(buttonContainer);
            
            goalVisualization.appendChild(goalElement);
        });
    }

    function displayMotivationalTip() {
        const randomIndex = Math.floor(Math.random() * motivationalQuotes.length);
        motivationalTip.textContent = motivationalQuotes[randomIndex];
    }

    if (goalVisualization) {
        displayGoals();
        displayMotivationalTip();
    }
});