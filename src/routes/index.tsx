import { createBrowserRouter } from 'react-router';
import Home from '../screens/Home';
import { Wrapper } from './helpers';
import NotFound from '../screens/NotFound';
import Product from '../screens/Product';
import Cart from '../screens/Cart';

const router = createBrowserRouter([
	{
		path: '/',
		element: (
			<Wrapper>
				<Home />
			</Wrapper>
		),
	},
	{
		path: '/product/:id',
		element: (
			<Wrapper>
				<Product />
			</Wrapper>
		),
	},
	{
		path: '/cart',
		element: (
			<Wrapper>
				<Cart />
			</Wrapper>
		),
	},
	{
		path: '*',
		element: <NotFound />,
	},
]);

export default router;
