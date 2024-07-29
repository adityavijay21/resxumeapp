import {ScrollView, Text, View} from "react-native";
import Slider from "./components/Slider";
import ResxumeWritersScreen from "./components/ResxumeWriters/ResxumeWritersScreen";
import ResxumeTemplateGrid from "./components/ResxumeTemplateGrid";

const Index = () => (
    <ScrollView>
        <Slider />
        <ResxumeWritersScreen />
        <ResxumeTemplateGrid />
    </ScrollView>
);



export default Index;