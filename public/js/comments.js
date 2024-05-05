document.getElementById('comment-form').addEventListener('submit', async function(event) {
  event.preventDefault();

  const form = event.target;
  const { content, postId } = form.querySelectorAll('textarea[name="content"], input[name="postId"]');

  const response = await fetch('/api/comments/new', {
    method: 'POST',
    body: JSON.stringify({ content: content.value, postId: postId.value }),
    headers: { 'Content-Type': 'application/json' }
  });

  if (response.ok) {
    location.reload();  // Reload the page to show the new comment
  } else {
    const data = await response.json();
    alert(data.message);
  }
});