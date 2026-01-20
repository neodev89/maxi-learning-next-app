import styles from "./page.module.css";
import Welcome from "../ui/components/pages/welcome/welcome";
import GlobalWrapper from "@/ui/components/global-wrapper/GlobalWrapper";

export default function App() {
  return (
    <GlobalWrapper>
      <div className={styles.page}>
        <div className={styles.welcome}>
          <Welcome />
        </div>
      </div>
    </GlobalWrapper>
  );
}
