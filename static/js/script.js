document.addEventListener('DOMContentLoaded', () => {
    const sourceText = document.getElementById('source-text');
    const summarizeBtn = document.getElementById('summarize-btn');
    const clearBtn = document.getElementById('clear-btn');
    const copyBtn = document.getElementById('copy-btn');
    const trainBtn = document.getElementById('train-btn');
    const summaryResult = document.getElementById('summary-result');
    const charCount = document.getElementById('char-count');
    const loader = document.getElementById('loader');
    const status = document.getElementById('status');

    // Update character count
    sourceText.addEventListener('input', () => {
        const count = sourceText.value.length;
        charCount.textContent = `${count.toLocaleString()} characters`;
    });

    // Summarize Button Click
    summarizeBtn.addEventListener('click', async () => {
        const text = sourceText.value.trim();

        if (!text) {
            showStatus('Please enter some text first!', 'error');
            return;
        }

        // UI Loading State
        summarizeBtn.disabled = true;
        loader.style.display = 'block';
        summarizeBtn.querySelector('span').textContent = 'Processing...';
        summarizeBtn.querySelector('i').style.display = 'none';
        summaryResult.innerHTML = '<p class="placeholder-text">AI is thinking...</p>';
        showStatus('Summarizing...', 'warn');

        try {
            const response = await fetch('/predict', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ data: text })
            });

            const result = await response.json();

            if (result.summary) {
                summaryResult.innerHTML = `<p>${result.summary}</p>`;
                showStatus('Success!', 'success');
            } else if (result.error) {
                summaryResult.innerHTML = `<p class="error-text">Error: ${result.error}</p>`;
                showStatus('Failed', 'error');
            }
        } catch (error) {
            console.error('Error:', error);
            summaryResult.innerHTML = '<p class="error-text">Connection error. Is the server running?</p>';
            showStatus('Connection Error', 'error');
        } finally {
            summarizeBtn.disabled = false;
            loader.style.display = 'none';
            summarizeBtn.querySelector('span').textContent = 'Summarize';
            summarizeBtn.querySelector('i').style.display = 'block';
        }
    });

    // Clear Button
    clearBtn.addEventListener('click', () => {
        sourceText.value = '';
        charCount.textContent = '0 characters';
        summaryResult.innerHTML = '<p class="placeholder-text">Your summary will appear here...</p>';
        showStatus('Ready', 'success');
    });

    // Copy Button
    copyBtn.addEventListener('click', () => {
        const text = summaryResult.textContent;
        if (text && !text.includes('will appear here')) {
            navigator.clipboard.writeText(text);
            const originalIcon = copyBtn.innerHTML;
            copyBtn.innerHTML = '<i class="fas fa-check"></i>';
            setTimeout(() => {
                copyBtn.innerHTML = originalIcon;
            }, 2000);
        }
    });

    // Train Button
    trainBtn.addEventListener('click', async (e) => {
        e.preventDefault();
        if (confirm('Are you sure you want to trigger training? This may take a while.')) {
            showStatus('Training started...', 'warn');
            try {
                const response = await fetch('/train', { method: 'GET' });
                const text = await response.text();
                alert(text);
                showStatus('Ready', 'success');
            } catch (error) {
                alert('Training failed to trigger.');
                showStatus('Training Error', 'error');
            }
        }
    });

    function showStatus(msg, type) {
        status.textContent = msg;
        if (type === 'error') {
            status.style.color = '#ef4444';
            status.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${msg}`;
        } else if (type === 'warn') {
            status.style.color = '#f59e0b';
            status.innerHTML = `<i class="fas fa-spinner fa-spin"></i> ${msg}`;
        } else {
            status.style.color = '#10b981';
            status.innerHTML = `<i class="fas fa-check-circle"></i> ${msg}`;
        }
    }
});
