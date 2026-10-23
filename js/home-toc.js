// Floating table of contents for the home page: highlights the section in view
const toc = document.querySelector('.home-toc');
const links = [...toc.querySelectorAll('.home-toc-list a')];
const currentLabel = document.getElementById('homeTocCurrent');
const toggle = toc.querySelector('.home-toc-current');
const pane = document.querySelector('.home-content');
const sections = links.map(a => document.querySelector(a.getAttribute('href')));

function setActive(index) {
    links.forEach((a, i) => {
        if (i === index) a.setAttribute('aria-current', 'location');
        else a.removeAttribute('aria-current');
    });
    currentLabel.textContent = links[index].textContent;
}

// The active section is the last one whose top has passed the reading line
function update() {
    const line = window.innerHeight * 0.4;
    let index = 0;
    sections.forEach((s, i) => {
        if (s.getBoundingClientRect().top <= line) index = i;
    });
    // Short last sections never reach the line, so pin to the end of the scroll area
    const paneScrolls = getComputedStyle(pane).overflowY === 'auto';
    const atEnd = paneScrolls
        ? pane.scrollTop + pane.clientHeight >= pane.scrollHeight - 2
        : window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
    if (atEnd) {
        index = sections.length - 1;
    }
    setActive(index);
}

let queued = false;
const onScroll = () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => { queued = false; update(); });
};
window.addEventListener('scroll', onScroll, { passive: true });
pane.addEventListener('scroll', onScroll, { passive: true });
window.addEventListener('resize', update);

// Narrow screens: the current-section bar opens the list
toggle.addEventListener('click', () => {
    const open = toc.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open);
});
links.forEach(a => a.addEventListener('click', () => {
    toc.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
}));

update();
