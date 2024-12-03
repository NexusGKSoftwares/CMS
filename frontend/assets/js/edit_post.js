// assets/js/edit_post.js

// Get the post ID from the URL query parameters
const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get('id'); // Get the ID from the URL

// Function to fetch the post data and pre-fill the form
async function fetchPostData() {
    try {
        // Fetch the post details from the backend
        const response = await fetch(`http://localhost:5000/posts/${postId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch post data');
        }

        const post = await response.json();

        // Pre-fill the form fields with the fetched post data
        document.getElementById('title').value = post.title;
        document.getElementById('slug').value = post.slug;
        document.getElementById('content').value = post.content;
        document.getElementById('image').value = post.image;
    } catch (error) {
        console.error('Error fetching post data:', error);
        alert('Failed to load post data for editing.');
    }
}

// Function to handle form submission for updating the post
async function handleFormSubmit(event) {
    event.preventDefault(); // Prevent default form submission

    const title = document.getElementById('title').value;
    const slug = document.getElementById('slug').value;
    const content = document.getElementById('content').value;
    const image = document.getElementById('image').value;

    try {
        // Send the updated post data to the backend
        const response = await fetch(`http://localhost:5000/posts/edit/${postId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, slug, content, image }),
        });

        const data = await response.json();

        if (data.message === 'Post updated successfully') {
            alert('Post updated successfully!');
            window.location.href = 'dashboard.html'; // Redirect to the dashboard
        } else {
            alert('Failed to update the post.');
        }
    } catch (error) {
        console.error('Error updating post:', error);
        alert('Failed to update the post.');
    }
}

// Fetch the post data when the page loads
document.addEventListener('DOMContentLoaded', fetchPostData);

// Attach the form submit handler
document.getElementById('edit-post-form').addEventListener('submit', handleFormSubmit);
