import React, { useState, useEffect } from 'react';
import List from './List';
import Alert from './Alert';
import Form from './Form';
import { v4 as uuidv4 } from 'uuid';

function App() {
	const [alert, showAlert] = useAlert();
	const groceryList = useListInput(showAlert);

	const handleSubmit = (e, item) => {
		e.preventDefault();
		if (!item) {
			return showAlert(true, 'Please enter a value', 'danger');
		}
		groceryList.addItem({ id: uuidv4(), item: item });
	};

	useEffect(() => {
		localStorage.setItem('groceryList', JSON.stringify(groceryList.items));
	}, [groceryList.items]);

	return (
		<section className='section-center'>
			{alert.show && <Alert {...alert} removeAlert={showAlert} />}
			<Form handleSubmit={handleSubmit} />
			{groceryList.items.length > 0 && (
				<article className='grocery-container'>
					<List {...groceryList} />
					<button className='clear-btn' onClick={() => groceryList.emptyList()}>
						Clear Items
					</button>
				</article>
			)}
		</section>
	);
}

function getLocalStorage() {
	let list = localStorage.getItem('groceryList');
	if (list) {
		return JSON.parse(list);
	}
	return [];
}

function useAlert() {
	const [alert, setAlert] = useState({ show: false, message: '', type: '' });
	function showAlert(show = false, message = '', type = '') {
		setAlert({ show, message, type });
	}
	return [alert, showAlert];
}

function useListInput(showAlert) {
	const [items, setItems] = useState(getLocalStorage());

	function addItem(groceryItem) {
		setItems((groceryList) => [...groceryList, groceryItem]);
		showAlert(true, 'Item added to the list', 'success');
	}

	function removeItem(id) {
		setItems((item) => item.filter((grocery) => grocery.id !== id));
		showAlert(true, 'Item eliminated', 'danger');
	}

	function editItem(id, newItem) {
		const itemIndex = items.findIndex((obj) => obj.id === id);
		if (items[itemIndex].item === newItem) {
			showAlert(true, 'Item was unchanged', 'danger');
		} else {
			items[itemIndex].item = newItem;
			showAlert(true, 'Item changed', 'success');
		}
	}

	function emptyList() {
		setItems([]);
		showAlert(true, 'List emptied', 'danger');
	}

	return {
		items,
		addItem,
		removeItem,
		editItem,
		emptyList,
	};
}

export default App;
