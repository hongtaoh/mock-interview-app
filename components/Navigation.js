import { useRouter } from 'next/router';
import Link from 'next/Link';

export default function Navigation({ currentUser }){
    const router = useRouter();

    const navItems = [
        {href: '/', label: 'Interview Requests'},
        {href: '/stories', label: 'Stories & Experiences'},
        {href: '/directory', label: 'User Directory'},
        {href: '/profile', label: 'My Profile'},
    ]

    return (
        <nav className="bg-blue-600 text-white p-4">
          <div className="max-w-6xl mx-auto flex justify-between items-center">
            <Link href="/" className="text-xl font-bold hover:text-blue-200">
              CS Mock Interviews
            </Link>
            <div className="flex items-center space-x-4">
              <div className="bg-blue-800 px-3 py-1 rounded">
                <span className="text-sm">Credits: {currentUser?.credits || 0}</span>
              </div>
              {navItems.map(item => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-2 rounded ${
                    router.pathname === item.href ? 'bg-blue-800' : 'hover:bg-blue-700'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </nav>
      );
}