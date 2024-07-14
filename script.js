document.addEventListener('DOMContentLoaded', function() {
    const stations = document.querySelectorAll('.stations div');
    const contentDiv = document.getElementById('popup-content');
    const popup = document.getElementById('popup');
    const closeBtn = document.getElementById('close-btn');

    stations.forEach(station => {
        station.addEventListener('click', () => {
            popup.classList.add('active');
            const stationId = station.id;
            const hypertextFile = `TextFiles/Hyperlinks/${stationId}.txt`;
            const embedFile = `TextFiles/EmbedLinks/${stationId}.txt`;
            const namesFile = `TextFiles/Names/${stationId}.txt`;

            Promise.all([
                fetch(hypertextFile).then(response => response.text()),
                fetch(embedFile).then(response => response.text()),
                fetch(namesFile).then(response => response.text())
            ])
            .then(([hyperlinks, embeds, names]) => {
                const hyperLinksArray = hyperlinks.trim().split('\n');
                const embedLinksArray = embeds.trim().split('\n');
                const nameTextArray = names.trim().split('\n');

                let content = '';
                hyperLinksArray.forEach((link, index) => {
                    const nameText = nameTextArray[index] || '';
                    content += `<p>${nameText}</p>`;
                    content += `<a href="${link}" target="_blank">Know more</a><br>`;
                    if (embedLinksArray[index]) {
                        content += `${embedLinksArray[index]}<br>`;
                    }
                });
                contentDiv.innerHTML = content;
            })
            .catch(error => {
                contentDiv.textContent = 'Error loading content.';
                console.error('Error:', error);
            });
        });
    });

    closeBtn.addEventListener('click', () => {
        popup.classList.remove('active');
    });
});
