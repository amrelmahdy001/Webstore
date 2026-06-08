/**
 * Hero Section Dynamic Behavior
 * ----------------------------
 * Handles:
 * 1. Dynamic word switching with Float Up animation.
 * 2. 3D card rotation (1080 deg) on word change.
 * 3. Icon updates based on the current word category.
 * 4. 3D Tilt effect on cards hover.
 */

document.addEventListener('DOMContentLoaded', () => {
    const dynamicWord = document.getElementById('dynamic-word');
    const cards = document.querySelectorAll('.hero__card');
    const tiltContainers = document.querySelectorAll('.hero__card-tilt');
    
    const categories = [
        {
            word: 'brand',
            icons: [
                { label: 'Logo', svg: '<svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>' },
                { label: 'Style', svg: '<svg viewBox="0 0 24 24"><path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16z"/></svg>' },
                { label: 'Identity', svg: '<svg viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>' },
                { label: 'Guide', svg: '<svg viewBox="0 0 24 24"><path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 9H9V9h10v2zm-4 4H9v-2h6v2zm4-8H9V5h10v2z"/></svg>' },
                { label: 'Unique', svg: '<svg viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>' },
                { label: 'Impact', svg: '<svg viewBox="0 0 24 24"><path d="M13.5 1.5l10 10-10 10-10-10 10-10zm0 4.24l-5.76 5.76 5.76 5.76 5.76-5.76-5.76-5.76z"/></svg>' }
            ]
        },
        {
            word: 'portfolio',
            icons: [
                { label: 'Design', svg: '<svg viewBox="0 0 24 24"><path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01-.23-.26-.38-.61-.38-.99 0-.83.67-1.5 1.5-1.5H16c2.76 0 5-2.24 5-5 0-4.42-4.03-8-9-8zm-5.5 9c-.83 0-1.5-.67-1.5-1.5S5.67 9 6.5 9 8 9.67 8 10.5 7.33 12 6.5 12zm3-4C8.67 8 8 7.33 8 6.5S8.67 5 9.5 5s1.5.67 1.5 1.5S10.33 8 9.5 8zm5 0c-.83 0-1.5-.67-1.5-1.5S13.67 5 14.5 5s1.5.67 1.5 1.5S15.33 8 14.5 8zm3 4c-.83 0-1.5-.67-1.5-1.5S16.67 9 17.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/></svg>' },
                { label: 'Code', svg: '<svg viewBox="0 0 24 24"><path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/></svg>' },
                { label: 'Creative', svg: '<svg viewBox="0 0 24 24"><path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7zm2.85 11.1l-.85.6V16h-4v-2.3l-.85-.6C7.8 12.16 7 10.63 7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.63-.8 3.16-2.15 4.1z"/></svg>' },
                { label: 'Photos', svg: '<svg viewBox="0 0 24 24"><path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/></svg>' },
                { label: 'UI/UX', svg: '<svg viewBox="0 0 24 24"><path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/></svg>' },
                { label: 'Cases', svg: '<svg viewBox="0 0 24 24"><path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-8 0h-4V4h4v2z"/></svg>' }
            ]
        },
        {
            word: 'market',
            icons: [
                { label: 'Growth', svg: '<svg viewBox="0 0 24 24"><path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/></svg>' },
                { label: 'Rocket', svg: '<svg viewBox="0 0 24 24"><path d="M13.13 22.19L11.5 18.36c-2.32-.13-4.53-.94-6.39-2.32l1.27-1.27c1.46 1.05 3.14 1.66 4.93 1.75l-1.63-3.83c-.06-.15-.09-.3-.09-.46 0-.69.56-1.25 1.25-1.25h1.25c.69 0 1.25.56 1.25 1.25 0 .16-.03.31-.09.46l-1.63 3.83c1.79-.09 3.47-.7 4.93-1.75l1.27 1.27c-1.86 1.38-4.07 2.19-6.39 2.32l-1.63 3.83c-.06.15-.09.3-.09.46 0 .69.56 1.25 1.25 1.25h.14c.69 0 1.25-.56 1.25-1.25 0-.16-.03-.31-.09-.46zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>' },
                { label: 'Analysis', svg: '<svg viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/></svg>' },
                { label: 'Global', svg: '<svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>' },
                { label: 'Profit', svg: '<svg viewBox="0 0 24 24"><path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/></svg>' },
                { label: 'Social', svg: '<svg viewBox="0 0 24 24"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>' }
            ]
        }
    ];

    let currentIndex = 0;

    /**
     * Updates the content (icon and label) of all cards
     */
    function updateCardContent(categoryIndex) {
        cards.forEach((card, i) => {
            const iconData = categories[categoryIndex].icons[i];
            const iconContainer = card.querySelector('.hero__card-icon');
            const labelContainer = card.querySelector('.hero__card-label');
            
            iconContainer.innerHTML = iconData.svg;
            labelContainer.textContent = iconData.label;
        });
    }

    // Set initial content
    updateCardContent(0);

    /**
     * Handles the sequential animation of word change and card rotation
     */
    function switchWord() {
        // 1. Text Animation - Start Exit
        dynamicWord.classList.remove('hero__dynamic-word--enter');
        dynamicWord.classList.add('hero__dynamic-word--exit');

        setTimeout(() => {
            // 2. Prepare new content
            currentIndex = (currentIndex + 1) % categories.length;
            dynamicWord.textContent = categories[currentIndex].word;
            
            // 3. Text Animation - Start Enter
            dynamicWord.classList.remove('hero__dynamic-word--exit');
            dynamicWord.classList.add('hero__dynamic-word--enter');

            // 4. Trigger Card Rotation after a small delay (200ms)
            setTimeout(() => {
                cards.forEach(card => {
                    card.classList.remove('hero__card--rotating');
                    void card.offsetWidth; // Force reflow to restart animation
                    card.classList.add('hero__card--rotating');
                });

                // 5. Update Card Icons halfway through the 2s rotation (1000ms)
                setTimeout(() => {
                    updateCardContent(currentIndex);
                }, 1000);

            }, 200);

        }, 600); // Wait for exit animation to complete
    }

    // Start the word switching cycle
    setInterval(switchWord, 5000);

    /**
     * 3D Tilt Effect: Interactive movement when hovering over cards
     */
    tiltContainers.forEach(container => {
        container.addEventListener('mousemove', (e) => {
            const rect = container.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Calculate rotation degrees based on mouse position relative to center
            const rotateX = (y - centerY) / 3;
            const rotateY = (centerX - x) / 3;
            
            container.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.1)`;
        });

        container.addEventListener('mouseleave', () => {
            // Reset to original state
            container.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)`;
        });
    });
});
