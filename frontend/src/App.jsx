import React from "react";

import TodoList from "./components/todoList";
import AddTodo from "./components/addTodo";
import Layout from "./components/layout";

import { useInputValue } from "./hooks/useInputValue";
import { useTodos } from "./hooks/useTodos";

const App = () => {
  const { inputValue, changeInput, clearInput, keyInput } = useInputValue();
  const { todos, addTodo, updateTodo, removeTodo } = useTodos();
  const clearInputAndAddTodo = (_) => {
    clearInput();
    addTodo(inputValue);
  };

  return (
    <Layout>
      <TodoList
        todos={todos}
        onItemCheck={updateTodo}
        onItemRemove={removeTodo}
      />
      <AddTodo
        inputValue={inputValue}
        onInputChange={changeInput}
        onButtonClick={clearInputAndAddTodo}
        onInputKeyPress={(event) => keyInput(event, clearInputAndAddTodo)}
      />
    </Layout>
  );
};

export default App;
