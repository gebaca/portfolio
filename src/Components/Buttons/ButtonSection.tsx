interface ButtonSectionProps {
  id: string;
  label: string;
  onClick: () => void;
}

export default function ButtonSection({
  id,
  label,
  onClick,
}: ButtonSectionProps) {
  return (
    <div id={id}>
      <button onClick={onClick}>{label}</button>
    </div>
  );
}
