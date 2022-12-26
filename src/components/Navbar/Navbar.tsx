import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <div className='d-flex justify-content-between'>
            <h3>Contacts</h3>
            <Link to='/new-contact' className='btn btn-primary'>Add new contact</Link>
        </div>
    );
};

export default Navbar;