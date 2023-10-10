import { FC, useState } from "react";
import { CategoryType } from "../types";

interface CategoryItemProps {
  category: CategoryType;
  setCreatingCategory: React.Dispatch<
    React.SetStateAction<CategoryType | null>
  >;
  onDeleteCategory: (categoryToDelete: CategoryType) => void;
}

const CategoryItem: FC<CategoryItemProps> = ({
  category,
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

  const handleAddSubCategory = () => {
    if (newSubCategory.trim() !== "") {
      category.subCategories.push({
        name: newSubCategory,
        subCategories: [],
      });
      setNewSubCategory("");
      setIsCreatingSubCategory(false);
    }
  };

  const handleCancelSubCategory = () => {
    setIsCreatingSubCategory(false);
  };

  const handleEditCategory = () => {
    setIsEditingCategory(true);
  };

  const handleSaveCategory = () => {
    category.name = editedCategoryName;
    setIsEditingCategory(false);
  };

  const handleCancelEditCategory = () => {
    setIsEditingCategory(false);
    setEditedCategoryName(category.name);
  };

  const handleDeleteCategory = () => {
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
          <button className="editButton" onClick={handleSaveCategory}>
            Save
          </button>
          <button className="cancelButton" onClick={handleCancelEditCategory}>
            Cancel
          </button>
        </div>
      ) : (
        <div className="subcategoryItem">
          <div className="buttons">
            <p className="subcategoryName">{category.name}</p>
            <button className="editButton" onClick={handleEditCategory}>
              Edit
            </button>
            <button className="deleteButton" onClick={handleDeleteCategory}>
              Delete
            </button>
            {!isCreatingSubCategory && (
              <button
                className="AddCategoryButton"
                onClick={() => setIsCreatingSubCategory(true)}
              >
                Add Subcategory
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
          <button className="AddCategoryButton" onClick={handleAddSubCategory}>
            Add
          </button>
          <button
            className="AddCategoryButton"
            onClick={handleCancelSubCategory}
          >
            Cancel
          </button>
        </div>
      )}
      <div className="subCategories">
        {category.subCategories.map((subCategory, index) => (
          <CategoryItem
            key={index}
            category={subCategory}
            setCreatingCategory={setCreatingCategory}
            onDeleteCategory={onDeleteCategory}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryItem;
