import React from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class UploadImage extends React.Component {
	state = {
		tag: '',
		imgName: '',
		file: null
	};

	onDrop = async (files) => {
		this.this.setState({ file: files[0] });
	};

	onChange = (e) => {
		this.setState({
			[e.target.tag]: e.target.value,
			[e.target.imgName]: e.target.value
		});
	};

	submit = async () => {
		const { tag, imgName, file } = this.state;

		const formData = new formData();
		formData.append('file', file);
		formData.append('upload_preset', process.env.REACT_APP_UPLOAD_PRESET);

		const response = await axios.post(
			`https://royalframes-photography.herokuapp.com/photography/${process.env.REACT_APP_CLOUD_NAME}/img/upload`,
			formData
		);

		// store img id to db
		const graphqlResponse = await this.props.mutate({
			variable: {
				tag,
				imgName,
				publicId: response.data.public_id
			}
		});
		this.props.history.push(`/images/${graphqlResponse.data.creatChampion.id}`);
	};

	render() {
		const { tag, imgName } = this.state;
		return (
			<div>
				<input name="tag" onChange={this.onChange} value={tag} />
				<input name="imgName" onChange={this.onChange} value={imgName} />
				<Dropzone onDrop={this.onDrop}>
					<p>Click to upload file, or drap a file and drop here.</p>
				</Dropzone>
				<button onClick={this.submit}>Upload</button>
			</div>
		);
	}
}

const CreateChampionMutation = gql`
	mutation($tag: String!, $imgName: String!, $publicId: String!) {
		creatChampion(tag: $tag, imgName: $imgName, publicId: $publicId) {
			id
		}
	}
`;

export default graphql(CreateChampionMutation)(UploadImage);
