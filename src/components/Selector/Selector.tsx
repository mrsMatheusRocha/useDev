interface SelectorProps {
	label: string;
	options: string[];
	onChange: (value: string) => void;
}

const Selector = ({ label, options, onChange }: SelectorProps) => {
	return (
		<div className='flex flex-col gap-2 w-full'>
			<select
				className='w-full p-2 text-xl text-[#090129] border border-[#090129] rounded-4xl'
				onChange={(e) => onChange(e.target.value)}
			>
				<option value='' disabled selected>
					{label}
				</option>
				{options.map((option) => (
					<option key={option} value={option}>
						{option}
					</option>
				))}
			</select>
		</div>
	);
};

export default Selector;
