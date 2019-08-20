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
		this.setState({ file: files[0] });
	};

	onChange = (event) => {
        console.log('input',event.target.value )
		this.setState({
			tag: event.target.value,
            imgName: event.target.value,
            file: event.target.value
		});
	};

	submit = async () => {
        const { tag, imgName, file } = this.state;
        console.log('filedata,',tag, imgName, file )

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
            <form className="auth-form">
				<div className="form-control">
					<label htmlFor="tag">tag:</label>
					<input type="text" id="tag" onChange={this.onChange}/>
				</div>
				<div className="form-control">
					<label htmlFor="imgName">imgName:</label>
					<input type="text" id="imgName" onChange={this.onChange}/>
                </div>
                <div className="form-control">
					<label htmlFor="imgFile">imgFile:</label>
					<input type="file" id="imgFile" onChange={this.onChange}/>
				</div>
				<div className="form-actions">
					<button onClick={this.submit}>Upload</button>
				</div>
			</form>
		);
	}
}

const CreateChampionMutation = gql`
	mutation($tag: String!, $imgName: String!, $publicId: String!) {
		creatChampion(tag: $tag, imgName: $imgName, publicId: $publicId) {
			_id
		}
	}
`;

export default graphql(CreateChampionMutation)(UploadImage);
