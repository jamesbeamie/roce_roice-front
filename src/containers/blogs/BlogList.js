import React from 'react';
import BlogItem from './BlogItem';
import '../../assets/styles/blogList.css';

const BlogList = (props) => {
	// can also use () then call this.props
	const fetchedBlogs = props.blogs.map((blog) => {
		console.log('blogths',props.blogs);
		return (
			<BlogItem
				key={blog._id}
				blogId={blog._id}
				title={blog.title}
                description={blog.description}
                tag={blog.tag}
                specificBlog={props.blogDetails}
			/>
		);
	});
	return <ul className="home_list">{fetchedBlogs}</ul>;
};

export default BlogList;
