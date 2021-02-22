import React from "react";
import { List, Paper } from "@material-ui/core";

import TodoListItem from "../todoListItem/todoListItem";

const TodoList = ({ todos, ...props }) => {
  return (
    <div>
      {!!todos.length && (
        <Paper style={{ margin: 16 }}>
          <List>
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
