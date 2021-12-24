import React, { useState } from 'react';
import { FaCheck, FaEdit, FaTrash } from 'react-icons/fa';

const List = ({ items, removeItem, editItem }) => {
	const [editable, setEditable] = useState([]);
	const [editedText, setEditedText] = useState('');

	function editText(id) {
		setEditable(editable.filter((item) => item !== id));
		editItem(id, editedText);
	}

	return (
		<ul>
			{items.map((item) => {
				const isEditing = editable.includes(item.id);
				return (
					<li key={item.id} className='grocery-item'>
						<input
							type='text'
							className='title grocery-editable'
							defaultValue={item.item}
							readOnly={!isEditing}
							onChange={(e) => setEditedText(e.target.value)}
							onKeyDown={(e) => {
								if (e.key === 'Enter' && isEditing) {
									editText(item.id);
								}
							}}
						/>
						<div>
							<button className='edit-btn'>
								{isEditing ? <FaCheck onClick={() => editText(item.id)} /> : <FaEdit onClick={() => setEditable((prev) => [...prev, item.id])} />}
							</button>
							<button className='delete-btn'>
								<FaTrash onClick={() => removeItem(item.id)} />
							</button>
						</div>
					</li>
				);
			})}
		</ul>
	);
};

export default List;
