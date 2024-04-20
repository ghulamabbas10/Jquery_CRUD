$(document).ready(function() {
    // Initial load of items
    loadItems();

    // Handle form submission to add new item
    $('#addItemForm').submit(function(event) {
        event.preventDefault();
        var itemName = $('#itemName').val();
        addItem(itemName);
    });

    // Function to load items
    function loadItems() {
        $.ajax({
            url: 'https://jsonplaceholder.typicode.com/posts',
            type: 'GET',
            success: function(response) {
                displayItems(response);
            },
            error: function(xhr, status, error) {
                console.error('Error loading items:', error);
            }
        });
    }

    // Function to display items
    function displayItems(items) {
        $('#itemList').empty();
        items.forEach(function(item) {
            $('#itemList').append('<div>' + item.title + ' <button class="deleteBtn" data-id="' + item.id + '">Delete</button></div>');
        });

        // Bind delete button click event
        $('.deleteBtn').click(function() {
            var itemId = $(this).data('id');
            deleteItem(itemId);
        });
    }

    // Function to add new item
    function addItem(itemName) {
        var newItem = {
            title: itemName,
            body: 'Lorem ipsum dolor sit amet',
            userId: 1 // Assuming user ID
        };

        $.ajax({
            url: 'https://jsonplaceholder.typicode.com/posts',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(newItem),
            success: function(response) {
                loadItems();
                $('#itemName').val('');
            },
            error: function(xhr, status, error) {
                console.error('Error adding item:', error);
            }
        });
    }

    // Function to delete item
    function deleteItem(itemId) {
        $.ajax({
            url: 'https://jsonplaceholder.typicode.com/posts/' + itemId,
            type: 'DELETE',
            success: function(response) {
                loadItems();
            },
            error: function(xhr, status, error) {
                console.error('Error deleting item:', error);
            }
        });
    }
});
