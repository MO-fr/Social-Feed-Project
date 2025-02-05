import { useState } from 'react';
import PostList from './components/postlist';
import CreatePost from './components/createpost';
import { initialPosts } from './data/sampleData';

function App() {
  const [posts, setPosts] = useState(initialPosts);
  
  const handleCreatePost = (newPostContent) => {
    const newPost = {
      id: Date.now(),
      author: {
        name: "Current User",
        avatar: "/api/placeholder/50/50"
      },
      content: newPostContent,
      likes: 0,
      comments: [],
      timestamp: new Date().toISOString()
    };
    
    setPosts(prevPosts => [newPost, ...prevPosts]);
  };
  
  const handleLike = (postId) => {
    setPosts(prevPosts => 
      prevPosts.map(post =>
        post.id === postId 
          ? { ...post, likes: post.likes + 1 }
          : post
      )
    );
  };
  
  const handleComment = (postId, commentText) => {
    const newComment = {
      id: Date.now(),
      author: "Current User",
      text: commentText,
      timestamp: new Date().toISOString()
    };
    
    setPosts(prevPosts =>
      prevPosts.map(post =>
        post.id === postId
          ? { ...post, comments: [...post.comments, newComment] }
          : post
      )
    );
  };

  return (
    <div className="container mx-auto max-w-2xl p-4">
      <h1 className="text-3xl font-bold mb-6">Social Feed</h1>
      <CreatePost onCreatePost={handleCreatePost} />
      <PostList 
        posts={posts}
        onLike={handleLike}
        onComment={handleComment}
      />
    </div>
  );
}

export default App;