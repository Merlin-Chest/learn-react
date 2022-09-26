const Input = ({ value, onChange, }: any) => {
  return <input value={value} onChange={(e) => onChange(e.target.value)}></input>
}

export default Input;
