import { useState, type InputHTMLAttributes } from 'react';
import SearchIcon from '../../assets/search.svg';

interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
	placeholder: string;
	onSearch: (search: string) => void;
}

const SearchInput = ({ placeholder, ...props }: SearchInputProps) => {
	const [search, setSearch] = useState('');

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value);
	};

	const handleSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			e.preventDefault();
			props.onSearch(search);
		}
	};

	return (
		<div className='flex items-center gap-2 w-full relative'>
			<input
				{...props}
				placeholder={placeholder}
				className='w-full p-4 text-xl text-[#090129] rounded-4xl border bg-[#EFEFEF] focus:border-[#FF55DF] active:border-[#FF55DF] placeholder:text-[#090129]'
				onChange={handleSearch}
				onKeyDownCapture={handleSubmit}
			/>
			<img
				src={SearchIcon}
				alt='search'
				className='w-6 h-6 cursor-pointer absolute right-4 top-1/2 -translate-y-1/2'
				onClick={() => props.onSearch(search)}
			/>
		</div>
	);
};

export default SearchInput;
