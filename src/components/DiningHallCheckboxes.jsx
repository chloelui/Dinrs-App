import { DINING_HALLS } from "../data/diningHalls";

const COLUMNS = 3;

function DiningHallCheckboxes({ selected, onChange }) {
  function handleToggle(hall) {
    if (selected.includes(hall)) {
      onChange(selected.filter((h) => h !== hall));
    } else {
      onChange([...selected, hall]);
    }
  }

  // columns of 7, 7, and 5
  const rows = Math.ceil(DINING_HALLS.length / COLUMNS);

  return (
    <div className="checkbox-grid" style={{ "--rows": rows }}>
      {DINING_HALLS.map((hall) => (
        <label key={hall} className="checkbox-row">
          <input
            type="checkbox"
            checked={selected.includes(hall)}
            onChange={() => handleToggle(hall)}
          />
          {hall}
        </label>
      ))}
    </div>
  );
}

export default DiningHallCheckboxes;