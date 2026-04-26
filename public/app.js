import VibeComm_V2 from '../src/VibeComm_V2.js';

const comm = new VibeComm_V2();

// DOM Elements
const connectBtn = document.getElementById('connect-btn');
const disconnectBtn = document.getElementById('disconnect-btn');
const statusPill = document.getElementById('status-pill');
const statusText = document.getElementById('status-text');
const eventLog = document.getElementById('event-log');
const uptimeValue = document.getElementById('uptime-value');
const throughputValue = document.getElementById('throughput-value');

let uptimeStart = null;
let uptimeInterval = null;

function log(message, type = 'system') {
    const entry = document.createElement('div');
    entry.className = `log-entry ${type}`;
    const time = new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
    entry.textContent = `[${time}] ${message}`;
    eventLog.appendChild(entry);
    eventLog.scrollTop = eventLog.scrollHeight;
}

function updateStatus(connected) {
    if (connected) {
        statusPill.classList.add('connected');
        statusText.textContent = 'LINK ACTIVE';
        connectBtn.disabled = true;
        disconnectBtn.disabled = false;
        startUptime();
        log('Connection established.', 'success');
    } else {
        statusPill.classList.remove('connected');
        statusText.textContent = 'DISCONNECTED';
        connectBtn.disabled = false;
        disconnectBtn.disabled = true;
        stopUptime();
        log('Connection terminated.', 'warning');
    }
}

function startUptime() {
    uptimeStart = Date.now();
    uptimeInterval = setInterval(() => {
        const diff = Date.now() - uptimeStart;
        uptimeValue.textContent = `${diff}ms`;
    }, 100);
}

function stopUptime() {
    clearInterval(uptimeInterval);
    uptimeValue.textContent = '0ms';
}

connectBtn.addEventListener('click', async () => {
    log('Requesting BLE device...', 'system');
    try {
        await comm.connect();
        // Since VibeComm_V2 is a skeleton, we simulate success for UI demo
        // In real use, this would be triggered by actual connection events
        updateStatus(true);
    } catch (err) {
        log(`Connection failed: ${err.message}`, 'error');
    }
});

disconnectBtn.addEventListener('click', async () => {
    await comm.disconnect();
    updateStatus(false);
});

document.getElementById('clear-log').addEventListener('click', () => {
    eventLog.innerHTML = '';
});

// Initialization
log('Dashboard ready. Awaiting user interaction.');
