import { useState } from 'react';
import Post from './Post';

function PostList({ posts, onLike, onComment }) {
  return (
    <div className="space-y-4">
      {posts.map(post => (
        <Post 
          key={post.id}
          post={post}
          onLike={onLike}
          onComment={onComment}
        />
      ))}
    </div>
  );
}

export default PostList;