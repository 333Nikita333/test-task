import React, { FC, useState, useEffect, useRef, useCallback } from "react";
import { CategoryType } from "./types";
import CategoryList from "./components/CategoryList";

const App: FC = () => {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [newCategory, setNewCategory] = useState<string>("");
  const [isCreatingCategory, setIsCreatingCategory] = useState<boolean>(false);
  const [creatingCategory, setCreatingCategory] = useState<CategoryType | null>(
    null
  );
  const [isCancelingCategory, setIsCancelingCategory] =
    useState<boolean>(false);
  const [dragging, setDragging] = useState<boolean>(false);
  const [dragOffset, setDragOffset] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [scale, setScale] = useState(1);
  const categoryRef = useRef<HTMLDivElement | null>(null);

  const handleIncreaseScale = () => {
    setScale(scale + 0.1);
  };

  const handleDecreaseScale = () => {
    setScale(scale - 0.1);
  };

  const handleDragStart = (e: React.MouseEvent<HTMLDivElement>): void => {
    setDragging(true);
    const rect = categoryRef.current?.getBoundingClientRect();
    if (rect) {
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  const handleDragEnd = (): void => {
    setDragging(false);
  };

  const handleMouseMove = useCallback(
    (e: MouseEvent): void => {
      if (dragging && categoryRef.current) {
        const newX = e.clientX - dragOffset.x;
        const newY = e.clientY - dragOffset.y;
        categoryRef.current.style.left = `${newX}px`;
        categoryRef.current.style.top = `${newY}px`;
      }
    },
    [dragOffset.x, dragOffset.y, dragging]
  );

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleDragEnd);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleDragEnd);
    };
  }, [dragging, handleMouseMove]);

  const handleAddCategory = (): void => {
    if (newCategory.trim() !== "") {
      const newCategoryData: CategoryType = {
        name: newCategory,
        subCategories: [],
      };

      if (creatingCategory) {
        if (!isCancelingCategory) {
          creatingCategory.subCategories.push(newCategoryData);
        }
        setCreatingCategory(null);
        setIsCancelingCategory(false);
      } else {
        setCategories([...categories, newCategoryData]);
      }

      setNewCategory("");
      setIsCreatingCategory(false);
    }
  };

  const handleCancelCategory = (): void => {
    setIsCancelingCategory(true);
    setIsCreatingCategory(false);
  };

  const handleDeleteCategory = (categoryToDelete: CategoryType): void => {
    const deleteCategoryRecursively = (categoryArray: CategoryType[]) => {
      categoryArray = categoryArray.filter((item) => item !== categoryToDelete);
      categoryArray.forEach((item) => {
        item.subCategories = deleteCategoryRecursively(item.subCategories);
      });
      return categoryArray;
    };

    setCategories((prevCategories) =>
      deleteCategoryRecursively(prevCategories)
    );
  };

  return (
    <div className="app">
      <div
        className="categoriesWrapper"
        ref={categoryRef}
        onMouseDown={handleDragStart}
        style={{ transform: `scale(${scale})` }}
      >
        <div className="mainContainer">
          <p>Categories</p>
          <button onClick={() => setIsCreatingCategory(true)}>
            <span>+</span>
          </button>
        </div>

        <CategoryList
          categories={categories}
          newCategory={newCategory}
          setNewCategory={setNewCategory}
          setCreatingCategory={setCreatingCategory}
          isCreatingCategory={isCreatingCategory}
          handleAddCategory={handleAddCategory}
          handleCancelCategory={handleCancelCategory}
          handleDeleteCategory={handleDeleteCategory}
        />
      </div>
      <div className="scale-buttons">
        <button onClick={handleIncreaseScale}>+</button>
        <div className="scale-value">
          {parseFloat((scale * 100).toFixed(2))}%
        </div>
        <button onClick={handleDecreaseScale}>-</button>
      </div>
    </div>
  );
};

export default App;
