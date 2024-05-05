const editBtnHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      console.log('CLICK CLICK FUCK')
      const id = event.target.getAttribute('data-id');
      const response = await fetch(`/api/posts/${id}`, {
        method: 'GET'
      })
      if (!response.ok){
        console.log('ERROR GG')
        return;
      }

      const post = await response.json();
  
      const editForm = document.getElementById('edit-form');

      if (editForm) {
        editForm.innerHTML = `
          <label for="title">Title:</label>
          <input type="text" id="title" value="${post.title}">
          <label for="content">Content:</label>
          <textarea id="content">${post.content}</textarea>
          <button id="save-btn">Save Changes</button>
        `;
      
        const saveBtn = editForm.querySelector('#save-btn');
      
  
      saveBtn.addEventListener('click', async () => {
        const title = document.getElementById('title').value;
        const content = document.getElementById('content').value;
  
        const response = await fetch(`/api/posts/editSave/${id}`,
         {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title, content }),
        });
  
        if (response.ok) {
          console.log('Post updated successfully!');
          window.location.reload();
        } else {
          console.error('Failed to update post!');
        }
      });
    }
  };
}
  
  const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      console.log('CLICK CLICK FUCK')
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/posts/delete/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        console.log('We good')
        document.location.replace('/dashboard');
      } else {
        alert('Failed to delete project');
      }
    }
  };
  
  
  document
    .querySelector('.edit-me')
    .addEventListener('click', editBtnHandler);
  
  document
    .querySelector('.btn-danger')
    .addEventListener('click', delButtonHandler);