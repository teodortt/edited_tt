import { ChangeEvent } from 'react';
import styles from './input.module.scss';

interface InputProps {
  type?: string;
  value: string | number;
  onChange: (value: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

const Input = ({ type, onChange, value, placeholder }: InputProps) => {
  return (
    <input
      className={styles.input}
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
    />
  );
};
export default Input;
