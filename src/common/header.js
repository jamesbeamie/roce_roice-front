import React from 'react';
import { NavLink } from 'react-router-dom';
import loginContext from './loginContext';
import '../assets/styles/navbar.css';
const Header = () => {
	return (
		<loginContext.Consumer>
			{(context) => {
				return (
					<header className="navigation-bar">
						<div className="navigation-bar_logo">
							<a href="/">
								<h4>
									<i>RoyalFrames</i>
								</h4>
							</a>
						</div>
						<nav className="navigation-bar_links">
							<ul>
								<li>
									<NavLink to="/about" exact>
										About
									</NavLink>
									{' | '}
									<NavLink to="/about" exact>
										Wedding
									</NavLink>
									{' | '}
									<NavLink to="/about" exact>
										Fashion
									</NavLink>
									{' | '}
									<NavLink to="/about" exact>
										Potraits
									</NavLink>
									{' | '}
									<NavLink to="/about" exact>
										Family
									</NavLink>
									{' | '}
									<NavLink to="/about" exact>
										Blog
									</NavLink>
									{' | '}
									<NavLink to="/images" exact>
										Images
									</NavLink>
									{' | '}
									{context.token && (
										<NavLink to="/photography/blog" exact>
											Create
										</NavLink>
									)}
								</li>
								{context.token && (
									<li>
										<button onClick={context.logout}>logout</button>
									</li>
								)}
							</ul>
						</nav>
					</header>
				);
			}}
		</loginContext.Consumer>
	);
};

export default Header;
