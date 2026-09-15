(async function () {
    const track = document.getElementById('carouselTrack');
    const dotsContainer = document.getElementById('carouselDots');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');

    let items = [];
    let current = 0;

    async function loadItems() {
        const listRes = await fetch('../carousel/carousel-list.json');
        const { items: ids } = await listRes.json();

        for (const id of ids) {
            try {
                const res = await fetch(`../carousel/${id}.js`);
                if (!res.ok) continue;
                const src = await res.text();
                const getData = new Function(`${src}; return typeof carouselItem !== 'undefined' ? carouselItem : null;`);
                const data = getData();
                if (data) items.push(data);
            } catch (e) { /* skip broken files */ }
        }
    }

    function isVideo(src) {
        return /\.(mov|mp4|webm|ogg)$/i.test(src);
    }

    function mediaElement(src, title, position) {
        const posStyle = position ? ` style="object-position: ${position};"` : '';
        if (!src) return '<div class="carousel-card-image-placeholder"></div>';
        if (isVideo(src)) {
            return `<video src="../${src}" autoplay muted loop playsinline preload="auto"${posStyle}></video>`;
        }
        return `<img src="../${src}" alt="${title}"${posStyle}>`;
    }

    function buildCards() {
        track.innerHTML = '';
        dotsContainer.innerHTML = '';

        items.forEach((p, i) => {
            const card = document.createElement('div');
            card.className = 'carousel-card' + (i === 0 ? ' active' : '');
            card.innerHTML = `
                <div class="carousel-card-image">
                    ${mediaElement(p.image, p.title, p.mediaPosition)}
                    ${p.date ? `<span class="carousel-card-date">${p.date}</span>` : ''}
                </div>
                <div class="carousel-card-body">
                    <h3 class="carousel-card-title">${p.title}</h3>
                    <p class="carousel-card-preview">${p.description || ''}</p>
                    ${p.link ? `<a href="${p.link}" target="_blank" class="carousel-card-link">${p.linkText || 'View Project'}</a>` : ''}
                </div>
            `;
            track.appendChild(card);

            const dot = document.createElement('button');
            dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
            dot.setAttribute('aria-label', `Go to project ${i + 1}`);
            dot.addEventListener('click', () => goTo(i));
            dotsContainer.appendChild(dot);
        });
    }

    function goTo(index) {
        const cards = track.querySelectorAll('.carousel-card');
        const dots = dotsContainer.querySelectorAll('.carousel-dot');

        cards[current].classList.remove('active');
        dots[current].classList.remove('active');

        current = (index + items.length) % items.length;

        cards[current].classList.add('active');
        dots[current].classList.add('active');
    }

    function setupScrollPlay() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const video = entry.target.querySelector('video');
                if (!video) return;
                if (entry.isIntersecting) {
                    video.play();
                } else {
                    video.pause();
                }
            });
        }, { threshold: 0.3 });

        track.querySelectorAll('.carousel-card').forEach(card => observer.observe(card));
    }

    prevBtn.addEventListener('click', () => goTo(current - 1));
    nextBtn.addEventListener('click', () => goTo(current + 1));

    await loadItems();
    if (items.length > 0) {
        buildCards();
        setupScrollPlay();
    }
})();
