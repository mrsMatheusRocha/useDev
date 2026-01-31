import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import Section from '../assets/section.png';

export const Wrapper = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className='flex flex-col min-h-screen bg-white'>
			<Header />
			<div className='flex flex-col items-start h-40'>
				<img
					src={Section}
					alt='section image'
					className='w-full h-full object-cover'
					style={{ objectFit: 'cover' }}
				/>
			</div>
			{children}
			<Footer />
		</div>
	);
};
