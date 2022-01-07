import logo from "./images/logo.svg";
import Calculator from "./Calculator";

export default function App() {
  return (
    <div className="main-container">
      <img src={logo} alt="logo" />
      <Calculator />
    </div>
  );
}
