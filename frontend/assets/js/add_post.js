// assets/js/add_post.js

// Function to generate a slug from the title
function generateSlug(title) {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '') // Remove invalid characters
        .replace(/\s+/g, '-')         // Replace spaces with dashes
        .trim();
}

// Function to handle form submission
async function handleFormSubmit(event) {
    event.preventDefault(); // Prevent default form submission

    const title = document.getElementById('title').value;
    const slugInput = document.getElementById('slug').value;
    const content = document.getElementById('content').value;
    const image = document.getElementById('image').value;

    // Use the provided slug or generate one from the title
    const slug = slugInput.trim() || generateSlug(title);

    try {
        const response = await fetch('http://localhost:5000/posts/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, slug, content, image }),
        });

        const data = await response.json();

        // Handle success or failure
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
