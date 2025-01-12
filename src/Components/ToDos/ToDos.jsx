import React, { useState } from 'react';
import '../common.css';
import './ToDos.css';
import { toBeInTheDOM } from '@testing-library/jest-dom/dist/matchers';

export default function ToDos() {
  const [todo, setTodo] = useState({
    title: "",
    description: ""
  });

  const onInputChange = (e) => {
    let titleVal = e.target.name;
    let descVal = e.target.value;
    setTodo({
      ...todo,
      [titleVal]: descVal
    });
  }

  const addTodos = () => {
    alert(`${todo.title}: ${todo.description}`);
  }

  const clearInput = () => {
    setTodo({
      title: "",
      description: ""
    });
  }
  
  return (
    <>
      <div className="">
        <div className="all-center-container bg-white">
          <div className="card">
            <div className="card-body m-5">
              <h3 className="card-title">Add ToDos:</h3>
              <div className="card-text">
                <div className="row my-2">
                  <div className="col-sm-2 col-lg-2 col-md-2 text-end">
                    <label htmlFor="title">Title:</label>
                  </div>
                  <div className="col-sm-10 col-lg-10 col-md-10">
                    <input type="text" id="title" className='form-control' title='title' name='title' value={todo.title} onChange={onInputChange} />
                  </div>
                </div>
                <div className="row my-2">
                  <div className="col-sm-2 col-lg-2 col-md-2 text-end">
                    <label htmlFor="description">Description:</label>
                  </div>
                  <div className="col-sm-10 col-lg-10 col-md-10">
                    <textarea name="description" className='form-control' id="description" value={todo.description} onChange={onInputChange} ></textarea>
                  </div>
                </div>
                <div className="my-2 text-end">
                  <button className="btn btn-add mx-3" onClick={addTodos}>Add</button>
                  <button className="btn btn-danger" onClick={clearInput}>Clear</button>
                </div>
              </div>
            </div>
          </div>

          {/* My To-Dos Table: */}
          {/* To be continued... */}
          <div className="mx-5">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">First</th>
                  <th scope="col">Last</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody class="table-group-divider">
                <tr>
                  <th scope="row">1</th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>Edit/Delete</td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>Jacob</td>
                  <td>Thornton</td>
                  <td>@fat</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}
