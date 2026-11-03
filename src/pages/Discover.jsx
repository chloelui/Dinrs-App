import { useState, useEffect } from "react";
import StudentCard from "../components/StudentCard";
import { students } from "../data/students";

const diningHallOptions = [...new Set(students.flatMap((s) => s.halls))].sort();
const foodOptions = [...new Set(students.flatMap((s) => s.foods))].sort();
const yearOptions = ["Freshman", "Sophomore", "Junior", "Senior", "Graduate"];

const PAGE_SIZE = 8;

function Discover({ isLoggedIn }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({ diningHall: "", foodType: "", year: "" });
  const [connectedIds, setConnectedIds] = useState([]);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  useEffect(() => {
    document.title = connectedIds.length > 0 ? `dinrs (${connectedIds.length} connected)` : "dinrs";
    console.log("Connected student ids:", connectedIds);
  }, [connectedIds]);

  function handleSearchChange(event) {
    setSearchTerm(event.target.value);
    setVisibleCount(PAGE_SIZE);
  }

  function handleFilterChange(event) {
    const { name, value } = event.target;
    setFilters({ ...filters, [name]: value });
    setVisibleCount(PAGE_SIZE);
  }

  function handleToggleConnect(id) {
    if (connectedIds.includes(id)) {
      setConnectedIds(connectedIds.filter((existingId) => existingId !== id)); // typo fixed
    } else {
      setConnectedIds([...connectedIds, id]);
    }
  }

  function handleLoadMore() {
    setVisibleCount(visibleCount + 4);
  }

  const search = searchTerm.trim().toLowerCase();

  const filteredStudents = students.filter((s) => {
    const matchesSearch =
      search === "" ||
      s.name.toLowerCase().includes(search) ||
      s.major.toLowerCase().includes(search) ||
      s.foods.some((food) => food.toLowerCase().includes(search)) ||
      s.halls.some((hall) => hall.toLowerCase().includes(search));
    const matchesHall = filters.diningHall === "" || s.halls.includes(filters.diningHall);
    const matchesFood = filters.foodType === "" || s.foods.includes(filters.foodType);
    const matchesYear = filters.year === "" || s.year === filters.year;
    return matchesSearch && matchesHall && matchesFood && matchesYear;
  });

  const visibleStudents = filteredStudents.slice(0, visibleCount);
  const hasMore = visibleCount < filteredStudents.length;

  return (
    <main className="page">
      <h1 className="page-title">Discover students</h1>
      <p className="page-subtitle">
        {isLoggedIn
          ? `Find people who eat where you eat. You have ${connectedIds.length} connection${connectedIds.length === 1 ? "" : "s"}.`
          : "Find people who eat where you eat."}
      </p>

      <div className="filter-bar">
        <input
          className="search-input"
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <select className="filter-pill" name="diningHall" value={filters.diningHall} onChange={handleFilterChange}>
          <option value="">Dining Hall</option>
          {diningHallOptions.map((hall) => (
            <option key={hall} value={hall}>{hall}</option>
          ))}
        </select>

        <select className="filter-pill" name="foodType" value={filters.foodType} onChange={handleFilterChange}>
          <option value="">Food Type</option>
          {foodOptions.map((food) => (
            <option key={food} value={food}>{food}</option>
          ))}
        </select>

        <select className="filter-pill" name="year" value={filters.year} onChange={handleFilterChange}>
          <option value="">Year</option>
          {yearOptions.map((y) => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>
      </div>

      {visibleStudents.length === 0 ? (
        <p className="empty-message">No students match those filters. Try clearing one.</p>
      ) : (
        <div className="card-grid">
          {visibleStudents.map((student) => (
            <StudentCard
              key={student.id}
              student={student}
              isConnected={connectedIds.includes(student.id)}
              onToggleConnect={handleToggleConnect}
            />
          ))}
        </div>
      )}

      {hasMore && (
        <div className="load-more-wrap">
          <button className="btn-outline" onClick={handleLoadMore}>Load more</button>
        </div>
      )}
    </main>
  );
}

export default Discover;