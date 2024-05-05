document.getElementById('comment-form').addEventListener('submit', async function(event) {
  event.preventDefault();

  const content = document.querySelector('textarea[name="content"]').value;
  const postId = document.querySelector('input[name="postId"]').value;

  const response = await fetch('/api/comments/new', {
    method: 'POST',
    body: JSON.stringify({ content: content, postId: postId, userId: "{{session.userId}}" }),  // Assuming you have the userId in session storage, or pass it correctly
    headers: { 'Content-Type': 'application/json' }
  });

  if (response.ok) {
    location.reload();  // Reload the page to show the new comment
  } else {
    const data = await response.json();
    alert(data.message);
  }
});
