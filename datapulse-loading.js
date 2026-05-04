// DATAPULSE LOADING SCREEN
function triggerDatapulseLoading() {
    const overlay = document.getElementById('datapulse-loading-overlay');
    const title = overlay.querySelector('.loading-title');
    const subtext = document.getElementById('dp-loading-subtext');
    const progressBar = overlay.querySelector('.loading-progress-bar');
    const progress = overlay.querySelector('.loading-progress');

    // Prevent scrolling
    document.body.style.overflow = 'hidden';

    // Show overlay
    overlay.classList.add('active');

    // Start animations
    setTimeout(() => {
        title.classList.add('animate');
        subtext.classList.add('animate');
        progressBar.classList.add('animate');
        progress.classList.add('animate');
    }, 100);

    // Cycle text messages
    const messages = [
        "Initializing Engine...",
        "Parsing Log Files...",
        "Analyzing Patterns...",
        "Generating Insights..."
    ];
    let msgIdx = 0;
    const msgInterval = setInterval(() => {
        msgIdx = (msgIdx + 1) % messages.length;
        subtext.innerHTML = messages[msgIdx] + '<span class="cursor-blink">_</span>';
    }, 500);

    // Trigger merge effect
    setTimeout(() => {
        title.classList.add('merge');
    }, 1500);

    // Redirect to next page after animation
    setTimeout(() => {
        clearInterval(msgInterval);
        window.location.href = 'datapulse.html';
    }, 2800);
}
