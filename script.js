document.addEventListener("DOMContentLoaded", function() {
    // Mobile menu toggle functionality
    const mobileToggle = document.querySelector(".mobile-menu-toggle");
    const navLinks = document.querySelector(".nav-links");
    
    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener("click", function() {
            navLinks.classList.toggle("active");
            mobileToggle.classList.toggle("active");
        });
        
        // Close mobile menu when clicking on a link
        const navLinkItems = document.querySelectorAll(".nav-links a");
        navLinkItems.forEach(link => {
            link.addEventListener("click", function() {
                navLinks.classList.remove("active");
                mobileToggle.classList.remove("active");
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener("click", function(event) {
            if (!mobileToggle.contains(event.target) && !navLinks.contains(event.target)) {
                navLinks.classList.remove("active");
                mobileToggle.classList.remove("active");
            }
        });
    }
    
    // Card hover animations
    const cards = document.querySelectorAll(".theme-card, .quote-card, .overview-card");
    cards.forEach(card => {
        card.addEventListener("mouseenter", function() {
            this.style.transform = "translateY(-10px)";
        });
        
        card.addEventListener("mouseleave", function() {
            this.style.transform = "translateY(0)";
        });
    });
});
