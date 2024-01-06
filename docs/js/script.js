document.addEventListener('DOMContentLoaded', function () {

    const categorySelect = document.querySelector('select[id="category"]');
    categorySelect.addEventListener('change', updateFilterOptions);

    function updateFilterOptions() {
        const selectedCategory = categorySelect.value;
        const filterSelect = document.querySelector('.filter');
        filterSelect.innerHTML = '';

        if (selectedCategory !== 'Site Seçiniz') {
            const filterOptions = [
                selectedCategory + '_1',
                selectedCategory + '_2'
            ];

            filterOptions.forEach(option => {
                const newOption = document.createElement('option');
                newOption.text = option;
                filterSelect.add(newOption);
            });
        }
    }
});
