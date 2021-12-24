import React, { useEffect } from 'react';

const Alert = ({ message, type, removeAlert }) => {
	useEffect(() => {
		let timeout = setTimeout(() => {
			removeAlert();
		}, 2000);
		return () => clearTimeout(timeout);
	}, [removeAlert]);
	return <p className={`alert alert-${type}`}>{message}</p>;
};

export default Alert;
