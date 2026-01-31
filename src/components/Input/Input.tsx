import type { InputHTMLAttributes } from 'react';
import withForm from '../withForm';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	label: string;
}

const Input = ({ label, ...props }: InputProps) => {
	return (
		<div>
			<label htmlFor={props.id} className='text-xl font-bold'>
				{label}
			</label>
			<input
				{...props}
				className='text-xl text-[#090129] w-full p-4 rounded-4xl border active:border-[#090129] focus:border-[#090129] border-[#FF55DF]'
			/>
		</div>
	);
};

const EnhancedInput = withForm(Input);

export default EnhancedInput;
