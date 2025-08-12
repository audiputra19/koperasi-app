type AccessSwitchProps = {
  feature: string;
  currentValue: boolean;
  onChange: (newValue: boolean) => void;
};

const AccessSwitch: React.FC<AccessSwitchProps> = ({
  feature,
  currentValue,
  onChange,
}) => {
  return (
    <label className="flex justify-between items-center cursor-pointer">
      <span className="capitalize text-sm">{feature}</span>
      <input
        type="checkbox"
        checked={currentValue}
        onChange={(e) => onChange(e.target.checked)}
        className="toggle toggle-info"
      />
    </label>
  );
};

export default AccessSwitch;