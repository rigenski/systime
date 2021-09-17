import { useEffect, useState } from 'react';
import styles from '../styles/Input.module.css';

const Input = (props) => {
  const [minutes, setMinutes] = useState(0);

  const onInputTimerChange = (e) => {
    setMinutes(e.target.value);
  };

  useEffect(() => {
    setMinutes(props.data.minutes);
  }, []);

  return (
    <div
      className={
        !props.minimize
          ? styles.addon__input
          : styles.addon__input + ' ' + styles.addon__input_small
      }
    >
      <label htmlFor={props.data.name}>{props.data.name}</label>
      <input
        type="number"
        id={props.data.name}
        value={minutes}
        onChange={(e) => onInputTimerChange(e)}
      />
    </div>
  );
};

export default Input;
