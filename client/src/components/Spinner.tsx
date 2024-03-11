import styles from './Spinner.module.scss';

export const Spinner = () => {
  return (
    <div className='text-center'>
      <img src="/jonathan.png" alt="Spinning" className={styles.spinner} />
    </div>
  );
};
