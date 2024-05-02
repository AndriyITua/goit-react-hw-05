import Navigation from "../Navigation/Navigation";
import css from "./Layout.module.css";

export default function Layout({ children }) {
  return (
    <div className={css.container}>
      <header>
        <Navigation />
      </header>

      {children}

      <footer>Footer</footer>
    </div>
  );
}
