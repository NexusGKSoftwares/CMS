// assets/js/edit_post.js

// Get the post ID from the URL query parameters
const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get('id');  // Get the ID from the URL

// Function to fetch the post data and pre-fill the form
async function fetchPostData() {
    try {
        const response = await fetch(`http://localhost:5000/posts/${postId}`);
        const post = await response.json();

        // Pre-fill the form with the current post data
        document.getElementById('title').value = post.title;
        document.getElementById('content').value = post.content;
        document.getElementById('image').value = post.image;
    } catch (error) {
        console.error('Error fetching post data:', error);
    }
}

// Function to handle form submission
async function handleFormSubmit(event) {
    event.preventDefault(); // Prevent the default form submission

    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
    const image = document.getElementById('image').value;

    try {
        const response = await fetch(`http://localhost:5000/posts/edit/${postId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, content, image }),
        });

        const data = await response.json();
        alert('Post updated successfully!');
        window.location.href = 'dashboard.html'; // Redirect to the dashboard
    } catch (error) {
        console.error('Error updating post:', error);
        alert('Failed to update the post.');
    }
}

// Call the fetchPostData function when the page loads
document.addEventListener('DOMContentLoaded', fetchPostData);

// Attach the form submit handler
document.getElementById('edit-post-form').addEventListener('submit', handleFormSubmit);