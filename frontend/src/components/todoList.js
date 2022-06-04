import React from 'react';

export const TodoList = ({items}) => {
  return (
    <div>
      <ul className="todoList">
          {items.map((item, index) => (
                  <li key={index}>
                      <p color="red">{item}</p>
                  </li>
          ))}
      </ul>
    </div>
  );
}