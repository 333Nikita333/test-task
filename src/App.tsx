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
  const categoryRef = useRef<HTMLDivElement | null>(null);

  const handleDragStart = (e: React.MouseEvent<HTMLDivElement>) => {
    setDragging(true);
    const rect = categoryRef.current?.getBoundingClientRect();
    if (rect) {
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  const handleDragEnd = () => {
    setDragging(false);
  };

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
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

  const handleAddCategory = () => {
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

  const handleCancelCategory = () => {
    setIsCancelingCategory(true);
    setIsCreatingCategory(false);
  };

  const handleDeleteCategory = (categoryToDelete: CategoryType) => {
    const updatedCategories = categories.filter(
      (category) => category !== categoryToDelete
    );
    setCategories(updatedCategories);
  };

  return (
    <div className="app">
      <div
        className="categoriesWrapper"
        ref={categoryRef}
        onMouseDown={handleDragStart}
      >
        <div className="mainContainer">
          <p>Categories</p>
          <button onClick={() => setIsCreatingCategory(true)}>
            Add Category
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
    </div>
  );
};

export default App;
