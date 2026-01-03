import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="bg-white w-screen h-screen flex items-center justify-center">
      <div className=" shadow-2xl w-[25vw] h-[70vh] rounded-[1.5vw]">
        <div className="w-full h-[14vh] bg-blue-800 rounded-t-[1.5vw] rounded-b-[60%] flex items-center justify-center gap-[0.7vw]">
          <div className="bg-white w-[3vw] h-[3vw] rounded-full flex justify-center items-center">
            <Image
              src="/logo.png"
              width={200}
              height={200}
              alt="Picture of the author"
              className="w-[2.5vw] "
            />
          </div>
          <h1 className="text-[1.7vw]">Login</h1>
        </div>
        <h2 className="text-[2vw] text-center text-black m-[3vh]">Bem-vindo de volta!</h2>
        <form action="/POST"></form>
      </div>
    </div>
  );
}
