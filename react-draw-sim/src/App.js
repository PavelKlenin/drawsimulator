import s from "./App.module.css";
import Footer from "./Components/Footer/Footer";
import Header from "./Components/Header/Header";
import MainContent from "./Components/MainContent/MainContent";

function App() {
  return (
    <div className={s.container}>
      <Header />
      <MainContent />
      <Footer />
    </div>
  );
}

export default App;
