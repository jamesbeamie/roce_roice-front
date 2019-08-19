import React, { Component } from 'react';
import '../assets/styles/blogModal.css';
import '../assets/styles/blog.css';
import Modal from '../common/modal';
import Backdrop from '../common/backdrop';
import BlogList from './blogs/BlogList';
import loginContext from '../common/loginContext';
import Spinner from '../common/Spinner';

class CreateBlog extends Component {
	state = {
		creating: false,
		blogArray: [],
		isLoading: false,
		specificBlog: null
	};

	constructor(props) {
		super(props);

		this.titleEl = React.createRef();
		this.descriptionEl = React.createRef();
		this.tagEl = React.createRef();
	}

	componentDidMount() {
		this.fetchBlogs();
	}

	static contextType = loginContext;

	handleCreateBlog = () => {
		this.setState({
			creating: true
		});
	};

	handleCancel = () => {
		this.setState({
			creating: false,
			specificBlog: null
		});
	};

	showBlogDetails = (blogId) => {
		this.setState((prevState) => {
			const selectedBlog = prevState.blogArray.find((blog) => blog._id === blogId);
			return { specificBlog: selectedBlog };
		});
	};

	handleConfirm = () => {
		this.setState({
			creating: false
		});
		const title = this.titleEl.current.value;
		const description = this.descriptionEl.current.value;
		const tag = this.tagEl.current.value;

		// validation

		if (title.trim().length === 0 || description.trim().length === 0 || tag.trim().length === 0) {
			return;
		}
		const blog = { title, description, tag };
		console.log('newBlog', blog);
		const requestBody = {
			query: `
                mutation {
                    createBlog(blogInput: {title: "${title}", description: "${description}", tag: "${tag}"}){
                        _id
   						title
    					description
    					tag
                    }
                }
            `
		};

		// get token from context

		const token = this.context.token;
		// acces api
		fetch('https://royalframes-photography.herokuapp.com/photography', {
			method: 'POST',
			body: JSON.stringify(requestBody),
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + token
			}
		})
			.then((res) => {
				if (res.status !== 200 && res.status !== 201) {
					throw new Error('Error creating Blog');
				}
				return res.json();
			})
			.then((resData) => {
				console.log('resData', resData);
				// this.fetchHomes();
				this.setState((prevState) => {
					const updatedArray = [ ...prevState.blogArray ];
					updatedArray.push({
						_id: resData.data.createBlog._id,
						title: resData.data.createBlog.title,
						description: resData.data.createBlog.description,
						tag: resData.data.createBlog.tag
					});
					return { blogArray: updatedArray };
				});
			})
			.catch((err) => {
				console.log(err);
			});
	};

	fetchBlogs = () => {
		this.setState({ isLoading: true });
		const requestBody = {
			query: `
                query {
                    blogs{
                        _id
        				title
        				description
        				tag
                    }
                }
            `
		};

		// acces api
		fetch('https://royalframes-photography.herokuapp.com/photography', {
			method: 'POST',
			body: JSON.stringify(requestBody),
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then((res) => {
				if (res.status !== 200 && res.status !== 201) {
					throw new Error('Error fetching Blogs');
				}
				return res.json();
			})
			.then((resData) => {
				console.log('fetchedData', resData);
				const blogs = resData.data.blogs;
				this.setState({
					blogArray: blogs,
					isLoading: false
				});
			})
			.catch((err) => {
				console.log(err);
				this.setState({
					isLoading: false
				});
			});
	};

	render() {
		const { creating, blogArray, isLoading, specificBlog } = this.state;
		return (
			<React.Fragment>
				{(creating || specificBlog) && <Backdrop />}
				{creating && (
					<Modal
						title="Add blog"
						canCancel
						canConfirm
						onCancel={this.handleCancel}
						onConfirm={this.handleConfirm}
						confirmText="Post"
					>
						<form>
							<div className="form-control">
								<label htmlFor="title">Title</label>
								<input type="text" id="title" ref={this.titleEl} />
							</div>
							<div className="form-control">
								<label htmlFor="description">Description</label>
								<input type="text" id="description" ref={this.descriptionEl} />
							</div>
							<div className="form-control">
								<label htmlFor="tag">Tag</label>
								<input type="text" id="tag" ref={this.tagEl} />
							</div>
						</form>
					</Modal>
				)}
				{specificBlog && (
					<Modal
						title={specificBlog.title}
						canCancel
						canConfirm
						onCancel={this.handleCancel}
						onConfirm={this.handleConfirm}
						confirmText=""
					>
						<h4>title: {specificBlog.title}</h4>
						<p>Description: {specificBlog.description}</p>
						<h4>tag: {specificBlog.tag}</h4>
					</Modal>
				)}
				<div className="home-control">
					<h4>Create Blog</h4>
					<button onClick={this.handleCreateBlog}> Click to create</button>
				</div>
				{isLoading ? <Spinner /> : <BlogList blogs={blogArray} blogDetails={this.showBlogDetails} />}
			</React.Fragment>
		);
	}
}

export default CreateBlog;
