import css from './Loader.module.css';
import { ClockLoader } from 'react-spinners';

export default function Loader() {
  return (
    <div className={css.loader}>
      <ClockLoader color="#00bfff" size={80} />
      <p className={css.text}>Please wait, loading movies...</p>
    </div>
  );
}
