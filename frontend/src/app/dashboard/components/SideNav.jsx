export default function SideBar() {
  return (
    <div>
      <nav className="flex flex-col justify-between h-screen py-5 mx-2">
        <p>Logo</p>
        <div>
          <p>home</p>
          <p>search</p>
          <p>heart</p>
          <p>profile</p>
        </div>
        <div>Options</div>
      </nav>
    </div>
  );
}
