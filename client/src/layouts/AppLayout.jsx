import Navbar from '../components/Navbar';
import Rightbar from '../components/Rightbar';
import SiteHeader from '../components/SiteHeader';

import './AppLayout.css'

function AppLayout({ children }) {
    return (
        <>
            <SiteHeader />
            <div className="app-layout">
                <Navbar />
                <div className="main-content">
                    {children}
                </div>
                <Rightbar />
            </div>
        </>
  );
}

export default AppLayout;