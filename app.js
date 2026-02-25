// DevOps Roadmap — Progress Tracker

const TOPICS = [
    { id: 'linux', name: 'Linux', desc: 'Командная строка, файловая система, процессы, systemd' },
    { id: 'network', name: 'Сети', desc: 'TCP/IP, DNS, HTTP, SSH, файрволы, модель OSI' },
    { id: 'git', name: 'Git', desc: 'Версионирование, ветвление, merge, pull requests' },
    { id: 'scripting', name: 'Bash & Python', desc: 'Автоматизация задач, скрипты, работа с API' },
    { id: 'nginx', name: 'Nginx', desc: 'Веб-сервер, reverse proxy, балансировка, SSL' },
    { id: 'docker', name: 'Docker', desc: 'Контейнеризация, Dockerfile, docker-compose' },
    { id: 'cicd', name: 'CI/CD', desc: 'GitHub Actions, GitLab CI, Jenkins, пайплайны' },
    { id: 'ansible', name: 'Ansible', desc: 'Управление конфигурацией, playbooks, roles' },
    { id: 'terraform', name: 'Terraform', desc: 'Infrastructure as Code, провайдеры, state, модули' },
    { id: 'kubernetes', name: 'Kubernetes', desc: 'Оркестрация контейнеров, pods, services, Helm' },
    { id: 'cloud', name: 'Облачные платформы', desc: 'AWS, GCP, Azure — основные сервисы' },
    { id: 'monitoring', name: 'Мониторинг', desc: 'Prometheus, Grafana, ELK Stack, алертинг' },
    { id: 'security', name: 'Безопасность', desc: 'DevSecOps, сканирование, секреты, RBAC' },
];

function getProgress() {
    try {
        return JSON.parse(localStorage.getItem('devops-progress') || '{}');
    } catch { return {}; }
}

function setTopicComplete(topicId, done) {
    const progress = getProgress();
    progress[topicId] = done;
    localStorage.setItem('devops-progress', JSON.stringify(progress));
}

function getCompletedCount() {
    const progress = getProgress();
    return TOPICS.filter(t => progress[t.id]).length;
}

// Update progress bar on any page
function updateProgressUI() {
    const count = getCompletedCount();
    const pct = Math.round((count / TOPICS.length) * 100);

    const bar = document.getElementById('progressBar');
    if (bar) bar.style.width = pct + '%';

    const label = document.getElementById('progressLabel');
    if (label) label.textContent = count + ' / ' + TOPICS.length;

    const headerProgress = document.getElementById('headerProgress');
    if (headerProgress) headerProgress.textContent = count + '/' + TOPICS.length;
}

// Render topic cards on main page
function renderTopics() {
    const list = document.getElementById('topicsList');
    if (!list) return;

    const progress = getProgress();

    list.innerHTML = TOPICS.map((t, i) => {
        const done = progress[t.id];
        const statusClass = done ? 'completed' : 'not-started';
        const statusText = done ? 'Завершено' : '';
        const num = String(i + 1).padStart(2, '0');

        return `<a class="topic-card" href="pages/${t.id}.html">
            <span class="topic-num">${num}</span>
            <div class="topic-info">
                <div class="topic-name">${t.name}</div>
                <div class="topic-desc">${t.desc}</div>
            </div>
            <span class="topic-status ${statusClass}">${statusText}</span>
        </a>`;
    }).join('');
}

// Init checkbox on topic page
function initTopicCheckbox() {
    const cb = document.getElementById('topicCheckbox');
    if (!cb) return;

    const topicId = cb.dataset.topic;
    const progress = getProgress();
    cb.checked = !!progress[topicId];

    cb.addEventListener('change', () => {
        setTopicComplete(topicId, cb.checked);
        updateProgressUI();
    });
}

// Run on load
document.addEventListener('DOMContentLoaded', () => {
    renderTopics();
    initTopicCheckbox();
    updateProgressUI();
});
