import { useState } from "react";

function FoodChipInput({ foods, onFoodsChange }) {
    const [draft, setDraft] = useState("");

    function addFood() {
        const trimmed = draft.trim();
        if (trimmed === "") return;

        const food = trimmed.charAt(0).toUpperCase() + trimmed.slice(1);

        const alreadyAdded = foods.some((f) => f.toLowerCase() === food.toLowerCase());
        if (!alreadyAdded) {
            onFoodsChange([...foods, food]);
        }
        setDraft("");
    }

    function removeFood(foodToRemove) {
        onFoodsChange(foods.filter((f) => f !== foodToRemove));
    }

    function handleKeyDown(event) {
        if (event.key === "Enter") {
            event.preventDefault();     // prevent from automatically submitting whole form
            addFood();
        }
    }

    return (
        <div>
            {foods.length > 0 && (
                <div className="chip-row">
                    {foods.map((food) => (
                        <span key={food} className="chip">
                            {food}
                            <button
                                type="button"
                                className="chip-remove"
                                onClick={() => removeFood(food)}
                                aria-label={`Remove ${food}`}
                            >
                                ×
                            </button>
                        </span>
                    ))}
                </div>
            )}

            <div className="food-add-row">
                <input
                    className="form-input"
                    type="text"
                    placeholder="Add a food..."
                    value={draft}
                    onChange={(event) => setDraft(event.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <button type="button" className="btn-outline" onClick={addFood}>
                    Add
                </button>
            </div>
        </div>
    );
}

export default FoodChipInput