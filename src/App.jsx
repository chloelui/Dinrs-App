import { useState, useEffect } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import StudentCard from "./components/StudentCard";

const students = [
  { id: 1, name: "Alex Rivera", year: "Sophomore", major: "Biology", halls: ["Elder Hall", "Buen Día"], foods: ["Ramen", "Dumplings"] },
  { id: 2, name: "Priya Shah", year: "Junior", major: "Economics", halls: ["Sargent Hall", "Noriteo Chicken & Boba"], foods: ["Curry", "Pho"] },
  { id: 3, name: "Marcus Lee", year: "Freshman", major: "Engineering", halls: ["Allison Hall", "Café Coralie"], foods: ["Pizza", "Wings"] },
  { id: 4, name: "Sofia Reyes", year: "Senior", major: "Journalism", halls: ["Forno Pizza Co."], foods: ["Burritos", "Wings"] },
  { id: 5, name: "Jordan Kim", year: "Sophomore", major: "Psychology", halls: ["Plex East Hall"], foods: ["Ramen", "Smoothies"] },
  { id: 6, name: "Emma Walker", year: "Junior", major: "Chemistry", halls: ["Shake Smart", "Café Bergson"], foods: ["Salads", "Bagels"] },
  { id: 7, name: "Tyrone Brooks", year: "Freshman", major: "Business", halls: ["Plex West Hall", "847 Burger"], foods: ["Burgers", "Pho"] },
  { id: 8, name: "Hana Sato", year: "Graduate", major: "Public Health", halls: ["Starbucks"], foods: ["Ramen", "Smoothies"] },
  { id: 9, name: "Noah Patel", year: "Sophomore", major: "Math", halls: ["Wildcat Deli", "Fran's Café"], foods: ["Pizza", "Burgers"] },
  { id: 10, name: "Lily Chen", year: "Junior", major: "Art", halls: ["Luna's Pub & Grill"], foods: ["Bagels", "Salads"] },
  { id: 11, name: "Diego Torres", year: "Senior", major: "Nursing", halls: ["Tech Express", "Protein Bar & Kitchen"], foods: ["Burritos", "Ramen"] },
  { id: 12, name: "Aisha Khan", year: "Freshman", major: "Biology", halls: ["Elder Hall", "Lisa's Café"], foods: ["Curry", "Pho"] },
];

const diningHallOptions = [...new Set(students.flatMap((s) => s.halls))].sort();
const foodOptions = [...new Set(students.flatMap((s) => s.foods))].sort();
const yearOptions = ["Freshman", "Sophomore", "Junior", "Senior", "Graduate"];

const PAGE_SIZE = 8;

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({ diningHall: "", foodType: "", year: ""});
  const [connectedIds, setConnectedIds] = useState([]);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  useEffect(() => {
    document.title = connectedIds.length > 0 ? `dinrs (${connectedIds.length} connected)` : "dinrs";
    console.log("Connected student ids:", connectedIds);
  }, [connectedIds]);

  function handleToggleLogin() {
    setIsLoggedIn(!isLoggedIn);
  }

  function handleSearchChange(event) {
    setSearchItem(event.target.value);
    setVisibleCount(PAGE_SIZE);
  }

  function handleFilterChange(event) {
    const { name, value } = event.target;
    setFilters({ ...filters, [name]: value });
    setVisibleCount(PAGE_SIZE);
  }

  function handleToggleConnect(id) {
    if (connectedIds.includes(id)) {
      setConnectedIds(connectedIds.filter((exstingId) => existingId !== id));
    } else {
      setConnectedIds([...connectedIds, id]);
    }
  }

  function handleLoadMore() {
    setVisibleCount(visibleCount + 4);
  }

  const search = searchTerm.trim().toLowerCase();

  const filteredStudents = students.filter((s) => {
    const matchesSearch = search === "" || s.name.toLowerCase().includes(search) || s.major.toLowerCase().includes(search);
    const matchesHall = filters.diningHall === "" || s.halls.includes(filters.diningHall);
    const matchesFood = filters.foodType === "" || s.foods.includes(filters.foodType);
    const matchesYear = filters.year === "" || s.year === filters.year;
    return matchesSearch && matchesHall && matchesFood && matchesYear;
  });

  const visibleStudents = filteredStudents.slice(0, visibleCount);
  const hasMore = visibleCount < filteredStudents.length;

  return (
    <div className="app">
      <NavBar isLoggedIn={isLoggedIn} onToggleLogin={handleToggleLogin} />

      <main className="page">
        <h1 className="page-title">Discover students</h1>
        <p className="page-subtitle">
          {isLoggedIn ? `Find people who eat where you eat. You have ${connectedIds.length} connection${connectedIds.length === 1 ? "" : "s"}.` : "Find people who eat where you eat."}
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

        {hsaMore && (
          <div className="load-more-wrap">
            <button className="btn-outline" onClick={handleLoadMore}>Load more</button>
          </div>
        )}
      </main>

      <footer className="footer">
        <div>
          <div className="footer-logo">dinrs</div>
          <p className="footer-tagline">Meet students who eat where you eat.</p>
        </div>
        <nav className="footer-links">
          <a href="#">About</a>
          <a href="#">Safety</a>
          <a href="#">Contact</a>
        </nav>
        <p className="footer-copy">© 2026 dinrs. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App
