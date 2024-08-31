document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const resultsContainer = document.getElementById('resultsContainer');

    searchInput.addEventListener('input', async function() {
        const query = searchInput.value.trim();

        if (query.length > 3) {
            const results = await fetchSearchResults(query);
            displayResults(results);
        } else {
            resultsContainer.innerHTML = '';
        }
    });

    async function fetchSearchResults(query) {
        try {
            // Assuming your backend is running on localhost:3000
            const response = await fetch(`http://localhost:3000/api/search?q=${encodeURIComponent(query)}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching search results:', error);
            return [];
        }
    }

    function displayResults(results) {
        resultsContainer.innerHTML = '';

        results.forEach(item => {
            const itemCard = document.createElement('div');
            itemCard.classList.add('bg-white', 'shadow-lg', 'rounded-lg', 'p-4');

            itemCard.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="w-full h-48 object-cover mb-4 rounded-lg">
                <h2 class="text-xl font-bold mb-2">${item.name}</h2>
                <p class="text-gray-600">${item.description}</p>
                <p class="text-blue-600 font-bold mt-2">$${item.price}</p>
            `;

            resultsContainer.appendChild(itemCard);
        });
    }
});
