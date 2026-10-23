(async function () {
    const lightbox = document.getElementById('eventsLightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxPdf = document.getElementById('lightboxPdf');
    const lightboxClose = document.getElementById('lightboxClose');

    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeLightbox();
    });

    function closeLightbox() {
        lightbox.classList.remove('active', 'is-pdf');
        lightboxPdf.src = '';
        lightboxImg.src = '';
    }

    function isPDF(src) {
        return /\.pdf$/i.test(src);
    }

    // "DD.MM.YYYY" -> Date (local midnight)
    function parseDate(str) {
        const [day, month, year] = str.split('.').map(Number);
        return new Date(year, month - 1, day);
    }

    function renderGrid(events, gridEl, basePath) {
        if (!events || events.length === 0) {
            gridEl.innerHTML = '<p class="events-empty">No events yet.</p>';
            return;
        }
        events.forEach(ev => {
            const src = basePath + ev.image;
            const card = document.createElement('div');
            card.className = 'event-card';

            if (isPDF(ev.image)) {
                card.innerHTML = `
                    <div class="event-card-media is-pdf">
                        ${ev.date ? `<span class="event-card-date">${ev.date}</span>` : ''}
                        <div class="event-card-pdf-placeholder">
                            <span class="event-card-pdf-icon">PDF</span>
                            <span class="event-card-pdf-label">${ev.title}</span>
                        </div>
                    </div>
                    <div class="event-card-caption">${ev.title}</div>
                `;
                card.querySelector('.event-card-media').addEventListener('click', () => {
                    lightboxPdf.src = src + '#toolbar=0';
                    lightboxImg.src = '';
                    lightbox.classList.add('active', 'is-pdf');
                });
            } else {
                card.innerHTML = `
                    <div class="event-card-media">
                        <img src="${src}" alt="${ev.title}">
                        ${ev.date ? `<span class="event-card-date">${ev.date}</span>` : ''}
                    </div>
                    <div class="event-card-caption">${ev.title}</div>
                `;
                card.querySelector('img').addEventListener('click', () => {
                    lightboxImg.src = src;
                    lightboxPdf.src = '';
                    lightbox.classList.remove('is-pdf');
                    lightbox.classList.add('active');
                });
            }

            gridEl.appendChild(card);
        });
    }

    try {
        const res = await fetch('events.json');
        if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
        const { events } = await res.json();

        // Events move from "upcoming" to "past" automatically the day after they happen
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const sorted = [...events].sort((a, b) => parseDate(a.date) - parseDate(b.date));
        const upcoming = sorted.filter(ev => parseDate(ev.date) >= today);
        const past = sorted.filter(ev => parseDate(ev.date) < today).reverse();

        renderGrid(upcoming, document.getElementById('upcomingGrid'), '../');
        renderGrid(past,     document.getElementById('pastGrid'),     '../');
    } catch (e) {
        console.error('Failed to load events:', e);
    }
})();
