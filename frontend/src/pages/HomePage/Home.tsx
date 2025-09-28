
import Slider from "./HomePageComponents/Slider";
import CategoryList from "./HomePageComponents/CategoryList";
import Newsletter from "./HomePageComponents/Newsletter";

export interface IHomeProps {
}

export default function Home (props: IHomeProps) {


  return (
    <div>
        <Slider /> 
        <CategoryList /> 
        <Newsletter />  
    </div>
  );
}
