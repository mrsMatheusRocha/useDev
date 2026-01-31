import RadioButton from "./RadioButton";

interface RadioGroupProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  name?: string;
}

const RadioGroup = ({
  options,
  value,
  onChange,
  name = "radio-group",
}: RadioGroupProps) => {
  return (
    <div className="flex flex-wrap gap-3">
      {options.map((option) => (
        <RadioButton
          key={option}
          label={option.charAt(0).toUpperCase() + option.slice(1)}
          name={name}
          value={option}
          checked={value === option}
          onChange={onChange}
        />
      ))}
    </div>
  );
};

export default RadioGroup;
