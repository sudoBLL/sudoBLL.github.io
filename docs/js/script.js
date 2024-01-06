document.addEventListener('DOMContentLoaded', function () {

    const categorySelect = document.querySelector('select[id="category"]');
    categorySelect.addEventListener('change', updateFilterOptions);

    function updateFilterOptions() {
        const selectedCategory = categorySelect.value;
        const filterSelect = document.querySelector('.filter');
        filterSelect.innerHTML = '';

        if (selectedCategory !== 'Site Seçiniz') {
            // data.json dosyasını fetch ile oku
            fetch('data/data.json')
                .then(response => response.json())
                .then(jsonData => {
                    const filteredPerson = jsonData.find(person => person.firstName === selectedCategory);

                    if (filteredPerson) {

                        (filteredPerson.hobbies.map(hobby => hobby)).forEach(option => {
                            const newOption = document.createElement('option');
                            newOption.text = option;
                            filterSelect.add(newOption);
                        });
                    }
                })
                .catch(error => console.error('Data fetch error:', error));
        }
    }
});
