import FoodChipList from "./FoodChipList";
import FoodAddInput from "./FoodAddInput";

function FoodChipInput({ foods, onFoodsChange }) {
    return (
        <div>
            <FoodChipList
                foods={foods}
                onRemove={(food) => onFoodsChange(foods.filter((f) => f !== food))}
            />
            <FoodAddInput
                existingFoods={foods}
                onAddFood={(food) => onFoodsChange([...foods, food])}
            />
        </div>
    );
}

export default FoodChipInput;