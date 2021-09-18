import { useEffect, useState } from 'react';
import CardImage from '../components/CardImage';
import InputSetting from '../components/InputSetting';
import styles from '../styles/Home.module.css';

const images = [
  {
    title: 'Cafe',
    url: 'caffe.jpg',
  },
  {
    title: 'Nature',
    url: 'nature.jpg',
  },
  {
    title: 'Beach',
    url: 'beach.jpg',
  },
  {
    title: 'City',
    url: 'city.jpg',
  },
  {
    title: 'Room',
    url: 'room.jpg',
  },
  {
    title: 'Office',
    url: 'office.jpg',
  },
];

export default function Home() {
  const [timerTypes, setTimerTypes] = useState([
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
  ]);

  const [timerType, setTimerType] = useState(timerTypes[0].name);

  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [timer, setTimer] = useState(false);
  const [setting, setSetting] = useState(false);
  const [minimize, setMinimize] = useState(false);
  const [background, setBackground] = useState(false);
  const [modal, setModal] = useState(false);
  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState([]);

  const initState = () => {
    timerTypes.map((item) => {
      if (item.name === timerType) {
        setMinutes(item.minutes);
        setSeconds(item.seconds);
        setTimer(false);
      }
    });
  };

  const onInputTimerChange = (index, data) => {
    const newTimerTypes = [...timerTypes];

    newTimerTypes[index] = {
      name: data.id,
      minutes: data.value,
      seconds: 0,
    };

    setTimerTypes(newTimerTypes);
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
    } else if (!setting && background) {
      setSetting(false);
      setBackground(false);
    } else {
      setSetting(true);
    }
  };

  const onButtonMinimizeClick = () => {
    if (minimize) {
      setMinimize(false);
      setModal(false);
    } else {
      setMinimize(true);
    }

    setSetting(false);
  };

  const onButtonBackgroundClick = () => {
    if (background) {
      setBackground(false);
    } else {
      setBackground(true);
    }

    setSetting(false);
  };

  const onButtonModalClick = () => {
    if (modal) {
      setModal(false);
    } else {
      setModal(true);
      setMinimize(true);
    }
  };

  const onInputFormModalChange = (value) => {
    setTodo(value);
  };

  const onButtonFormModalClick = () => {
    const newTodos = [...todos];
    newTodos.push(todo);

    if (todos.length < 5) {
      localStorage.setItem('todos', JSON.stringify(newTodos));
    }

    setTodo('');
  };

  const onIconRemoveTodoClick = (index) => {
    const newTodos = [...todos];

    newTodos.splice(index, 1);

    localStorage.setItem('todos', JSON.stringify(newTodos));

    setTodos(newTodos);
  };

  const onTextTodoClick = (el) => {
    if (el.style.textDecoration === '' || el.style.textDecoration === 'none') {
      el.style.textDecoration = 'line-through';
    } else {
      el.style.textDecoration = 'none';
    }
  };

  const onCardImageClick = (url) => {
    const body = document.querySelector('body');

    body.style.backgroundImage = `url(./images/${url})`;
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
  }, [timerType, timerTypes]);

  useEffect(() => {
    if (!localStorage.getItem('todos')) {
      localStorage.setItem('todos', '[]');
    }

    setTodos(JSON.parse(localStorage.getItem('todos')));
  }, [todo]);

  return (
    <>
      <main className={styles.main}>
        <div className={!minimize ? styles.container : styles.container_small}>
          <div
            className={
              !minimize ? styles.card : styles.card + ' ' + styles.card_small
            }
          >
            <div className={styles.card__header}>
              {!timerType
                ? null
                : timerTypes.map((item, index) => {
                    return (
                      <a
                        key={index}
                        className={
                          item.name === timerType
                            ? !minimize
                              ? styles.link__active
                              : styles.link__active +
                                ' ' +
                                styles.link__active_small
                            : !minimize
                            ? styles.link
                            : styles.link + ' ' + styles.link_small
                        }
                        onClick={(e) => selectTimerType(e)}
                      >
                        {item.name}
                      </a>
                    );
                  })}
            </div>
            <div
              className={
                !minimize
                  ? styles.card__body
                  : styles.card__body + ' ' + styles.card__body_small
              }
            >
              {minutes === 0 && seconds === 0 ? (
                <h1>00:00</h1>
              ) : (
                <h1>
                  {minutes < 10 ? `0${minutes}` : minutes}:
                  {seconds < 10 ? `0${seconds}` : seconds}
                </h1>
              )}
            </div>
            <div
              className={
                !minimize
                  ? styles.card__footer
                  : styles.card__footer + ' ' + styles.card__footer_small
              }
            >
              <div className={styles.feature}>
                <button
                  className={
                    !minimize
                      ? styles.button__repeat
                      : styles.button__repeat +
                        ' ' +
                        styles.button__repeat_small
                  }
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
                    className={
                      !minimize
                        ? styles.button__pause
                        : styles.button__pause +
                          ' ' +
                          styles.button__pause_small
                    }
                    onClick={() => onButtonPauseClick()}
                  >
                    Pause
                  </button>
                ) : (
                  <button
                    className={
                      !minimize
                        ? styles.button__start
                        : styles.button__start +
                          ' ' +
                          styles.button__start_small
                    }
                    onClick={() => onButtonStartClick()}
                  >
                    Start
                  </button>
                )}
                <button
                  className={
                    !minimize
                      ? styles.button__setting
                      : styles.button__setting +
                        ' ' +
                        styles.button__setting_small
                  }
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
                <div
                  className={
                    !minimize
                      ? styles.addon
                      : styles.addon + ' ' + styles.addon_small
                  }
                >
                  <h4>Timer Setting</h4>
                  <div
                    className={
                      !minimize
                        ? styles.addon__form
                        : styles.addon__form + ' ' + styles.addon__form_small
                    }
                  >
                    {timerTypes.map((item, index) => {
                      return (
                        <InputSetting
                          key={index}
                          data={item}
                          minimize={minimize}
                          onInputTimerChange={(data) =>
                            onInputTimerChange(index, data)
                          }
                        />
                      );
                    })}
                  </div>
                  <div
                    className={
                      !minimize
                        ? styles.addon__action
                        : styles.addon__action +
                          ' ' +
                          styles.addon__action_small
                    }
                  >
                    <button
                      className={
                        !minimize
                          ? styles.button__minimize
                          : styles.button__minimize +
                            ' ' +
                            styles.button__minimize_small
                      }
                      onClick={() => onButtonMinimizeClick()}
                    >
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
                    <button
                      className={
                        !minimize
                          ? styles.button__background
                          : styles.button__background +
                            ' ' +
                            styles.button__background_small
                      }
                      onClick={() => onButtonBackgroundClick()}
                    >
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
              ) : background ? (
                <div
                  className={
                    !minimize
                      ? styles.addon
                      : styles.addon + ' ' + styles.addon_small
                  }
                >
                  <h4>Background</h4>
                  <div
                    className={
                      !minimize
                        ? styles.addon__gallery
                        : styles.addon__gallery +
                          ' ' +
                          styles.addon__gallery_small
                    }
                  >
                    {images.map((item, index) => {
                      return (
                        <CardImage
                          key={index}
                          data={item}
                          minimize={minimize}
                          onCardImageClick={(url) => onCardImageClick(url)}
                        />
                      );
                    })}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </main>
      {modal ? (
        <div className={styles.modal}>
          {todos.map((item, index) => {
            return (
              <div key={index} className={styles.modal__item}>
                <h4 onClick={(e) => onTextTodoClick(e.target)}>{item}</h4>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  onClick={() => onIconRemoveTodoClick(index)}
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            );
          })}

          <form
            className={styles.modal__form}
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="text"
              value={todo}
              onChange={(e) => onInputFormModalChange(e.target.value)}
            />
            <button onClick={() => onButtonFormModalClick()}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </form>
        </div>
      ) : null}

      <button
        type="submit"
        className={styles.button__modal}
        onClick={() => onButtonModalClick()}
      >
        Task and Todo List
      </button>
    </>
  );
}
