import { useState } from 'react';
import Layout from '../components/Layout';
import { useUser } from '../context/UserContext';

// Mock data
const mockUsers = [
  { id: 1, name: 'Alice Chen', school: 'Stanford', targetCompanies: ['Google', 'Meta'], experience: 'New Grad', credits: 8 },
  { id: 2, name: 'Bob Smith', school: 'MIT', targetCompanies: ['Apple', 'Microsoft'], experience: 'Intern', credits: 3 },
  { id: 3, name: 'Carol Wong', school: 'CMU', targetCompanies: ['Amazon', 'Google'], experience: '2+ Years', credits: 12 },
];

export default function Directory() {
  const { currentUser } = useUser();
  const [users, setUsers] = useState(mockUsers);
  const [filters, setFilters] = useState({ company: '', experience: '' });

  const filteredUsers = users.filter(user => {
    const companyMatch = !filters.company || user.targetCompanies.includes(filters.company);
    const experienceMatch = !filters.experience || user.experience === filters.experience;
    return companyMatch && experienceMatch;
  });

  return (
    <Layout currentUser={currentUser}>
      <div className="max-w-4xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-6">User Directory</h2>
        
        {/* Filters */}
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <h3 className="font-semibold mb-3">Filter Users</h3>
          <div className="flex space-x-4">
            <select 
              className="border p-2 rounded"
              value={filters.company}
              onChange={(e) => setFilters({...filters, company: e.target.value})}
            >
              <option value="">All Companies</option>
              <option value="Google">Google</option>
              <option value="Meta">Meta</option>
              <option value="Apple">Apple</option>
              <option value="Microsoft">Microsoft</option>
              <option value="Amazon">Amazon</option>
            </select>
            <select 
              className="border p-2 rounded"
              value={filters.experience}
              onChange={(e) => setFilters({...filters, experience: e.target.value})}
            >
              <option value="">All Experience Levels</option>
              <option value="Intern">Intern</option>
              <option value="New Grad">New Grad</option>
              <option value="2+ Years">2+ Years</option>
            </select>
          </div>
        </div>

        {/* Users Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredUsers.map(user => (
            <div key={user.id} className="border p-4 rounded-lg">
              <h4 className="font-semibold">{user.name}</h4>
              <p className="text-sm text-gray-600">{user.school}</p>
              <p className="text-sm text-gray-600">{user.experience}</p>
              <p className="text-sm text-blue-600">Credits: {user.credits}</p>
              <div className="mt-2">
                <p className="text-xs text-gray-500">Target Companies:</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {user.targetCompanies.map(company => (
                    <span key={company} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                      {company}
                    </span>
                  ))}
                </div>
              </div>
              <button className="mt-3 bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700">
                Connect
              </button>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}