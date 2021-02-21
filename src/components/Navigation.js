import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
    return (
        <div>
            <Link to='/'>Log In</Link>
            <br/>
            <Link to='/protected'>See Bubbles</Link>
        </div>
    )
}

export default Navigation;