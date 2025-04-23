document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search');
    const categoryCards = document.querySelectorAll('.category-card');
    const heroContainer = document.querySelector('.hero .container');
    const searchResultsContainer = document.createElement('div');
    searchResultsContainer.style.marginTop = '10px';
    searchResultsContainer.style.display = 'none';
    heroContainer.appendChild(searchResultsContainer);

    fetch('data.json')
        .then(response => response.json())
        .then(websiteContent => {
            searchInput.addEventListener('input', function () {
                const query = this.value.toLowerCase();

                categoryCards.forEach(card => {
                    card.style.display = card.textContent.toLowerCase().includes(query) ? 'block' : 'none';
                });

                searchResultsContainer.innerHTML = '';
                searchResultsContainer.style.display = 'none';
                const results = websiteContent.filter(item =>
                    item.title.toLowerCase().includes(query) ||
                    item.content.toLowerCase().includes(query)
                );

                if (results.length > 0) {
                    searchResultsContainer.style.display = 'block';
                    const resultsList = document.createElement('ul');
                    results.forEach(result => {
                        const listItem = document.createElement('li');
                        const link = document.createElement('a');
                        link.href = result.url;
                        link.textContent = result.title;
                        listItem.appendChild(link);
                        resultsList.appendChild(listItem);
                    });
                    searchResultsContainer.appendChild(resultsList);
                } else {
                    const categoryCardVisible = Array.from(categoryCards).some(card => card.style.display === 'block');
                    if (!categoryCardVisible) {
                        searchResultsContainer.style.display = 'block';
                        searchResultsContainer.textContent = 'Ничего не найдено.';
                    }
                }
            });
        })
        .catch(error => {
            console.error("Error fetching article data:", error);
            searchResultsContainer.style.display = 'block';
            searchResultsContainer.textContent = 'Ошибка загрузки данных поиска.';
        });
});