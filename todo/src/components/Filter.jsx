
const Filter = ({ filter, setFilter, sort, setSort }) => {
  return (
    <div className="filter ">
        <h2>Filtrar:</h2>
        <div className="filter-options">
        <div>
            <p>Status</p>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">Todas</option>
            <option value="completed">Concluídas</option>
            <option value="incompleted">Pendentes</option>
        </select>
        </div>
        <div>
            <p>Ordem alfabetica:</p>
            <button
              onClick={() => setSort("asc")}
              className={sort === "asc" ? "active" : ""}
            >
              Asc
            </button>
            <button
              onClick={() => setSort("desc")}
              className={sort === "desc" ? "active" : ""}
            >
              Desc
            </button>
        </div>
    </div>
    </div>
  )
}

export default Filter