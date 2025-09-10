import { useSelector } from "react-redux";
import { Button } from "../../components/ui/button.tsx";
import "./styles.css";

const LandingContent = () => {
  const activeRoute = useSelector((state: any) => state.global.activeRoute);

  if (activeRoute !== "landing") {
    return <></>;
  } else {
    return (
      <>
        <div
          id="landing__container"
          className="font-poppins p-5 h-full w-full flex flex-col items-center justify-center gap-0"
        >
          <div
            id="landing__container--welcome"
            className="row w-full lg:w-1/2 text-white"
          >
            <div
              id="landing__container--welcome__brand"
              className="row w-full font-bold text-7xl sm:text-6xl sm:text-center bg-black p-5"
            >
              WE BUILD BRANDS
            </div>
          </div>
					
          <div
            id="landing__container--description"
            className="row h-auto w-full lg:w-1/2 sm:flex text-white gap-5 p-5"
          >
            <div
              id="landing__container--description__text"
              className="row w-full text-1xl "
            >
              <p>
                Hey there 👋, <span className="font-bold underline">zerodayone</span> is a small team of engineers from India
                working together to make cool stuff. Join our discord community
                to know more.
              </p>
            </div>
            <div
              id="landing__container--description__actions"
              className="row w-full py-5 sm:p-0 flex items-center justify-left gap-1"
            >
              <Button
                id="landing__container--description__actions__community"
                variant="default"
                className="bg-black"
              >
                Join our community
              </Button>
              <Button
                id="landing__container--description__actions__login"
                variant="outline"
                className="text-black"
              >
                Get a qoute {"-->"}
              </Button>
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default LandingContent;
