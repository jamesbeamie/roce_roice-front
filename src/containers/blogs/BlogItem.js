import React from 'react';
// import '../../assets/styling/blogItem.css';
import '../../assets/styles/blogItem.css';

const BlogItem = (props) => (
	<li key={props.blogId} className="home_list-item">
		<div>
			<h3>Title: {props.title}</h3>
			<h3>Description: {props.description}</h3>
			<h3>Tag: {props.tag}</h3>
		</div>
		<div>
			<React.Fragment>
				<p>owner</p>
				<button className="btn" onClick={props.specificBlog.bind(this, props.blogId)}>
					read
				</button>
			</React.Fragment>
		</div>
	</li>
);

export default BlogItem;
