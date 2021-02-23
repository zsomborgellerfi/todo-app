import React from "react";

import TodoList from "./components/todoList";
import AddTodo from "./components/addTodo";
import Layout from "./components/layout";

import { useInputValue } from "./hooks/useInputValue";
import { useTodos } from "./hooks/useTodos";
import { CircularProgress, Paper } from "@material-ui/core";

const App = () => {
  const { inputValue, changeInput, clearInput, keyInput } = useInputValue();
  const {
    loading,
    newTodoLoading,
    todos,
    addTodo,
    updateTodo,
    removeTodo,
  } = useTodos();
  const clearInputAndAddTodo = (_) => {
    clearInput();
    addTodo(inputValue);
  };

  return (
    <Layout>
      {!loading ? (
        <TodoList
          todos={todos}
          onItemCheck={updateTodo}
          onItemRemove={removeTodo}
          newTodoLoading={newTodoLoading}
        />
      ) : (
        <Paper
          style={{
            margin: 16,
            padding: 16,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress />
        </Paper>
      )}
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
