import { Link } from 'react-router';

const NotFound = () => {
	return (
		<div className='flex flex-col items-center justify-center h-screen bg-white gap-4'>
			<h1 className='text-4xl font-bold'>404</h1>
			<p className='text-2xl'>Página não encontrada</p>
			<Link to='/' className='text-blue-500'>
				Voltar para a página inicial
			</Link>
		</div>
	);
};

export default NotFound;
