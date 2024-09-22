// script.js
$(document).ready(function () {
    let maxPairs = 5;

    // Add new key-value pair
    $(document).on('click', '.add-pair', function () {
        let pairCount = $('#keyValuePairs .key-value-pair').length;
        if (pairCount < maxPairs) {
            let newPair = `
                <div class="key-value-pair">
                    <input type="text" name="key[]" placeholder="Key">
                    <input type="text" name="value[]" placeholder="Value">
                    <button type="button" class="add-pair">+</button>
                    <button type="button" class="remove-pair">-</button>
                </div>`;
            $('#keyValuePairs').append(newPair);
        }
        if (pairCount + 1 >= maxPairs) {
            $('.add-pair').prop('disabled', true);
        }
    });

    // Remove key-value pair
    $(document).on('click', '.remove-pair', function () {
        $(this).closest('.key-value-pair').remove();
        let pairCount = $('#keyValuePairs .key-value-pair').length;
        if (pairCount < maxPairs) {
            $('.add-pair').prop('disabled', false);
        }
    });

    // Handle form submission
    $('#curlForm').submit(function (e) {
        e.preventDefault();
        let url = $('#url').val();
        let keys = $("input[name='key[]']").map(function () { return $(this).val(); }).get();
        let values = $("input[name='value[]']").map(function () { return $(this).val(); }).get();
        let data = {};

        for (let i = 0; i < keys.length; i++) {
            if (keys[i] !== "") {
                data[keys[i]] = values[i];
            }
        }

        $.ajax({
            url: url,
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(data),
            success: function (response) {
                $('#responseText').val(JSON.stringify(response, null, 4));
            },
            error: function (jqXHR, textStatus, errorThrown) {
                $('#responseText').val(`Error: ${textStatus}, ${errorThrown}`);
            }
        });
    });

    // Copy response to clipboard
    $('#copyButton').click(function () {
        let responseText = $('#responseText');
        responseText.select();
        document.execCommand('copy');
        alert('Response copied to clipboard!');
    });
});
