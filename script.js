document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM loaded, initializing mobile menu...");
    
    // Mobile menu toggle functionality
    const mobileToggle = document.querySelector(".mobile-menu-toggle");
    const navLinks = document.querySelector(".nav-links");
    
    console.log("Mobile toggle element:", mobileToggle);
    console.log("Nav links element:", navLinks);
    
    if (mobileToggle && navLinks) {
        console.log("Mobile menu elements found, adding event listeners...");
        
        mobileToggle.addEventListener("click", function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            console.log("Mobile toggle clicked!");
            console.log("Nav links classes before:", navLinks.className);
            console.log("Mobile toggle classes before:", mobileToggle.className);
            
            navLinks.classList.toggle("active");
            mobileToggle.classList.toggle("active");
            
            console.log("Nav links classes after:", navLinks.className);
            console.log("Mobile toggle classes after:", mobileToggle.className);
        });
        
        // Close mobile menu when clicking on a link
        const navLinkItems = document.querySelectorAll(".nav-links a");
        navLinkItems.forEach(link => {
            link.addEventListener("click", function() {
                console.log("Nav link clicked, closing menu");
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
    } else {
        console.error("Mobile menu elements not found!");
        console.error("mobileToggle:", mobileToggle);
        console.error("navLinks:", navLinks);
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
