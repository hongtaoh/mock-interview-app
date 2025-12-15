import { useState } from 'react';
import Layout from '../components/Layout';
import { useUser } from '../context/UserContext';

export default function Profile() {
  const { currentUser, setCurrentUser } = useUser();
  const [profile, setProfile] = useState(currentUser);
  const [targetCompanies, setTargetCompanies] = useState(currentUser.targetCompanies || []);

  const handleSave = (e) => {
    e.preventDefault();
    const updatedUser = { ...profile, targetCompanies };
    setCurrentUser(updatedUser);
    alert('Profile updated successfully!');
  };

  const handleCompanyToggle = (company) => {
    if (targetCompanies.includes(company)) {
      setTargetCompanies(targetCompanies.filter(c => c !== company));
    } else {
      setTargetCompanies([...targetCompanies, company]);
    }
  };

  return (
    <Layout currentUser={currentUser}>
      <div className="max-w-2xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-6">My Profile</h2>
        
        <div className="bg-gray-50 p-6 rounded-lg">
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
              <input 
                type="text" 
                value={profile.name}
                onChange={(e) => setProfile({...profile, name: e.target.value})}
                className="w-full border p-2 rounded" 
                placeholder="Your full name"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">School</label>
              <input 
                type="text" 
                value={profile.school}
                onChange={(e) => setProfile({...profile, school: e.target.value})}
                className="w-full border p-2 rounded" 
                placeholder="University name"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Experience Level</label>
              <select 
                value={profile.experience}
                onChange={(e) => setProfile({...profile, experience: e.target.value})}
                className="w-full border p-2 rounded"
              >
                <option value="Intern">Intern</option>
                <option value="New Grad">New Grad</option>
                <option value="2+ Years">2+ Years</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Target Companies</label>
              <div className="grid grid-cols-2 gap-2">
                {['Google', 'Meta', 'Apple', 'Microsoft', 'Amazon', 'Netflix'].map(company => (
                  <label key={company} className="flex items-center">
                    <input 
                      type="checkbox" 
                      className="mr-2"
                      checked={targetCompanies.includes(company)}
                      onChange={() => handleCompanyToggle(company)}
                    />
                    <span className="text-sm">{company}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <div className="bg-blue-50 p-3 rounded">
              <p className="text-sm text-blue-800">Current Credits: <strong>{currentUser.credits}</strong></p>
              <p className="text-xs text-blue-600 mt-1">Help others to earn more credits!</p>
            </div>
            
            <button 
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}