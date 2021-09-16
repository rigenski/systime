import { useEffect, useState } from 'react';
import Input from '../components/Input';
import styles from '../styles/Home.module.css';

let timerTypes = [
  {
    name: 'pomodoro',
    minutes: 25,
    seconds: 0,
  },
  {
    name: 'short break',
    minutes: 5,
    seconds: 0,
  },
  {
    name: 'long break',
    minutes: 15,
    seconds: 0,
  },
];

export default function Home() {
  const [timerType, setTimerType] = useState(timerTypes[0].name);

  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [timer, setTimer] = useState(false);
  const [setting, setSetting] = useState(false);

  const initState = () => {
    for (let i = 0; i < timerTypes.length; i++) {
      if (timerType === timerTypes[i].name) {
        setMinutes(timerTypes[i].minutes);
        setSeconds(timerTypes[i].seconds);
        setTimer(false);
      }
    }
  };

  const selectTimerType = (e) => {
    const timerType = e.target.outerText;

    setTimerType(timerType.toLowerCase());
  };

  const onButtonStartClick = () => {
    setTimer(true);
  };

  const onButtonPauseClick = () => {
    setTimer(false);
  };

  const onButtonRepeatClick = () => {
    initState();
  };

  const onButtonSettingClick = () => {
    if (setting) {
      setSetting(false);
    } else {
      setSetting(true);
    }
  };

  useEffect(() => {
    if (timer === true) {
      let timerInterval = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        }
        if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(timerInterval);
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        }
      }, 1000);

      return () => {
        clearInterval(timerInterval);
      };
    }
  }, [timer, seconds]);

  useEffect(() => {
    initState();
  }, [timerType]);

  return (
    <>
      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.card}>
            <div className={styles.card__header}>
              {!timerType
                ? null
                : timerTypes.map((item, index) => {
                    return (
                      <a
                        key={index}
                        className={
                          item.name === timerType
                            ? styles.link__active
                            : styles.link
                        }
                        onClick={(e) => selectTimerType(e)}
                      >
                        {item.name}
                      </a>
                    );
                  })}
            </div>
            <div className={styles.card__body}>
              {minutes === 0 && seconds === 0 ? (
                <h1>00:00</h1>
              ) : (
                <h1>
                  {minutes < 10 ? `0${minutes}` : minutes}:
                  {seconds < 10 ? `0${seconds}` : seconds}
                </h1>
              )}
            </div>
            <div className={styles.card__footer}>
              <div className={styles.feature}>
                <button
                  className={styles.button__repeat}
                  onClick={() => onButtonRepeatClick()}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                {timer ? (
                  <button
                    className={styles.button__pause}
                    onClick={() => onButtonPauseClick()}
                  >
                    Pause
                  </button>
                ) : (
                  <button
                    className={styles.button__start}
                    onClick={() => onButtonStartClick()}
                  >
                    Start
                  </button>
                )}
                <button
                  className={styles.button__setting}
                  onClick={() => onButtonSettingClick()}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
              {setting ? (
                <div className={styles.addon}>
                  <h4>Timer Setting</h4>
                  <div className={styles.addon__form}>
                    {timerTypes.map((item, index) => {
                      return <Input key={index} data={item} />;
                    })}
                  </div>
                  <div className={styles.addon__action}>
                    <button className={styles.button__minimize}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M7 9a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2H9a2 2 0 01-2-2V9z" />
                        <path d="M5 3a2 2 0 00-2 2v6a2 2 0 002 2V5h8a2 2 0 00-2-2H5z" />
                      </svg>
                      <span>Minimize</span>
                    </button>
                    <button className={styles.button__background}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>Background</span>
                    </button>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
