import Logo from '../../assets/primary.png';
import Cart from '../../assets/cart.svg';
import { useNavigate } from 'react-router';

const Header = () => {
	const navigate = useNavigate();
	return (
		<div className='flex justify-between items-center p-4 w-full bg-white px-20 fixed top-0 left-0 right-0 z-50'>
			<div>
				<img
					src={Logo}
					alt='logo'
					className='cursor-pointer'
					onClick={() => {
						navigate('/');
					}}
				/>
			</div>
			<div>
				<img
					src={Cart}
					alt='cart'
					className='w-6 h-6 cursor-pointer'
					onClick={() => {
						navigate('/cart');
					}}
				/>
			</div>
		</div>
	);
};

export default Header;
