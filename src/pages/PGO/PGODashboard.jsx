import React from 'react';
import Sidebar from './components/Sidebar';
import Footer from '../../components/footer/footer';
import { Outlet } from 'react-router-dom';

function PGODashboard() {
    return (
        <>
            <section className='flex flex-col min-h-screen'>
                <Sidebar />
                <div className="ml-46 max-[640px]:ml-0 p-6">
                    <Outlet />
                </div>
            </section>
            <Footer />
        </>
    );
}

export default PGODashboard;
