export interface Product {
	id: number;
	name: string;
	price: number;
	description: string;
	category: number;
	image: string;
	colors: string[];
	sizes: string[];
}

export interface Category {
	id: number;
	name: string;
	image: string;
}
