"use client";

import Image from "next/image";
import { useState } from "react";

export default function LoginPage() {
  const [message, setMessage] = useState("");
  const [messageColor, setMessageColor] = useState(true);
  

  return (
    <div className="bg-white w-screen h-screen flex items-center justify-center">
      
      <div className="shadow-2xl w-[90%] md:w-[25vw] h-[68vh] md:h-[76vh] rounded-[5vw] md:rounded-[1.5vw]">
        
        {/* HEADER AZUL */}
        <div className="w-full h-[14vh] bg-blue-800 rounded-t-[5vw] md:rounded-t-[1.5vw] rounded-b-[60%] flex items-center justify-center gap-[3vw] md:gap-[0.7vw]">
          
          {/* CÍRCULO DO LOGO */}
          <div className="bg-white w-[13vw] h-[13vw] md:w-[3vw] md:h-[3vw] rounded-full flex justify-center items-center">
            <Image
              src="/logo.png"
              width={200}
              height={200}
              alt="Picture of the author"
              className="w-[10vw] md:w-[2.5vw]"
            />
          </div>
          
          {/* TÍTULO LOGIN: Aumentado no mobile para legibilidade */}
          <h1 className="text-[7vw] md:text-[1.7vw]">Login</h1>
        </div>

        {/* TÍTULO BEM-VINDO */}
        <h2 className="text-[6vw] md:text-[2vw] text-center text-black m-[3vh]">
          Bem-vindo de volta!
        </h2>

        <form
          action="/POST"
          className="flex flex-col gap-[4vh] md:gap-[6vh] justify-center items-center"
        >
          <div className="flex flex-col gap-[2.5vh] md:gap-[3vh] justify-center items-center w-full">
            
            {/* INPUT E-MAIL */}
            <input
              type="text"
              name="email"
              placeholder="E-mail"
              className="w-[85%] md:w-[80%] h-[7vh] text-[4.5vw] md:text-[1.2vw] text-black px-[4vw] md:px-[1vw] bg-blue-100 outline-blue-800 rounded-[2vw] md:rounded-[0.5vw] border-[0.3vw] md:border-[0.1vw] border-slate-400 shadow-[#00000059] shadow-[0_2vw_1.5vw_0] md:shadow-[0_0.7vw_0.5vw_0] transition-all duration-300 hover:scale-[1.02]"
            />
            
            {/* INPUT SENHA */}
            <input
              type="password"
              name="password"
              placeholder="Senha"
              className="w-[85%] md:w-[80%] h-[7vh] text-[4.5vw] md:text-[1.2vw] text-black px-[4vw] md:px-[1vw] bg-blue-100 outline-blue-800 rounded-[2vw] md:rounded-[0.5vw] border-[0.3vw] md:border-[0.1vw] border-slate-400 shadow-[#00000059] shadow-[0_2vw_1.5vw_0] md:shadow-[0_0.7vw_0.5vw_0] transition-all duration-300 hover:scale-[1.02]"
            />
          </div>

          {/* BOTÃO ENTRAR */}
          <button className="w-[85%] md:w-[80%] h-[7vh] text-[5vw] md:text-[1.4vw] bg-blue-800 rounded-[3vw] md:rounded-[1.5vw] shadow-[#00000059] shadow-[0_2vw_1.5vw_0] md:shadow-[0_0.7vw_0.5vw_0] transition-all duration-300 hover:scale-[1.02]">
            Entrar
          </button>
        </form>

        {/* MENSAGEM DE ERRO/SUCESSO */}
        <p className={`text-center  mt-[3vh] md:mt-[4vh] w-full h-[2vh] text-[3.5vw] md:text-[1.2vw] ${messageColor ? "text-blue-700" : "text-red-700"}`}>
          {message}
        </p>

        {/* LINKS DE RODAPÉ */}
        <p className="text-center text-black text-[3.5vw] md:text-[1.2vw] mt-[2vh] md:mt-[1.5vh]">
          Não tem uma conta? <a className="text-blue-700" href="/register">(Clique aqui)</a>
        </p>
        
        <p className="text-black text-center mt-[1vh] md:mt-[0.8vh] text-[3.5vw] md:text-[1.2vw]">
          Esqueceu a senha{" "}
          <a href="/reset-password" className="text-blue-700">
            (clique aqui)
          </a>
        </p>
      </div>
    </div>
  );
}