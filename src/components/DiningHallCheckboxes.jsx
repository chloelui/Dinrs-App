import { DINING_HALLS } from "../data/diningHalls";

function DiningHallCheckboxes({ selected, onChange }) {
  function handleToggle(hall) {
    if (selected.includes(hall)) {
      onChange(selected.filter((h) => h !== hall));
    } else {
      onChange([...selected, hall]);
    }
  }

  return (
    <>
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
    </>
  );
}

export default DiningHallCheckboxes;