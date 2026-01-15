import styles from "./page.module.css";
import Welcome from "../ui/components/pages/welcome/welcome";

export default function App() {
  return (
    <div className={styles.page}>
      <div className={styles.welcome}>
        <Welcome />
      </div>
    </div>
  );
}
