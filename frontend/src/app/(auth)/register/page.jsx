import RegisterForm from "@/components/RegisterForm";

export default function Register() {
  return (
    <div className="flex justify-center items-center align-middle w-screen h-screen bg-gray-600">
      <div className="flex flex-row w-1/2 h-3/4 justify-between items-center bg-white">
        <img src="./login.jpg" className="h-full"></img>
        <RegisterForm />
      </div>
    </div>
  );
}
