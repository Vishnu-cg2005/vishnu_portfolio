// EXPERIENCES LOADING SCREEN
function triggerExperiencesLoading() {
    const overlay = document.getElementById('experiences-loading-overlay');
    const title = overlay.querySelector('.loading-title');
    const subtext = document.getElementById('experiences-loading-subtext');
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
        "Fetching Professional Journey...",
        "Loading Internships...",
        "Compiling Work Experience...",
        "Formatting Timeline..."
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
        window.location.href = 'experiences.html';
    }, 2800);
}
