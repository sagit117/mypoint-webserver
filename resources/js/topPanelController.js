import SideMenu from "./components/SideMenu.js";
import TopPanel from "./components/TopPanel.js";
const topPanel = new TopPanel("top_panel", new SideMenu("left_side_menu"));
console.log(topPanel);
