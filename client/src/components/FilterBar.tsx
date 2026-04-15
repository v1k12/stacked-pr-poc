type Filter = "all" | "active" | "completed";

interface Props {
  filter: Filter;
  onFilterChange: (filter: Filter) => void;
  search: string;
  onSearchChange: (search: string) => void;
  totalCount: number;
  activeCount: number;
}

export default function FilterBar({
  filter,
  onFilterChange,
  search,
  onSearchChange,
  totalCount,
  activeCount,
}: Props) {
  return (
    <div className="filter-bar">
      <input
        type="text"
        placeholder="Search todos..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        className="search-input"
      />
      <div className="filter-buttons">
        <button
          className={filter === "all" ? "active" : ""}
          onClick={() => onFilterChange("all")}
        >
          All ({totalCount})
        </button>
        <button
          className={filter === "active" ? "active" : ""}
          onClick={() => onFilterChange("active")}
        >
          Active ({activeCount})
        </button>
        <button
          className={filter === "completed" ? "active" : ""}
          onClick={() => onFilterChange("completed")}
        >
          Done ({totalCount - activeCount})
        </button>
      </div>
    </div>
  );
}
