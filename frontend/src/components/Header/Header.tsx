import styles from "./Header.module.css";


type HeaderProps = { children: string };

export default function Header({ children }: HeaderProps) {
  return (
    <header>
      <h2>{children}</h2>
    </header>
  );
}
