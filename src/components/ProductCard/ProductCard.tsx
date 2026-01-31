import type { Product } from '../../types';
import { formatPrice } from '../../utils';

interface ProductCardProps {
	product: Product;
	hasBorder?: boolean;
	onClick?: () => void;
}

const ProductCard = ({ product, hasBorder = false, onClick }: ProductCardProps) => {
	return (
		<div
			className={`group flex flex-col gap-4 w-full bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transform transition-all hover:shadow-lg hover:-translate-y-1 ${
				hasBorder ? 'border-2 border-[#0B254B]' : ''
			}`}
			onClick={onClick}
		>
			<div className='relative overflow-hidden aspect-square'>
				<img
					src={product.image}
					alt={product.name}
					className='w-full h-full object-cover transition-transform group-hover:scale-110'
				/>
			</div>
			<div className='flex flex-col gap-2 p-4'>
				<h3 className='text-xl font-bold text-[#0B254B] orbitron-bold line-clamp-2'>
					{product.name}
				</h3>
				<p className='text-xl font-bold text-[#0B254B]'>{formatPrice(product.price)}</p>
			</div>
		</div>
	);
};

export default ProductCard;
