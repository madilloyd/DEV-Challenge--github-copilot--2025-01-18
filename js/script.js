document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('goal-form');
    const goalInput = document.getElementById('goal');
    const goalVisualization = document.getElementById('goal-visualization');

    form?.addEventListener('submit', function(event) {
        event.preventDefault();
        const goal = goalInput.value.trim();
        if (goal) {
            saveGoal(goal);
            goalInput.value = '';
            alert('Goal saved!');
        }
    });

    function saveGoal(goal) {
        let goals = JSON.parse(localStorage.getItem('goals')) || [];
        goals.push(goal);
        localStorage.setItem('goals', JSON.stringify(goals));
        displayGoals();
    }

    function displayGoals() {
        let goals = JSON.parse(localStorage.getItem('goals')) || [];
        goalVisualization.innerHTML = '';
        goals.forEach(function(goal) {
            const goalElement = document.createElement('div');
            goalElement.textContent = goal;
            goalElement.classList.add('goal-item');
            goalVisualization.appendChild(goalElement);
        });
    }

    if (goalVisualization) {
        displayGoals();
    }
});