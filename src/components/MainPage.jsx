import React, { useState } from 'react';

const initialPosts = [
  {
    id: 1,
    username: 'johndoe',
    fullName: 'John Doe',
    content: 'Just enjoying a beautiful day! 🌞',
    likes: 42,
    liked: false,
    comments: [
      { id: 1, user: 'user1', text: 'Looks amazing! 😍' },
      { id: 2, user: 'user2', text: 'Great weather indeed!' }
    ],
    shares: 2,
    timestamp: '2 hours ago'
  },
  {
    id: 2,
    username: 'janesmth',
    fullName: 'Jane Smith',
    content: 'Check out this amazing sunset! #nature',
    likes: 87,
    liked: false,
    comments: [
      { id: 1, user: 'user3', text: 'Beautiful capture! 📸' }
    ],
    shares: 6,
    timestamp: '5 hours ago'
  }
];

const MainPage = () => {
  const [posts, setPosts] = useState(initialPosts);
  const [newPostContent, setNewPostContent] = useState('');
  const [commentInputs, setCommentInputs] = useState({});
  const [followedUsers, setFollowedUsers] = useState(new Set());

  const handleLike = (postId) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        const newLikes = post.liked ? post.likes - 1 : post.likes + 1;
        return { ...post, likes: newLikes, liked: !post.liked };
      }
      return post;
    }));
  };

  const handleCommentSubmit = (postId) => {
    if (!commentInputs[postId]?.trim()) return;

    setPosts(posts.map(post => {
      if (post.id === postId) {
        const newComment = {
          id: post.comments.length + 1,
          user: 'currentUser',
          text: commentInputs[postId]
        };
        return {
          ...post,
          comments: [...post.comments, newComment],
          comments: post.comments + 1
        };
      }
      return post;
    }));
    setCommentInputs({ ...commentInputs, [postId]: '' });
  };

  const handleShare = (postId) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return { ...post, shares: post.shares + 1 };
      }
      return post;
    }));
  };

  const handleCreatePost = () => {
    if (!newPostContent.trim()) return;

    const newPost = {
      id: posts.length + 1,
      username: 'currentUser',
      fullName: 'Current User',
      content: newPostContent,
      likes: 0,
      liked: false,
      comments: [],
      shares: 0,
      timestamp: 'Just now'
    };

    setPosts([newPost, ...posts]);
    setNewPostContent('');
  };

  const toggleFollow = (userId) => {
    setFollowedUsers(prev => {
      const newSet = new Set(prev);
      if (newSet.has(userId)) {
        newSet.delete(userId);
      } else {
        newSet.add(userId);
      }
      return newSet;
    });
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Sidebar (unchanged) */}

      {/* Main Content */}
      <div className="flex-1 flex flex-col max-h-screen overflow-hidden">
        {/* Header (unchanged) */}

        {/* Feed Content */}
        <main className="flex-1 overflow-y-auto p-4">
          <div className="max-w-2xl mx-auto">
            {/* Create Post Section */}
            <div className="bg-white rounded-lg shadow p-4 mb-4">
              <textarea
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
                placeholder="What's on your mind?"
                className="w-full h-24 p-4 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-gray-700 placeholder-gray-400 resize-none"
              ></textarea>
              <div className="flex items-center justify-between mt-4">
                <div className="flex space-x-2">
                  {/* Media buttons unchanged */}
                </div>
                <button
                  onClick={handleCreatePost}
                  className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:opacity-90 transition-opacity font-medium"
                >
                  Post
                </button>
              </div>
            </div>

            {/* Posts */}
            {posts.map(post => (
              <div key={post.id} className="bg-white rounded-lg shadow p-4 mb-4">
                {/* Post header unchanged */}

                <p className="text-gray-800 mb-4 text-lg">{post.content}</p>

                {/* Comments Section */}
                {post.comments.length > 0 && (
                  <div className="ml-16 mt-4 space-y-3">
                    {post.comments.map(comment => (
                      <div key={comment.id} className="flex items-start space-x-2">
                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm">
                          {comment.user[0]}
                        </div>
                        <div className="bg-gray-100 p-3 rounded-2xl">
                          <p className="font-medium text-sm">{comment.user}</p>
                          <p className="text-gray-800 text-sm">{comment.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Interaction Buttons */}
                <div className="flex justify-between text-gray-500 border-t border-gray-100 pt-4">
                  <button
                    onClick={() => handleLike(post.id)}
                    className="flex items-center space-x-2 transition-colors"
                    style={{ color: post.liked ? '#EF4444' : '' }}
                  >
                    <svg className="w-5 h-5" fill={post.liked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    <span>{post.likes}</span>
                  </button>

                  <div className="flex items-center space-x-2 flex-1 max-w-xl ml-4">
                    <input
                      type="text"
                      value={commentInputs[post.id] || ''}
                      onChange={(e) => setCommentInputs({ ...commentInputs, [post.id]: e.target.value })}
                      placeholder="Write a comment..."
                      className="flex-1 px-3 py-1 border rounded-full text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                    <button
                      onClick={() => handleCommentSubmit(post.id)}
                      className="text-blue-500 hover:text-blue-600 text-sm font-medium"
                    >
                      Post
                    </button>
                  </div>

                  <button
                    onClick={() => handleShare(post.id)}
                    className="flex items-center space-x-2 hover:text-purple-500 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                    <span>{post.shares}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>

      {/* Right Sidebar */}
      <div className="w-64 bg-white border-l border-gray-200 p-4 hidden lg:block">
        <h2 className="text-lg font-bold mb-4 text-gray-800">Suggestions</h2>
        <div className="space-y-4">
          {[['AS', 'Alex Smith'], ['MJ', 'Maria Johnson']].map(([initials, name]) => (
            <div key={name} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-colors cursor-pointer">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center text-white font-bold">
                  {initials}
                </div>
                <div>
                  <p className="font-medium text-gray-900">{name}</p>
                  <p className="text-sm text-gray-500">{name.split(' ')[0]}'s bio</p>
                </div>
              </div>
              <button
                onClick={() => toggleFollow(name)}
                className={`px-3 py-1 rounded-lg transition-colors ${
                  followedUsers.has(name) 
                    ? 'bg-gray-200 text-gray-700' 
                    : 'text-blue-500 hover:bg-blue-50'
                }`}
              >
                {followedUsers.has(name) ? 'Following' : 'Follow'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainPage;