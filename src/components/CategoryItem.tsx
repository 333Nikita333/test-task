import { FC, Dispatch, SetStateAction, useState } from "react";
import { CategoryType } from "../types";

interface CategoryItemProps {
  category: CategoryType;
  categories: CategoryType[];
  setCreatingCategory: Dispatch<SetStateAction<CategoryType | null>>;
  onDeleteCategory: (categoryToDelete: CategoryType) => void;
}

const CategoryItem: FC<CategoryItemProps> = ({
  category,
  categories,
  setCreatingCategory,
  onDeleteCategory,
}) => {
  const [newSubCategory, setNewSubCategory] = useState<string>("");
  const [isCreatingSubCategory, setIsCreatingSubCategory] =
    useState<boolean>(false);
  const [isEditingCategory, setIsEditingCategory] = useState<boolean>(false);
  const [editedCategoryName, setEditedCategoryName] = useState<string>(
    category.name
  );

  const handleAddSubCategory = (): void => {
    if (newSubCategory.trim() !== "") {
      category.subCategories.push({
        name: newSubCategory,
        subCategories: [],
      });
      setNewSubCategory("");
      setIsCreatingSubCategory(false);
    }
  };

  const handleCancelSubCategory = (): void => {
    setIsCreatingSubCategory(false);
  };

  const handleEditCategory = (): void => {
    setIsEditingCategory(true);
  };

  const handleSaveCategory = (): void => {
    category.name = editedCategoryName;
    setIsEditingCategory(false);
  };

  const handleCancelEditCategory = (): void => {
    setIsEditingCategory(false);
    setEditedCategoryName(category.name);
  };

  const handleDeleteCategory = (): void => {
    onDeleteCategory(category);
  };

  return (
    <div className="categoryItem">
      {isEditingCategory ? (
        <div className="containerAddCategory">
          <input
            type="text"
            value={editedCategoryName}
            onChange={(e) => setEditedCategoryName(e.target.value)}
          />
          <div className="buttonsAddCategory">
            <button className="editButton" onClick={handleSaveCategory}>
              👍
            </button>
            <button className="cancelButton" onClick={handleCancelEditCategory}>
              👎
            </button>
          </div>
        </div>
      ) : (
        <div className="subcategoryItem">
          <p className="subcategoryName">{category.name}</p>
          <div className="buttons">
            <button className="editButton" onClick={handleEditCategory}>
              <span>...</span>
            </button>
            <button className="deleteButton" onClick={handleDeleteCategory}>
              <span>x</span>
            </button>
            {!isCreatingSubCategory && (
              <button
                className="addCategoryButton"
                onClick={() => setIsCreatingSubCategory(true)}
              >
                <span>+</span>
              </button>
            )}
          </div>
        </div>
      )}
      {isCreatingSubCategory && (
        <div className="wrapperAddSubCategory">
          <input
            type="text"
            value={newSubCategory}
            onChange={(e) => setNewSubCategory(e.target.value)}
          />
          <div className="buttonsAddCategory">
            <button onClick={handleAddSubCategory}>👍</button>
            <button onClick={handleCancelSubCategory}>👎</button>
          </div>
        </div>
      )}
      {categories.length > 0 && (
        <div className="subCategories">
          {category.subCategories.map((subCategory, index) => (
            <CategoryItem
              key={index}
              category={subCategory}
              categories={categories}
              setCreatingCategory={setCreatingCategory}
              onDeleteCategory={onDeleteCategory}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryItem;
