import { useSelector } from "react-redux";
import { Button } from "../../components/ui/button.tsx";
import "./styles.css";

const LandingContent = () => {
  let activeRoute = useSelector((state: any) => state.global.activeRoute);

  if (activeRoute !== "landing") {
    return <></>;
  } else {
    return (
      <>
        <div id="landing__brand" className="font-poppins">
          <h1>We Build Brands</h1>
        </div>
        <div id="landing__cta">
          <div id="landing__cta--description" className="text-white w-1/1 p-5">
            <p>
            Hey there 👋, we are a small team of engineers from India working together to make cool stuff. Join our discord community to know more. 
            </p>
          </div>
          <div id="landing__cta--actions" className="row w-full h-full flex items-center justify-center">
            <Button id="landing__cta--actions__community" variant="default" className="m-1 w-1/2 h-1/3" >Join our community</Button>
            <Button id="landing__cta--actions__login" variant="outline" className="m-1 h-1/3">Get started {"-->"}</Button>
          </div>
        </div>
        <div id="landing__navigator">
          <div id="landing__navigator--brand">zerodayone</div>
          <ul id="landing__navigator--routes">
            <li>Services</li>
            <li>Products</li>
            <li>Careers</li>
            <li>Contact Us</li>
          </ul>
        </div>
        
      </>
    );
  }
};

export default LandingContent;
