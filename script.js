const searchInput = document.getElementById("search");
const cards = document.querySelectorAll(".card");
const modal = document.getElementById("placeModal");
const closeBtn = document.querySelector(".close");
const modalImage = document.getElementById("modalImage");
const modalTitle = document.getElementById("modalTitle");
const modalHistory = document.getElementById("modalHistory");

// Store all places data
const placesData = {};
cards.forEach(card => {
    const slug = card.getAttribute("data-slug");
    placesData[slug] = {
        place: card.getAttribute("data-place"),
        image: card.getAttribute("data-image"),
        history: card.getAttribute("data-history")
    };
});

// Search functionality
searchInput.addEventListener("keyup", () => {
    const value = searchInput.value.toLowerCase();

    cards.forEach(card => {
        const text = card.innerText.toLowerCase();
        card.style.display = text.includes(value) ? "block" : "none";
    });
});

// Open modal with place data
function openModal(slug) {
    const data = placesData[slug];
    if (data) {
        modalTitle.textContent = data.place;
        modalImage.src = data.image;
        modalHistory.textContent = data.history;
        modal.classList.add("show");
        // Update URL
        window.location.hash = `#/place/${slug}`;
    }
}

// Modal functionality - Open modal on card click
cards.forEach(card => {
    card.addEventListener("click", (e) => {
        // Don't open modal if clicking on the map link
        if (e.target.tagName === "A") return;
        
        const slug = card.getAttribute("data-slug");
        openModal(slug);
    });
});

// Close modal when close button is clicked
closeBtn.addEventListener("click", () => {
    modal.classList.remove("show");
    window.location.hash = "#/";
});

// Close modal when clicking outside the modal content
window.addEventListener("click", (event) => {
    if (event.target === modal) {
        modal.classList.remove("show");
        window.location.hash = "#/";
    }
});

// Close modal with Escape key
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal.classList.contains("show")) {
        modal.classList.remove("show");
        window.location.hash = "#/";
    }
});

// Handle URL routing
function handleRoute() {
    const hash = window.location.hash.slice(1); // Remove #
    
    if (hash.startsWith("/place/")) {
        const slug = hash.replace("/place/", "");
        if (placesData[slug]) {
            openModal(slug);
        }
    } else {
        modal.classList.remove("show");
    }
}

// Listen for hash changes (browser back/forward buttons)
window.addEventListener("hashchange", handleRoute);

// Handle initial route on page load
window.addEventListener("load", handleRoute);
