import { useState } from 'react';

function Post({ post, onLike, onComment }) {
  const [commentText, setCommentText] = useState('');
  const { author, content, likes, comments, timestamp } = post;
  
  const handleSubmitComment = (e) => {
    e.preventDefault();
    if (commentText.trim()) {
      onComment(post.id, commentText);
      setCommentText('');
    }
  };

  return (
    <article className="bg-white rounded-lg shadow p-4">
      <header className="flex items-center mb-4">
        <img 
          src={author.avatar} 
          alt={author.name} 
          className="w-12 h-12 rounded-full mr-4"
        />
        <div>
          <h3 className="font-semibold">{author.name}</h3>
          <time className="text-gray-500 text-sm">
            {new Date(timestamp).toLocaleDateString()}
          </time>
        </div>
      </header>
      
      <div className="mb-4">
        <p className="text-gray-800">{content}</p>
      </div>
      
      <div className="flex items-center gap-4 mb-4">
        <button 
          onClick={() => onLike(post.id)}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
        >
          <span>👍</span> {likes} Likes
        </button>
        <span className="text-gray-500">
          {comments.length} Comments
        </span>
      </div>

      <div className="border-t pt-4">
        {comments.map(comment => (
          <div key={comment.id} className="mb-2 text-sm">
            <span className="font-semibold">{comment.author}: </span>
            <span>{comment.text}</span>
          </div>
        ))}
        
        <form onSubmit={handleSubmitComment} className="mt-4 flex gap-2">
          <input
            type="text"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Write a comment..."
            className="flex-1 px-3 py-2 border rounded-lg"
          />
          <button 
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Comment
          </button>
        </form>
      </div>
    </article>
  );
}

export default Post;