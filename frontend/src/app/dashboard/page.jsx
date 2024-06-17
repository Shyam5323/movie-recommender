import LogoutButton from "@/components/LogoutButton";
import SideBar from "./components/SideNav";
import TopBar from "./components/TopNav";
import Hero from "./components/Hero";

const Dashboard = () => {
  return (
    <div className="flex h-screen">
      <SideBar className="flex-none w-1/5"></SideBar>
      <section className="flex-1 flex flex-col">
        <TopBar className="flex-none"></TopBar>
        <div className="flex-1 overflow-y-auto">
          <Hero></Hero>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
