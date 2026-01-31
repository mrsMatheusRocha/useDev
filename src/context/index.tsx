/* eslint-disable react-refresh/only-export-components */
import { useContext } from 'react';
import { CartContext, CartProvider } from './cart';
import { CategoriesContext, CategoriesProvider } from './categories';
import { ProductsContext, ProductsProvider } from './products';

export const useCategories = () => {
	return useContext(CategoriesContext);
};

export const useProducts = () => {
	return useContext(ProductsContext);
};

export const useCart = () => {
	return useContext(CartContext);
};

export const ContextProvider = ({ children }: { children: React.ReactNode }) => {
	return (
		<CartProvider>
			<CategoriesProvider>
				<ProductsProvider>{children}</ProductsProvider>
			</CategoriesProvider>
		</CartProvider>
	);
};
