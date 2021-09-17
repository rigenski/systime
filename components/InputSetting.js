import styles from '../styles/InputSetting.module.css';

const InputSetting = (props) => {
  const onInputTimerChange = (data) => {
    if (data.value > 0 && data.value <= 60) {
      props.onInputTimerChange(data);
    }
  };

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
        value={props.data.minutes}
        onChange={(e) => onInputTimerChange(e.target)}
      />
    </div>
  );
};

export default InputSetting;
