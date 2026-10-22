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
}

export default App
