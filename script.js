document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("buttons-container");

    fetch("./config.json")
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to load config.json: ${response.status} ${response.statusText}`);
            }
            return response.json();
        })
        .then(config => {
            // Ustawianie tytułu strony
            document.getElementById("page-title").textContent = config.pageTitle;

            // Ustawianie nagłówka
            document.getElementById("header-title").textContent = config.headerTitle;
            document.getElementById("header-description").textContent = config.headerDescription;

            // Ustawianie opisu kontaktu
            document.getElementById("contact-description").textContent = config.contactDescription;

            // Ustawianie tekstu stopki
            document.getElementById("footer-text").textContent = config.footerText;

            // Grupowanie linków według kategorii
            const categories = {};
            config.links.forEach(link => {
                if (!categories[link.category]) {
                    categories[link.category] = [];
                }
                categories[link.category].push(link);
            });

            // Tworzenie sekcji dla każdej kategorii
            Object.keys(categories).forEach(category => {
                const categorySection = document.createElement("div");
                categorySection.classList.add("category-section");

                const categoryTitle = document.createElement("h3");
                categoryTitle.textContent = category;
                categorySection.appendChild(categoryTitle);

                const categoryLinks = document.createElement("div");
                categoryLinks.classList.add("category-links");

                categories[category].forEach(link => {
                    const button = document.createElement("button");
                    button.textContent = link.name;
                    button.onclick = () => window.open(link.url, "_blank");
                    categoryLinks.appendChild(button);
                });

                categorySection.appendChild(categoryLinks);
                container.appendChild(categorySection);
            });
        })
        .catch(error => {
            console.error("Error loading config:", error);
            container.innerHTML = `
                <p class="error-message">
                    Nie udało się załadować konfiguracji. Szczegóły błędu: ${error.message}
                </p>`;
        });
});
