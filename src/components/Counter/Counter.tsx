interface CounterProps {
	initialValue: number;
	onChange: (value: number) => void;
}

const Counter = ({ initialValue, onChange }: CounterProps) => {
	return (
		<div className='flex items-center gap-2'>
			<button
				className='w-6 h-6 text-[#090129] font-bold border border-[#090129] rounded-full p-2 flex items-center justify-center'
				onClick={() => onChange(initialValue - 1)}
			>
				-
			</button>
			<span className='font-bold text-[#090129] text-lg border border-[#090129] px-4'>
				{initialValue}
			</span>
			<button
				className='w-6 h-6 text-[#090129] font-bold border border-[#090129] rounded-full p-2 flex items-center justify-center'
				onClick={() => onChange(initialValue + 1)}
			>
				+
			</button>
		</div>
	);
};

export default Counter;
