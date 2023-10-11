import { FC } from "react";

interface CategoryAddFormProps {
  newCategory: string;
  setNewCategory: (newCategory: string) => void;
  handleAddCategory: () => void;
  handleCancelCategory: () => void;
}

const CategoryAddForm: FC<CategoryAddFormProps> = ({
  newCategory,
  setNewCategory,
  handleAddCategory,
  handleCancelCategory,
}) => {
  return (
    <div className="containerAddCategory">
      <input
        className="inputAddCategory"
        type="text"
        value={newCategory}
        onChange={(e) => setNewCategory(e.target.value)}
      />
      <div className="buttonsAddCategory">
        <button onClick={handleAddCategory}>👍</button>
        <button onClick={handleCancelCategory}>👎</button>
      </div>
    </div>
  );
};

export default CategoryAddForm;
