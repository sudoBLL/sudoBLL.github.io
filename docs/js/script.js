document.addEventListener('DOMContentLoaded', function () {

    const categorySelect = document.querySelector('select[id="category"]');
    categorySelect.addEventListener('change', updateFilterOptions);

    const exportYaml = document.querySelector('div.export_button');
    exportYaml.addEventListener('click', exportButtonClick);

    const copyButton = document.getElementById('copyButton');
    const resultParagraph = document.querySelector('.copy_output');

    copyButton.addEventListener('click', function () {
        copyToClipboard(resultParagraph.innerText);
        alert('İçerik kopyalandı!');
    });

    function copyToClipboard(text) {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
    }

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

    function exportButtonClick() {
        // search bar elemanlarını seç
        const searchInput = document.querySelector('.search_bar input[type="search"]');
        const categorySelect = document.querySelector('select[id="category"]');
        const filterSelect = document.querySelector('.filter');

        // p etiketini seç
        const resultParagraph = document.querySelector('p.copy_output');

        // p etiketini güncelle
        //resultParagraph.innerText = `Search: ${searchInput.value}\n     Category: ${categorySelect.value}\n         Filter: ${filterSelect.value}`;
        resultParagraph.innerText = `    {
            "firstName": "${searchInput.value}",
            "Category": "${categorySelect.value}",
            "age": ${filterSelect.value},
            "email": "john.doe@example.com",
                "address": {
                "street": "123 Main Street",
                "city": "Anytown",
                "zipCode": "12345"
                },
                    "hobbies": ["Reading", "Traveling", "Photography"]
          }`;


    }



});
