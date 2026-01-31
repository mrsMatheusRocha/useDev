import type { ButtonHTMLAttributes } from 'react';
import CartIcon from '../../assets/add-cart.svg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: React.ReactNode;
	variant?: 'primary' | 'secondary' | 'add-to-cart';
}

const Button = ({ children, variant = 'primary', ...props }: ButtonProps) => {
	const styles: Record<string, string> = {
		primary: 'bg-[#780BF7] hover:bg-[#430091] text-white',
		secondary: 'text-[#090129] bg-transparent border border-[#780BF7] hover:border-[#430091]',
		'add-to-cart': 'bg-[#780BF7] hover:bg-[#430091] text-white',
	};
	return (
		<button
			{...props}
			className={`${styles[variant]} px-4 py-2 rounded-4xl flex items-center gap-2`}
		>
			{variant === 'add-to-cart' && <img src={CartIcon} alt='add-to-cart' className='w-4 h-4' />}
			{children}
		</button>
	);
};

export default Button;
