/* eslint-disable react-refresh/only-export-components */
import { createContext, useEffect, useState } from "react";
import type { Product } from "../../types";
import { useFetch } from "../../hooks/useFetch";

export const ProductsContext = createContext<{
  products: Product[];
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
}>({
  products: [],
  selectedProduct: null,
  setSelectedProduct: () => {},
});

export const ProductsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { data, error, fetchData } = useFetch<Product[]>({
    url: "http://localhost:3001/products",
		method: 'GET',
  });

  useEffect(() => {
    fetchData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (data) {
      setProducts(data);
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      console.error("Error fetching products:", error);
    }
  }, [error]);

  return (
    <ProductsContext.Provider
      value={{ products, selectedProduct, setSelectedProduct }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
