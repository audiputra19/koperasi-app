type AccessSwitchProps = {
  feature: 'delete' | 'date_cashier';
  currentValue: boolean;
  onChange: (newValue: boolean) => void;
};

const AccessSwitch: React.FC<AccessSwitchProps> = ({
  feature,
  currentValue,
  onChange,
}) => {
  return (
    <label className="flex items-center gap-2 cursor-pointer">
      <span className="capitalize">{feature}</span>
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