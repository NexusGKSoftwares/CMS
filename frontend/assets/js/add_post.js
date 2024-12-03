// assets/js/add_post.js

// Function to handle form submission
async function handleFormSubmit(event) {
    event.preventDefault(); // Prevent the default form submission

    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
    const image = document.getElementById('image').value;

    // Send the post data to the backend
    try {
        const response = await fetch('http://localhost:5000/posts/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, content, image }),
        });

        const data = await response.json();

        // Check if the post was successfully added
        if (data.message === 'Post added successfully') {
            alert('Post added successfully!');
            window.location.href = 'dashboard.html'; // Redirect to the dashboard
        } else {
            alert('Failed to add the post.');
        }
    } catch (error) {
        console.error('Error adding post:', error);
        alert('Failed to add the post.');
    }
}

// Attach the form submit handler
document.getElementById('add-post-form').addEventListener('submit', handleFormSubmit);
