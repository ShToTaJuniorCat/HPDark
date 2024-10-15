$(document).ready(function() {
    // Load the JSON file
    $.getJSON('colors.json', function(data) {
        const colorContainer = $('.colorContainer');

        // Iterate through each color category
        data.forEach(category => {
            for (const categoryName in category) {
                // Create a section for each category
                const section = $('<div></div>');
                section.append(`<h1>${categoryName}</h2>`);

                // Iterate through colors in the category
                category[categoryName].forEach(color => {
                    // Create a span for each color
                    const colorItem = $(`<span>${color} - █████████████ </span>`);
                    colorItem.css('color', color); // Set text color
                    colorItem.css('display', 'block'); // Each color on a new line
                    colorItem.css('font-weight', 'bold');
                    colorItem.css('font-size', '20px');
                    section.append(colorItem);
                    section.append("<br>");
                });

                // Append the section to the color container
                colorContainer.append(section);
            }
        });
    }).fail(function() {
        $('<div></div>').append(`<h2>Oops, an error occoured. Please refresh. If this error persists, please contact the developer.</h2>`);
        console.error('Error loading colors.json');
    });
});