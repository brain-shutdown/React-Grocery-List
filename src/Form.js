import React, { useState } from 'react';

const Input = ({ handleSubmit }) => {
	const [item, setItem] = useState('');

	return (
		<form
			className='grocery-form'
			onSubmit={(e) => {
				handleSubmit(e, item);
				return setItem('');
			}}>
			<h3>Grocery List</h3>
			<div className='form-control'>
				<input type='text' className='grocery' name='grocery' placeholder='e.g. eggs' maxLength='40' onChange={(e) => setItem(e.target.value)} value={item} />
				<button type='submit' className='submit-btn'>
					Add item
				</button>
			</div>
		</form>
	);
};

export default Input;
