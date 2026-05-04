// RESUME LOADING SCREEN
function triggerResumeLoading() {
    const overlay = document.getElementById('resume-loading-overlay');
    const title = overlay.querySelector('.loading-title');
    const subtext = document.getElementById('resume-loading-subtext');
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
        "Decrypting CV...",
        "Formatting Portfolio PDF...",
        "Optimizing Document Structure...",
        "Syncing Professional Credentials..."
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

    // Redirect to PDF after animation
    setTimeout(() => {
        clearInterval(msgInterval);
        // We use window.location.href to open in same tab, 
        // or window.open if user prefers new tab (but timeout redirects are usually same tab).
        // For PDF viewing, same tab is often fine as the user can just go back.
        window.location.href = 'Vishnu_CG_Resume_v2.pdf';
        
        // Cleanup overlay for when they come back
        setTimeout(() => {
            overlay.classList.remove('active');
            document.body.style.overflow = '';
            title.classList.remove('animate', 'merge');
            subtext.classList.remove('animate');
            progressBar.classList.remove('animate');
            progress.classList.remove('animate');
        }, 1000);
    }, 2800);
}
