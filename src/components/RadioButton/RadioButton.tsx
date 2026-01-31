interface RadioButtonProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  checked: boolean;
  name: string;
}

const RadioButton = ({ label, value, onChange, checked, name = 'radio-button' }: RadioButtonProps) => {
  return (
    <div className="flex items-center gap-2 w-full cursor-pointer">
      <input type="radio" value={value} onChange={() => onChange(value)} checked={checked} name={name} id={value} />
      <label className="text-xl text-[#090129] cursor-pointer" htmlFor={value}>{label}</label>
    </div>
  );
};

export default RadioButton;
