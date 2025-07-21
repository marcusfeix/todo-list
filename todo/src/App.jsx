import { useState, useEffect } from 'react';
import './App.css';
import Todo from './components/Todo';
import TodoForm from './components/TodoForm';
import Search from './components/Search';
import Filter from './components/Filter';

function App()   {
  // Função para carregar todos do localStorage
  const loadTodosFromStorage = () => {
    try {
      const savedTodos = localStorage.getItem('todos');
      if (savedTodos) {
        return JSON.parse(savedTodos);
      }
    } catch (error) {
      console.error('Erro ao carregar todos do localStorage:', error);
    }

    // Retorna todos padrão se não houver dados salvos
    return [
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
    ];
  };

  const [todos, setTodos] = useState(loadTodosFromStorage);
  
  const[search, setSearch] = useState('');

  const [filter,setFilter]  = useState('all');
  const [sort, setSort] = useState('asc');

  // Função para salvar todos no localStorage
  const saveTodosToStorage = (todosToSave) => {
    try {
      localStorage.setItem('todos', JSON.stringify(todosToSave));
      console.log('Todos salvos no localStorage:', todosToSave);
    } catch (error) {
      console.error('Erro ao salvar todos no localStorage:', error);
    }
  };

  // useEffect para salvar todos no localStorage sempre que mudar
  useEffect(() => {
    saveTodosToStorage(todos);
  }, [todos]);



  const addTodo = (text, category) => {
    const newTodo = {
      id: Math.floor(Math.random() * 10000), // Aumentei o range para evitar IDs duplicados
      text,
      category,
      isCompleted: false,
    };
    setTodos([...todos, newTodo]);
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

const clearAllTodos = () => {
  if (window.confirm('Tem certeza que deseja limpar todas as tarefas? Esta ação não pode ser desfeita.')) {
    setTodos([]);
    localStorage.removeItem('todos');
  }
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

      {todos.length > 0 && (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <button
            onClick={clearAllTodos}
            style={{
              backgroundColor: '#dc2626',
              color: 'white',
              padding: '8px 16px',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            🗑️ Limpar todas as tarefas
          </button>
        </div>
      )}
    </div>
  );
}

export default App
