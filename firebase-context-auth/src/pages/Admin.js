import React from 'react'
import Header from '../components/Header'
import Dashboard from '../components/Admin'
import Footer from '../components/Footer'

function Admin() {
    return (
        <React.Fragment>
            <Header />
            <Dashboard />
            <Footer />
        </React.Fragment>
    )
}

export default Admin