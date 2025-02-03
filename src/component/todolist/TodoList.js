import React, { Component } from 'react'
import './TodoList.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




export class TodoList extends Component {
    state={
        input:'',
        items:[]
    }
    handleChange=(event)=>{
        this.setState({
            input: event.target.value
        })
    }

    handleSubmit=(event)=>{
        event.preventDefault()
        const {input,items}=this.state

        // Prevent adding empty or whitespace-only tasks
        if (input.trim() === '') {
            toast.warn('Please enter a task!')
            return;
        }

        // const allItems = this.state.items

        // allItems.push(input)

        this.setState({
             // items:allItems
            items:[...items,input.trim() ],
            input: '' // Clear input field after adding item
            
        })
        toast.success('Task Addedd')

    }
    deleteItem=(key)=>{
        // const allItems=this.state.items

        // allItems.splice(key,1)

        this.setState({
            // items:allItems
            items:this.state.items.filter((data,index)=>index !== key)
        })
        toast.error('Task Deleted!')
    }
    render() {
        const{input,items}=this.state
        console.log(input,items);
        
        return (
            <div className=' mt-5  todo-container w-100 p-3 rounded'>
                


            <form  className='head p-4 rounded'>
            <h1 className='text text-center'>Todo List</h1>
                <div className='input-section d-flex '>
                    <input onChange={this.handleChange} 
                    value={input}
                    type="text"
                     className='form-control bg-light me-2 text-secondary' placeholder='Type Your Todo Here..'/>
                    <button onClick={this.handleSubmit} className='btn btn-secondary text-primary'>Add</button>
                </div>
            </form>

            <ul className='w-100 mt-2 p-0'>
                {
                items.map((data,index)=>(
                    <li key={index} className='li_items d-flex justify-content-between align-items-center p-3 mb-2 rounded'>{data}
                <i onClick={()=>this.deleteItem(index)} class="fa-solid fa-trash"></i>
                </li>
                ))
                }
                
            </ul>
            <ToastContainer />
            </div>
        )
    }
}

export default TodoList
