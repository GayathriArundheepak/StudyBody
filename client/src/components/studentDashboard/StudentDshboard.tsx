
import "./StudentDashboard.scss";
import Banner from "../banner/Banner";
import { useRef} from "react";
import About from "../about/About";
const StudentDashboard = () => {
  const aboutRef = useRef<HTMLDivElement>(null);

  // const scrollToAbout = () => {
  //   if (aboutRef.current) {
  //     aboutRef.current.scrollIntoView({ behavior: "smooth" });
  //   }
  // };

  return (
    <div className="studentDashboard">
      <div className="box box1">
        <Banner/>
      </div>
      <div className="box box2" id="about" ref={aboutRef}>
    <About/>
      </div>
    
    </div>
  );
};

export default StudentDashboard;
