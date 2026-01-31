/* eslint-disable react-refresh/only-export-components */
import { createContext, useEffect, useState } from "react";
import type { Category } from "../../types";
import { useFetch } from "../../hooks/useFetch";

export const CategoriesContext = createContext<{
  categories: Category[];
}>({
  categories: [],
});

export const CategoriesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const {
    data,
    error,
    fetchData,
  } = useFetch<Category[]>({
    url: "http://localhost:3001/categories",
    method: "GET",
  });

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (data) {
      setCategories(data);
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      console.error("Error fetching products:", error);
    }
  }, [error]);

  return (
    <CategoriesContext.Provider value={{ categories }}>
      {children}
    </CategoriesContext.Provider>
  );
};
