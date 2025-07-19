import { useState } from 'react';
import './App.css';
import Todo from './components/Todo';
import TodoForm from './components/TodoForm';
import Search from './components/Search';
import Filter from './components/Filter';

function App()   {
  const [todos, setTodos] = useState([
    {
      id: 1,
      text: "Criar funcionalidade x no sistema",
      category: "Trabalho",
      isCompleted: false,
    },
    {
      id: 2,
      text: "Ir pra academia",
      category: "Pessoal",
      isCompleted: false,
    },
    {
      id: 3,
      text: "Estudar React",
      category: "Estudos",
      isCompleted: false,
    },

  ]);
  
  const[search, setSearch] = useState('');

  const [filter,setFilter]  = useState('all');
  const [sort, setSort] = useState('asc');

  // Debug: log quando sort muda
  console.log('Estado atual de sort:', sort);

  const addTodo = (text, category) => {
    console.log('addTodo chamado com:', text, category);
    const newTodo = {
      id: Math.floor(Math.random() * 1000),
      text,
      category,
      isCompleted: false,
    };
    console.log('Nova tarefa criada:', newTodo);
    setTodos([...todos, newTodo]);
    console.log('Todos atualizados');
  };

 const removeTodo = (id) => {
  const filteredTodos = todos.filter(todo => todo.id !== id);
  setTodos(filteredTodos);
 };


const completeTodo = (id) => {
  const updatedTodos = todos.map(todo =>
    todo.id === id
      ? { ...todo, isCompleted: !todo.isCompleted }
      : todo
  );
  setTodos(updatedTodos);
};

  return (
    <div className="App">
      <h1>Lista de tarefas</h1>
      <Search search={search} setSearch={setSearch}/>
      <Filter filter={filter} setFilter={setFilter} sort={sort} setSort={setSort}/>
      <div className="todo-list">
        {todos
          .filter((todo) =>
            filter === "all"
          ? true
          : filter === "completed"
          ? todo.isCompleted
          : !todo.isCompleted
          )
          .filter((todo) => todo.text.toLowerCase().includes(search.toLowerCase()))
          .sort((a, b) => {
            console.log('Ordenando:', sort, 'Comparando:', a.text, 'vs', b.text);
            return sort === "asc"
              ? a.text.localeCompare(b.text)
              : b.text.localeCompare(a.text);
          })
          .map((todo) => (
          <Todo
          key={todo.id}
          todo={todo}
          removeTodo={removeTodo}
          completeTodo={completeTodo}/>
        ))}
      </div>
      <TodoForm addTodo={addTodo} />
    </div>
  );
}

export default App
