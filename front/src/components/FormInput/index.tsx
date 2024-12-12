import styles from './index.module.css';

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
    <div className='flex flex-col'>
        <label className={styles.label} htmlFor={name}>{label}</label>
        <input
          className={styles.input}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
    </div>
  )
}