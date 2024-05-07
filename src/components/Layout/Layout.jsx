import { Suspense } from "react";
import Navigation from "../Navigation/Navigation";
import css from "./Layout.module.css";

export default function Layout({ children }) {
  return (
    <div className={css.container}>
      <header>
        <Navigation />
      </header>

      <Suspense>{children}</Suspense>

      <footer>Footer</footer>
    </div>
  );
}
