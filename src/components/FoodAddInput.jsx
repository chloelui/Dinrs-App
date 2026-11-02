import { useState } from "react";

function FoodAddInput({
  existingFoods,
  onAddFood,
  suggestions = [],
  autoFocus = false,
  listId = "food-suggestions",
}) {
  const [draft, setDraft] = useState("");

  function addFood() {
    const trimmed = draft.trim();
    if (trimmed === "") return;

    // "ramen" → "Ramen"
    const food = trimmed.charAt(0).toUpperCase() + trimmed.slice(1);

    const alreadyAdded = existingFoods.some((f) => f.toLowerCase() === food.toLowerCase());
    if (!alreadyAdded) {
      onAddFood(food);
    }
    setDraft("");
  }

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      event.preventDefault(); // don't submit a surrounding <form>
      addFood();
    }
  }

  return (
    <div className="food-add-row">
      <input
        className="form-input"
        type="text"
        placeholder="Add a food..."
        aria-label="Add a favorite food"
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
        onKeyDown={handleKeyDown}
        list={suggestions.length > 0 ? listId : undefined}
        autoFocus={autoFocus}
      />
      {suggestions.length > 0 && (
        <datalist id={listId}>
          {suggestions.map((s) => (
            <option key={s} value={s} />
          ))}
        </datalist>
      )}
      <button type="button" className="btn-outline" onClick={addFood}>
        Add
      </button>
    </div>
  );
}

export default FoodAddInput;