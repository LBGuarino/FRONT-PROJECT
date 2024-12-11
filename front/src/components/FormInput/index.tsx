export default function FormInput({
    name,
    label, 
    type, 
    value, 
    onChange, 
    placeholder
}: {
    name: string,
    label: string,
    type: string,
    value: string | number | readonly string[] | undefined,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    placeholder: string
}) {
  return (
    <div>
        <label htmlFor={name}>{label}</label>
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          className=''
          placeholder={placeholder}
        />
    </div>
  )
}