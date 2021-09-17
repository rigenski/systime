import Image from 'next/image';
import styles from '../styles/CardImage.module.css';

const CardImage = (props) => {
  return (
    <div
      className={
        !props.minimize
          ? styles.addon__image
          : styles.addon__image + ' ' + styles.addon__image_small
      }
      onClick={() => props.onCardImageClick(props.data.url)}
    >
      <Image
        src={`/images/${props.data.url}`}
        height={212}
        width={320}
        alt={`${props.data.title} Background`}
      />
    </div>
  );
};

export default CardImage;
