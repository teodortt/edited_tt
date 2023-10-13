import { ChangeEvent } from 'react';
import styles from './input.module.scss';
import clsx from 'clsx';

interface InputProps {
  type?: string;
  value: string | number;
  onChange: (value: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  readOnly?: boolean;
  autoComplete?: string;
}

const Input = ({
  type,
  onChange,
  value,
  placeholder,
  required,
  readOnly,
  autoComplete,
}: InputProps) => {
  return (
    <input
      className={clsx(styles.input, { [styles.readOnly]: readOnly })}
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      required={required}
      readOnly={readOnly}
      autoComplete={autoComplete}
    />
  );
};
export default Input;
