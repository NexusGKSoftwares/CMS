// assets/js/add_post.js

async function handleFormSubmit(event) {
    event.preventDefault(); // Prevent default form submission

    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
    const image = document.getElementById('image').value;

    try {
        const response = await fetch('http://localhost:5000/posts/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, content, image }), // Send data as JSON
        });

        if (response.ok) {
            const data = await response.json();
            alert('Post added successfully!');
            window.location.href = 'dashboard.html'; // Redirect to dashboard
        } else {
            const errorData = await response.json();
            console.error('Error adding post:', errorData);
            alert('Failed to add the post.');
        }
    } catch (error) {
        console.error('Error adding post:', error);
        alert('An error occurred. Please try again.');
    }
}

document.getElementById('add-post-form').addEventListener('submit', handleFormSubmit);
