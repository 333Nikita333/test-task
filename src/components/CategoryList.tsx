import { FC, Dispatch, SetStateAction } from "react";
import { CategoryType } from "../types";
import CategoryItem from "./CategoryItem";
import CategoryAddForm from "./CategoryAddForm";

interface CategoryListProps {
  categories: CategoryType[];
  newCategory: string;
  setNewCategory: (newCategory: string) => void;
  isCreatingCategory: boolean;
  setCreatingCategory: Dispatch<SetStateAction<CategoryType | null>>;
  handleAddCategory: () => void;
  handleCancelCategory: () => void;
  handleDeleteCategory: (categoryToDelete: CategoryType) => void;
}

const CategoryList: FC<CategoryListProps> = ({
  categories,
  newCategory,
  setNewCategory,
  isCreatingCategory,
  setCreatingCategory,
  handleAddCategory,
  handleCancelCategory,
  handleDeleteCategory,
}) => {
  return (
    <div className="categoryList">
      {categories.map((category, index) => (
        <CategoryItem
          key={index}
          category={category}
          setCreatingCategory={setCreatingCategory}
          onDeleteCategory={handleDeleteCategory}
        />
      ))}

      {isCreatingCategory && (
        <CategoryAddForm
          newCategory={newCategory}
          setNewCategory={setNewCategory}
          handleAddCategory={handleAddCategory}
          handleCancelCategory={handleCancelCategory}
        />
      )}
    </div>
  );
};

export default CategoryList;
