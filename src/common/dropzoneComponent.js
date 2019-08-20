import React from 'react';
import Dropzone from 'react-dropzone';

const Dropzon = ({ children }) => <Dropzone onDrop='drop'>{children}</Dropzone>;
export default Dropzon;
