import { useState } from 'react';

function CreatePost({ onCreatePost }) {
  const [content, setContent] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (content.trim()) {
      onCreatePost(content);
      setContent('');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 mb-6">
      <form onSubmit={handleSubmit}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's on your mind?"
          className="w-full px-3 py-2 border rounded-lg mb-4"
          rows="3"
        />
        <button 
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Post
        </button>
      </form>
    </div>
  );
}

export default CreatePost;