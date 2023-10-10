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
      <button onClick={handleAddCategory}>Add</button>
      <button onClick={handleCancelCategory}>Cancel</button>
    </div>
  );
};

export default CategoryAddForm;
