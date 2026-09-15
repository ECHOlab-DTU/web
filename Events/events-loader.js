(async function () {
    const lightbox = document.getElementById('eventsLightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxPdf = document.getElementById('lightboxPdf');
    const lightboxClose = document.getElementById('lightboxClose');

    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    function closeLightbox() {
        lightbox.classList.remove('active');
        lightboxPdf.src = '';
        lightboxImg.src = '';
    }

    function isPDF(src) {
        return /\.pdf$/i.test(src);
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
        const res = await fetch('../Events/events-page.json');
        const data = await res.json();
        renderGrid(data.upcoming, document.getElementById('upcomingGrid'), '../');
        renderGrid(data.past,     document.getElementById('pastGrid'),     '../');
    } catch (e) {
        console.error('Failed to load events:', e);
    }
})();
