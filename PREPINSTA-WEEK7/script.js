document.getElementById('taskForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const formData = new FormData(this);
    const taskData = {};
    formData.forEach((value, key) => {
      taskData[key] = value;
    });
    
    try {
      const response = await fetch('/courses/' + taskData.courseId + '/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(taskData)
      });
  
      if (!response.ok) {
        throw new Error('Failed to add task');
      }
  
      alert('Task added successfully');
      this.reset();
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to add task');
    }
  });
  
  