function FoodChipList({ foods, onRemove, children }) {
    if (foods.length === 0 && !children) return null;

    return (
        <div className="chip-row">
            {foods.map((food) => (
                <span key={food} className="chip">
                    {food}
                    {onRemove && (
                        <button type="button" className="chip-remove" onClick={() => onRemove(food)} aria-label={`Remove ${food}`}>
                            ×
                        </button>
                    )}
                </span>
            ))}
            {children}
        </div>
    );
}

export default FoodChipList;