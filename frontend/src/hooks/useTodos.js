import axios from "axios";
import { useState, useEffect } from "react";
export const useTodos = (initialValue = []) => {
    const [todos, setTodos] = useState(initialValue);
    async function fetchTodos() {
        const response = await axios.get(process.env.REACT_APP_API_URL + "/tasks");
        setTodos(response.data);
    }
    
    useEffect(() => {
        fetchTodos();
    }, []);

    async function addTodo(title) {
        try {
            await axios.post(process.env.REACT_APP_API_URL + "/tasks", { title });
            fetchTodos();
        } catch (e) {
            console.error("Whoops, something went wrong", e);
        }
    }
    async function updateTodo(id, checked) {
        try {
            await axios.put(process.env.REACT_APP_API_URL + "/tasks/" + id, {
                checked: !checked,
            });
            setTodos(
                todos.map((todo) =>
                    todo.id === id ? { ...todo, checked: !checked } : todo
                )
            );
        } catch (e) {
            console.error("Whoops, something went wrong", e);
        }
    }
    async function deleteTodo(id) {
        try {
            await axios.delete(process.env.REACT_APP_API_URL + "/tasks/" + id);
        } catch (e) {
            setTodos(todos.filter((todo) => todo.id !== id));
        }
    }
    return {
        todos,
        addTodo: (title) => {
            if (title !== "") {
                addTodo(title);
            }
        },
        updateTodo: updateTodo,
        removeTodo: deleteTodo,
    };
};
