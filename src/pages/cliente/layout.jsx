import ListClient from './listClient';
import { Outlet } from 'react-router-dom';

const Layout = () => {
    return (
        <div className="container">
        <div className="list-container">
            <ListClient />
        </div>
    
        <div className="client-container">
            <Outlet />
        </div>
        </div>
    );
}

export default Layout;