import React, { Component } from 'react'
import './TodoList.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export class TodoList extends Component {
    state = {
        input: '',
        items: [],
        editIndex: null // Track which task is being edited
    }

    handleChange = (event) => {
        this.setState({
            input: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const { input, items, editIndex } = this.state;

        // Prevent adding empty or whitespace-only tasks
        if (input.trim() === '') {
            toast.warn('Please enter a task!');
            return;
        }

        if (editIndex !== null) {
            // If editing, update the specific item
            const updatedItems = [...items];
            updatedItems[editIndex] = input.trim();
            this.setState({
                items: updatedItems,
                input: '',
                editIndex: null // Reset edit state
            });
            toast.info('Task Updated!');
        } else {
            // Otherwise, add a new task
            this.setState({
                items: [...items, input.trim()],
                input: ''
            });
            toast.success('Task Added!');
        }
    }

    deleteItem = (index) => {
        this.setState({
            items: this.state.items.filter((_, i) => i !== index),
            editIndex: null // Reset edit state if deleting an item
        });
        toast.error('Task Deleted!');
    }

    handleEdit = (index) => {
        this.setState({
            input: this.state.items[index], // Set input field with selected task
            editIndex: index // Set index to edit mode
        });
    }

    render() {
        const { input, items, editIndex } = this.state;

        return (
            <div className='mt-5 todo-container w-100 p-3 rounded'>
                <form className='head p-4 rounded' onSubmit={this.handleSubmit}>
                    <h1 className='text text-center'>Todo List</h1>
                    <div className='input-section d-flex'>
                        <input
                            onChange={this.handleChange}
                            value={input} type="text"
                            className='form-control bg-light me-2 text-secondary'
                            placeholder={editIndex !== null ? 'Edit Your Todo Here..' : 'Type Your Todo Here..'} />
                        <button type="submit" className='btn btn-secondary text-primary'>
                            {editIndex !== null ? 'Update' : 'Add'}
                        </button>
                    </div>
                </form>

                <ul className='w-100 mt-2 p-0'>
                    {items.map((data, index) => (
                        <li key={index} className='li_items d-flex justify-content-between align-items-center p-3 mb-2 rounded'>
                            {data}
                            <div>
                                <i onClick={() => this.handleEdit(index)} className="fa-regular fa-pen-to-square text-secondary me-2"></i>
                                <i onClick={() => this.deleteItem(index)} className="fa-solid fa-trash"></i>
                            </div>
                        </li>
                    ))}
                </ul>
                <ToastContainer />
            </div>
        );
    }
}

export default TodoList;
