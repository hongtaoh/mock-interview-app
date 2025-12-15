import { useState } from 'react';
import Layout from '../components/Layout';
import { useUser } from '../context/UserContext';

// Mock data
const mockStories = [
  { 
    id: 1, 
    user: 'Alice Chen', 
    title: 'My Google Interview Experience', 
    content: 'Just finished my final round at Google. Here are the key things that helped me succeed...', 
    comments: [
      { id: 1, user: 'Bob Smith', content: 'Thanks for sharing! Very helpful.' }
    ] 
  },
  { 
    id: 2, 
    user: 'Bob Smith', 
    title: 'System Design Tips for New Grads', 
    content: 'System design can be intimidating, but here are some frameworks that helped me...', 
    comments: [] 
  },
];

export default function Stories() {
  const { currentUser } = useUser();
  const [stories, setStories] = useState(mockStories);
  const [newStory, setNewStory] = useState({ title: '', content: '' });
  const [newComment, setNewComment] = useState({});

  const handlePostStory = (e) => {
    e.preventDefault();
    const story = {
      id: stories.length + 1,
      user: currentUser.name,
      title: newStory.title,
      content: newStory.content,
      comments: []
    };
    
    setStories([story, ...stories]);
    setNewStory({ title: '', content: '' });
  };

  const handleAddComment = (storyId, comment) => {
    if (!comment.trim()) return;
    
    setStories(stories.map(story => 
      story.id === storyId 
        ? {
            ...story, 
            comments: [...story.comments, {
              id: story.comments.length + 1,
              user: currentUser.name,
              content: comment
            }]
          }
        : story
    ));
    
    setNewComment({...newComment, [storyId]: ''});
  };

  return (
    <Layout currentUser={currentUser}>
      <div className="max-w-4xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-6">Stories & Experiences</h2>
        
        {/* Post New Story Form */}
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <h3 className="font-semibold mb-3">Share Your Experience</h3>
          <form onSubmit={handlePostStory} className="space-y-3">
            <input 
              type="text" 
              placeholder="Title" 
              className="w-full border p-2 rounded"
              value={newStory.title}
              onChange={(e) => setNewStory({...newStory, title: e.target.value})}
              required
            />
            <textarea 
              placeholder="Tell your story..." 
              className="w-full border p-2 rounded h-24"
              value={newStory.content}
              onChange={(e) => setNewStory({...newStory, content: e.target.value})}
              required
            />
            <button 
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Post Story
            </button>
          </form>
        </div>

        {/* Stories List */}
        <div className="space-y-6">
          {stories.map(story => (
            <div key={story.id} className="border p-4 rounded-lg">
              <h4 className="font-semibold text-lg">{story.title}</h4>
              <p className="text-sm text-gray-500 mb-2">by {story.user}</p>
              <p className="text-gray-700 mb-4">{story.content}</p>
              
              {/* Comments Section */}
              <div className="border-t pt-3">
                <p className="text-sm text-gray-500 mb-2">Comments ({story.comments.length})</p>
                
                {/* Existing Comments */}
                {story.comments.map(comment => (
                  <div key={comment.id} className="mb-2 p-2 bg-gray-50 rounded">
                    <p className="text-sm"><strong>{comment.user}:</strong> {comment.content}</p>
                  </div>
                ))}
                
                {/* Add Comment Form */}
                <div className="flex mt-2">
                  <input 
                    type="text" 
                    placeholder="Add a comment..." 
                    className="flex-1 border p-2 rounded-l"
                    value={newComment[story.id] || ''}
                    onChange={(e) => setNewComment({...newComment, [story.id]: e.target.value})}
                  />
                  <button 
                    onClick={() => handleAddComment(story.id, newComment[story.id])}
                    className="bg-gray-600 text-white px-4 py-2 rounded-r hover:bg-gray-700"
                  >
                    Comment
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}