document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('goal-form');
    const goalInput = document.getElementById('goal');
    const targetInput = document.getElementById('target');
    const progressInput = document.getElementById('progress');
    const goalVisualization = document.getElementById('goal-visualization');
    const motivationalTip = document.getElementById('motivational-tip');

    const motivationalQuotes = [
        "Believe you can and you're halfway there.",
        "The only way to achieve the impossible is to believe it is possible.",
        "Don't watch the clock; do what it does. Keep going.",
        "Keep your eyes on the stars, and your feet on the ground."
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

    function saveGoal(goalData) {
        let goals = JSON.parse(localStorage.getItem('goals')) || [];
        goals.push(goalData);
        localStorage.setItem('goals', JSON.stringify(goals));
        displayGoals();
    }

    function displayGoals() {
        let goals = JSON.parse(localStorage.getItem('goals')) || [];
        goalVisualization.innerHTML = '';
        goals.forEach(function(goalData) {
            const goalElement = document.createElement('div');
            goalElement.classList.add('goal-item');
            
            const goalTitle = document.createElement('h3');
            goalTitle.textContent = goalData.goal;
            goalElement.appendChild(goalTitle);
            
            const progressBar = document.createElement('div');
            progressBar.classList.add('progress-bar');
            const progress = (goalData.progress / goalData.target) * 100;
            progressBar.style.width = progress + '%';
            goalElement.appendChild(progressBar);
            
            const progressText = document.createElement('p');
            progressText.textContent = `Progress: ${goalData.progress} / ${goalData.target}`;
            goalElement.appendChild(progressText);
            
            goalVisualization.appendChild(goalElement);
        });
        displayMotivationalTip();
    }

    function displayMotivationalTip() {
        const randomIndex = Math.floor(Math.random() * motivationalQuotes.length);
        motivationalTip.textContent = motivationalQuotes[randomIndex];
    }

    if (goalVisualization) {
        displayGoals();
    }
});