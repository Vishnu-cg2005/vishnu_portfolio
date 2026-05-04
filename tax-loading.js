// TAX CALCULATOR LOADING SCREEN
function triggerTaxLoading() {
    const overlay = document.getElementById('tax-loading-overlay');
    const title = overlay.querySelector('.loading-title');
    const subtext = document.getElementById('tax-loading-subtext');
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
        "Initializing Java Engine...",
        "Loading Tax Modules...",
        "Configuring Slabs...",
        "Starting Console Session..."
    ];
    let msgIdx = 0;
    const msgInterval = setInterval(() => {
        msgIdx = (msgIdx + 1) % messages.length;
        subtext.innerHTML = messages[msgIdx] + '<span class="cursor-blink">_</span>';
    }, 600);

    // Trigger merge effect
    setTimeout(() => {
        title.classList.add('merge');
    }, 1200);

    // Redirect to next page after animation
    setTimeout(() => {
        clearInterval(msgInterval);
        window.location.href = 'tax.html';
    }, 2800);
}
