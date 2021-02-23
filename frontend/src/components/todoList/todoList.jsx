import React from "react";
import { CircularProgress, List, ListItem, Paper } from "@material-ui/core";

import TodoListItem from "../todoListItem/todoListItem";

const TodoList = ({ todos, newTodoLoading, ...props }) => {
  return (
    <div>
      {!!todos.length && (
        <Paper style={{ margin: 16 }}>
          <List>
            {newTodoLoading && (
              <ListItem
                divider={true}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {" "}
                <CircularProgress />
              </ListItem>
            )}
            {todos.map((todo, idx) => (
              <TodoListItem
                {...todo}
                key={todo.id}
                divider={idx !== todos.length - 1}
                onButtonClick={() => props.onItemRemove(todo.id)}
                onCheckBoxToggle={() =>
                  props.onItemCheck(todo.id, todo.checked)
                }
              />
            ))}
          </List>
        </Paper>
      )}
    </div>
  );
};

export default TodoList;
