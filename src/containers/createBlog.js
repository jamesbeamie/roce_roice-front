import React, { Component } from 'react';
import '../assets/styles/blogModal.css';
import Modal from '../common/modal';
import Backdrop from '../common/backdrop';
import BlogList from './blogs/BlogList';

class CreateBlog extends Component {
	state = {
		creating: false,
		blogArray: []
	};

	componentDidMount() {
		this.fetchBlogs();
	}

	handleCreateHome = () => {
		this.setState({
			creating: true
		});
	};

	handleCancel = () => {
		this.setState({
			creating: false
		});
	};

	handleConfirm = () => {
		this.setState({
			creating: false
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
					blogArray: blogs
				});
			})
			.catch((err) => {
				console.log(err);
			});
	};

	render() {
		const { creating, blogArray } = this.state;
		return (
			<React.Fragment>
				{creating && <Backdrop />}
				{creating && (
					<Modal
						title="Add blog"
						canCancel
						canConfirm
						onCancel={this.handleCancel}
						onConfirm={this.handleConfirm}
					>
						<p>Blog modal</p>
					</Modal>
				)}
				<div className="home-control">
					<h4>Create Blog</h4>
					<button onClick={this.handleCreateHome}> Click to create</button>
				</div>
				<BlogList blogs={blogArray} />
			</React.Fragment>
		);
	}
}

export default CreateBlog;
