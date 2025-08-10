// Mobile Menu Toggle
const mobileMenuButton = document.getElementById('mobileMenuButton');
const mobileMenu = document.getElementById('mobileMenu');
const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');

const toggleMenu = () => {
    mobileMenu.classList.toggle('is-open');
    mobileMenuOverlay.classList.toggle('is-open');
    const icon = mobileMenuButton.querySelector('i');
    if (mobileMenu.classList.contains('is-open')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
};

mobileMenuButton.addEventListener('click', toggleMenu);
mobileMenuOverlay.addEventListener('click', toggleMenu);


// Mobile Dropdown Toggle
const mobileDropdowns = document.querySelectorAll('.mobile-dropdown > button');
mobileDropdowns.forEach(button => {
    button.addEventListener('click', () => {
        const dropdownMenu = button.nextElementSibling;
        dropdownMenu.classList.toggle('hidden');
        const icon = button.querySelector('i');
        icon.classList.toggle('fa-chevron-down');
        icon.classList.toggle('fa-chevron-up');
    });
});

// Close mobile menu when a link is clicked
const mobileMenuLinks = mobileMenu.querySelectorAll('a[href^="#"]');
mobileMenuLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (mobileMenu.classList.contains('is-open')) {
            toggleMenu();
        }
    });
});


// Smooth Scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        // Only prevent default for actual internal links, not for "#" or empty href
        if (href && href !== "#" && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Scroll Reveal Animation
const scrollElements = document.querySelectorAll('.scroll-reveal');
const elementInView = (el, dividend = 1) => {
    const elementTop = el.getBoundingClientRect().top;
    return (
        elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend
    );
};
const displayScrollElement = (element) => {
    element.classList.add('visible');
};
const handleScrollAnimation = () => {
    scrollElements.forEach((el) => {
        if (elementInView(el, 1.05)) { // Adjust the divisor for when the animation triggers
            displayScrollElement(el);
        }
    });
};
window.addEventListener('scroll', () => {
    handleScrollAnimation();
});

// Trigger animation for elements already in view on load & Set Current Year
document.addEventListener('DOMContentLoaded', () => {
    handleScrollAnimation();
    document.getElementById('currentYear').textContent = new Date().toLocaleDateString('bn-BD', { year: 'numeric' }); // Bengali year
});


// Scroll to Top Button
const scrollToTopBtn = document.getElementById('scrollToTopBtn');
window.onscroll = function () {
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        scrollToTopBtn.classList.remove('hidden');
        scrollToTopBtn.classList.add('opacity-100');
    } else {
        scrollToTopBtn.classList.add('hidden');
        scrollToTopBtn.classList.remove('opacity-100');
    }
};
scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Gallery Lightbox
document.addEventListener('DOMContentLoaded', () => {
    const galleryImages = document.querySelectorAll('#gallery img');
    if (galleryImages.length > 0) {
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightbox-img');
        const lightboxCaption = document.getElementById('lightbox-caption');
        const lightboxClose = document.getElementById('lightbox-close');
        const lightboxPrev = document.getElementById('lightbox-prev');
        const lightboxNext = document.getElementById('lightbox-next');

        let currentIndex = 0;
        const images = Array.from(galleryImages).map(img => ({
            src: img.src.replace('/400x300/', '/1200x900/'), // Get higher resolution image
            alt: img.alt
        }));

        const showImage = (index) => {
            if (index < 0 || index >= images.length) return;
            const image = images[index];
            lightboxImg.src = image.src;
            lightboxCaption.textContent = image.alt;
            currentIndex = index;
            lightbox.classList.remove('hidden');
        };

        galleryImages.forEach((img, index) => {
            img.style.cursor = 'pointer';
            img.addEventListener('click', () => {
                showImage(index);
            });
        });

        const closeLightbox = () => {
            lightbox.classList.add('hidden');
        };

        const showNextImage = () => {
            const nextIndex = (currentIndex + 1) % images.length;
            showImage(nextIndex);
        };

        const showPrevImage = () => {
            const prevIndex = (currentIndex - 1 + images.length) % images.length;
            showImage(prevIndex);
        };

        lightboxClose.addEventListener('click', closeLightbox);
        lightboxNext.addEventListener('click', showNextImage);
        lightboxPrev.addEventListener('click', showPrevImage);

        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (!lightbox.classList.contains('hidden')) {
                if (e.key === 'Escape') closeLightbox();
                if (e.key === 'ArrowRight') showNextImage();
                if (e.key === 'ArrowLeft') showPrevImage();
            }
        });
    }
});
