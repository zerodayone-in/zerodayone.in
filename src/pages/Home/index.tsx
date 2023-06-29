import Grid from "../../components/Grid";
import "./styles.css";
import Logo from "../../assets/zerodayone-logo-light.svg";
import { useEffect } from "react";

function Overlay() {
  return (
    <div className="overlay">
      <div className="quote">
        <h1 className="quote__text">All Good Things Take Time</h1>
      </div>

      <div className="brand">
        <img className="brand__logo" src={Logo} alt="zerodayone logo" />
        <p className="brand__name">zerodayone</p>
        <p className="brand__tag">
          This website is under development, come back later.
        </p>
      </div>
      
      <p className="description">
        A creative studio that operates across multiple domains, bringing
        together art, design, and technology to deliver innovative solutions at
        the cutting edge of creativity.
      </p>
    </div>
  );
}

function Home() {
  useEffect(() => {
    const handleScroll = () => {
      // console.log(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      <Grid />
      <Overlay />
    </div>
  );
}

export default Home;
