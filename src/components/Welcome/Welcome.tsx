import styles from "./Welcome.module.css";

const Welcome = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.header}>
        Welcome to the{" "}
        <span className={styles.emphasis}>grocery store picker</span> simulator
      </h1>
      <span className={styles.description}>
        Simulate grocery store picking scenarios to inform your decisions on
        whether or not to provide full service grocery store picking based on a
        Wharton Univerity research model
      </span>
    </div>
  );
};

export default Welcome;
