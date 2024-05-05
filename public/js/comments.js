const newCommentFormHandler = async (event) => {
    event.preventDefault();
  
    const postId = document.querySelector('.post-id').textContent;
    const comment = document.querySelector('#comment').value.trim();
  
    if (comment) {
      const response = await fetch('/api/comments', {
        method: 'POST',
        body: JSON.stringify({ postId, comment }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to post.');
      }
    }
  };
  
  document
    .querySelector('.new-comment-form')
    .addEventListener('submit', newCommentFormHandler);
  