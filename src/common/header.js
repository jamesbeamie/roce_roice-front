import React from 'react';
import { NavLink } from 'react-router-dom';
import '../assets/styles/navbar.css';

const Header = () => {
	return (
		<header className="navigation-bar">
			<div className="navigation-bar_logo">
				<a href="/">
					<i>Royalframes</i>
				</a>
			</div>
			<nav className="navigation-bar_links">
				<ul>
					<li>
						<NavLink to="/" exact>
							Wedding
						</NavLink>
						{' | '}
						<NavLink to="/homes" exact>
							Fashion
						</NavLink>
						{' | '}
						<NavLink to="/bookings" exact>
							Blog
						</NavLink>
					</li>
				</ul>
			</nav>
		</header>
	);
};

export default Header;
