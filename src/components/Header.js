import React from 'react';
import { Link } from 'react-router-dom';

const Header = (props) => {
    return (
        <header className="header" >
            <div className="header-content site-name"><Link to="/home">WTFSIMTE</Link></div>
            <div className="header-content page-name">{props.page}</div>
            <div className="menu-items header-content">
                <div><Link to="/new-recipe">NEW RECIPE</Link></div>
                <div><Link to="/favorites">FAVORITES</Link></div>
            </div>
        </header>
    )
}

// const styles = {
    
// }

export default Header;