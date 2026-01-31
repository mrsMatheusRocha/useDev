import type { AnchorHTMLAttributes } from 'react';

interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
	children: React.ReactNode;
}

const Link = ({ children, ...props }: LinkProps) => {
	return (
		<a className='text-[#780BF7] hover:text-[#430091] underline text-xl' {...props}>
			{children}
		</a>
	);
};

export default Link;
