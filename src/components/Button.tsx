import styles from '../styles/components/Button.module.scss';

interface ButtonI {
  onClick: (arg0: any) => void;
  text: string;
}

function Button({ onClick, text }: ButtonI) {
  return (
    <button onClick={onClick} type="button" className={styles.button}>
      {text}
    </button>
  );
}

export default Button;
