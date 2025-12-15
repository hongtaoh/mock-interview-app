import Navigation from './Navigation'

export default function Layout({children, currentUser}){
    return (
        <div className="min-h-screen bg-gray-100">
            <Navigation currentUser={currentUser} />
            <main>{children}</main>
        </div>
    )
}