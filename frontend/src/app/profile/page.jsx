import SideBar from "../dashboard/components/SideNav";
import TopBar from "../dashboard/components/TopNav";
import UserHero from "./components/UserHero";

export default function Profile() {
  return (
    <div className="flex h-screen">
      <SideBar className="flex-none w-1/5"></SideBar>
      <section className="flex-1 flex flex-col">
        <TopBar className="flex-none"></TopBar>
        <div className="flex-1 overflow-y-auto"></div>
        <UserHero />
      </section>
    </div>
  );
}
