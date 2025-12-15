import { useState } from 'react';
import Layout from '../components/Layout';
import { useUser } from '../context/UserContext';

// Mock data - replace with API calls later
const mockInterviewRequests = [
  { id: 1, user: 'Alice Chen', company: 'Google', type: 'System Design', date: '2025-07-01', time: '2:00 PM' },
  { id: 2, user: 'Bob Smith', company: 'Meta', type: 'Algorithms', date: '2025-07-02', time: '4:00 PM' },
];

export default function InterviewRequests() {
  const { currentUser, setCurrentUser } = useUser();
  const [requests, setRequests] = useState(mockInterviewRequests);
  const [formData, setFormData] = useState({
    company: '',
    type: '',
    date: '',
    time: ''
  });

  const handlePostRequest = (e) => {
    e.preventDefault();
    if (currentUser.credits >= 1) {
      const newRequest = {
        id: requests.length + 1,
        user: currentUser.name,
        company: formData.company,
        type: formData.type,
        date: formData.date,
        time: formData.time,
      };
      
      setRequests([...requests, newRequest]);
      setCurrentUser({...currentUser, credits: currentUser.credits - 1});
      setFormData({ company: '', type: '', date: '', time: '' });
      alert('Request posted! 1 credit deducted.');
    } else {
      alert('Not enough credits! Help others to earn credits.');
    }
  };

  const handleHelpOut = () => {
    setCurrentUser({...currentUser, credits: currentUser.credits + 1});
    alert('Thanks for helping! You earned 1 credit.');
  };

  return (
    <Layout currentUser={currentUser}>
      <div className="max-w-4xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-6">Interview Requests</h2>
        
        {/* Post New Request Form */}
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <h3 className="font-semibold mb-3">Post New Request</h3>
          <p className="text-sm text-gray-600 mb-3">Cost: 1 credit</p>
          
          <form onSubmit={handlePostRequest} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input 
                type="text" 
                placeholder="Target Company" 
                className="border p-2 rounded"
                value={formData.company}
                onChange={(e) => setFormData({...formData, company: e.target.value})}
                required
              />
              <select 
                className="border p-2 rounded"
                value={formData.type}
                onChange={(e) => setFormData({...formData, type: e.target.value})}
                required
              >
                <option value="">Interview Type</option>
                <option value="Algorithms">Algorithms</option>
                <option value="System Design">System Design</option>
                <option value="Behavioral">Behavioral</option>
              </select>
              <input 
                type="date" 
                className="border p-2 rounded"
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
                required
              />
              <input 
                type="time" 
                className="border p-2 rounded"
                value={formData.time}
                onChange={(e) => setFormData({...formData, time: e.target.value})}
                required
              />
            </div>
            <button 
              type="submit"
              className={`px-4 py-2 rounded ${
                currentUser.credits >= 1 
                  ? 'bg-blue-600 text-white hover:bg-blue-700' 
                  : 'bg-gray-400 text-gray-600 cursor-not-allowed'
              }`}
              disabled={currentUser.credits < 1}
            >
              Post Request (1 credit)
            </button>
          </form>
        </div>

        {/* List of Requests */}
        <div className="space-y-4">
          {requests.map(request => (
            <div key={request.id} className="border p-4 rounded-lg">
              <div className="flex justify-between">
                <div>
                  <h4 className="font-semibold">{request.user}</h4>
                  <p className="text-gray-600">{request.company} - {request.type}</p>
                  <p className="text-sm text-gray-500">{request.date} at {request.time}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-green-600 font-medium mb-2">+1 credit</p>
                  <button 
                    onClick={() => handleHelpOut(request.id)}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                    disabled={request.user === currentUser.name}
                  >
                    {request.user === currentUser.name ? 'Your Request' : 'Help Out'}
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