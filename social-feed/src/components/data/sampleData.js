export const initialPosts = [
    {
      id: 1,
      author: {
        name: "John Doe",
        avatar: "/api/placeholder/50/50"
      },
      content: "Just had an amazing weekend! 🎉",
      likes: 5,
      comments: [
        {
          id: 1,
          author: "Jane Smith",
          text: "Looks awesome!",
          timestamp: "2024-01-27T10:00:00Z"
        }
      ],
      timestamp: "2024-01-27T09:00:00Z"
    },
    {
      id: 2,
      author: {
        name: "Jane Smith",
        avatar: "/api/placeholder/50/50"
      },
      content: "Working on a new project with React and Tailwind CSS 💻",
      likes: 3,
      comments: [],
      timestamp: "2024-01-27T08:30:00Z"
    }
  ];