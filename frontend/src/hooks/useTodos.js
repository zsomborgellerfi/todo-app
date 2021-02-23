import axios from "axios";
import { useState, useEffect } from "react";
import { API_URL } from "../lib/constants";
export const useTodos = (initialValue = []) => {
    const [todos, setTodos] = useState(initialValue);
    const [loading, setLoading] = useState(false);
    const [newTodoLoading, setNewTodoLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetchTodos();
    }, []);

    async function fetchTodos() {
        try {
            const response = await axios.get(
                API_URL + "/todos"
            );
            setTodos(response.data);
        } catch (e) {
            console.error("Whoops, something went wrong", e);
        } finally {
            setLoading(false);
            setNewTodoLoading(false)
        }
    }

    async function addTodo(title) {
        setNewTodoLoading(true);
        try {
            await axios.post(
                API_URL + "/todos",
                { title }
            );
            fetchTodos();
        } catch (e) {
            console.error("Whoops, something went wrong", e);
        }
    }
    async function updateTodo(id, checked) {
        try {
            setTodos(
                todos.map((todo) =>
                    todo.id === id ? { ...todo, checked: !checked } : todo
                )
            );
            await axios.put(
                API_URL +
                "/todos/" +
                id,
                {
                    checked: !checked,
                }
            );

        } catch (e) {
            console.error("Whoops, something went wrong", e);
        } finally {
            setLoading(false);
        }
    }
    async function deleteTodo(id) {
        try {
            setTodos(todos.filter((todo) => todo.id !== id));
            await axios.delete(
                API_URL +
                "/todos/" +
                id
            );
        } catch (e) {
            console.error("Whoops, something went wrong", e);
        }
    }
    return {
        loading,
        newTodoLoading,
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
