import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export const TodoList = ({items, deleteTaskCallback}) => {
  return (
    <div>
      <ul className="todoList" style={{"listStyleType": "none"}}>
          {items.map((item, index) => (
                  <li key={index} style={{border: "1px solid black", padding: "10px", margin: "10px"}}>
                      <p color="red" style={{"textAlign": "left"}}>
                        <strong>Title: </strong>{item.title}
                      </p>
                      <p color="red" style={{"textAlign": "left"}}>
                        <strong>Description: </strong>{item.description}
                      </p>
                      <button 
                        className="btn btn-outline-primary mx-2 mb-2"
                        style={{
                          "borderRadius": "50px",
                          "fontWeight": "bold"
                        }}
                        onClick={() => deleteTaskCallback(item.title)}
                      >
                        Delete task
                      </button>
                  </li>
          ))}
      </ul>
    </div>
  );
}