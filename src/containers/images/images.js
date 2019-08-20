import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Image } from 'cloudinary-react';

const Champion = ({ data: { loading, getChampion } }) => {
	if (loading) {
		return <p>loading...</p>;
	}
	const { tag, imgName, publicId } = getChampion;

	return (
		<div>
			<h3>{tag}</h3>
			<p>{imgName}</p>
			<Image cloudNam={process.env.REACT_APP_CLOUD_NAME} publicId={publicId} />
		</div>
	);
};

const getChampionQuery = gql`
	query($id: Int!) {
		getChampion(id: $id) {
			tag
			imgName
			publicId
		}
	}
`;

export default graphql(getChampionQuery, {
	options: ({ match }) => ({
		variables: match.params
	})
})(Champion);
