import React, { Component } from 'react';
import '../assets/styles/blogModal.css';
import Modal from '../common/modal';
import Backdrop from '../common/backdrop';

class CreateBlog extends Component {
	state = {
		creating: false
	};

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

	render() {
		const { creating } = this.state;
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
			</React.Fragment>
		);
	}
}

export default CreateBlog;
