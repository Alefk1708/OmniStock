'use client'

import Image from "next/image";
import { useEffect, useState, useRef } from "react";

export default function PageVerify() {
  const [verifyStatus, setVerifyStatus] = useState(false);
  const [messageColor, setMessageColor] = useState(true);
  const [message, setMessage] = useState("")

  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [cont, setCont] = useState(60);
  

  const inputRefs = useRef([]);

  useEffect(() => {

    if (cont > 0) {
      const timer = setInterval(() => {
        setCont((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [cont]);


  const handleChange = (e, index) => {
    const { value } = e.target;
    
    if (isNaN(value)) return;

    const newOtp = [...otp];

    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    if (!/^\d+$/.test(pastedData)) return;

    const digits = pastedData.split("");
    const newOtp = [...otp];
    
    digits.forEach((digit, i) => {
        if(i < 6) newOtp[i] = digit;
    });
    
    setOtp(newOtp);
    const focusIndex = Math.min(digits.length, 5);
    inputRefs.current[focusIndex].focus();
  };

  return (
    <div className="w-screen h-screen bg-white flex justify-center items-center overflow-hidden">
      <div className="md:w-[25vw] w-[80vw] md:h-[70vh] h-[60vh] shadow-2xl rounded-[5vw] md:rounded-[1.5vw]">
        
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
                  <h1 className="text-[7vw] md:text-[1.7vw]">Verificação</h1>
                </div>

        <p className="text-black md:text-[1.3vw] text-[4vw] text-center md:m-[2vw] m-[6vw]">
          Insira o código de 6 digitos enviado para o seu e-mail
        </p>

        <form action="/POST" className="flex flex-col justify-center items-center gap-[3vh]">
          
          <div className="flex flex-row justify-center items-center w-full md:gap-[1vw] gap-[1.5vw]">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                value={digit}
                ref={(el) => (inputRefs.current[index] = el)}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onPaste={handlePaste}
                className={`
                  md:w-[3vw] w-[11vw] 
                  md:h-[8vh] h-[7vh] 
                  bg-blue-100 
                  focus:outline-none focus:ring-2 focus:ring-blue-800 focus:bg-white
                  border-[0.4vw] md:border-[0.2vw] border-slate-300 
                  md:rounded-[0.5vw] rounded-[2vw] 
                  md:text-[1.7vw] text-[6vw] text-black text-center font-bold
                `}
              />
            ))}
          </div>

          <p className={`w-full md:h-[4vh] h-[2vh] flex justify-center items-center gap-[0.3vw] text-black ${verifyStatus ? "" : ""}`}>
            Reenviar em <span className="flex font-bold ml-1">{cont}s</span>
          </p>

          <button
            disabled={otp.join("").length < 6}
            className={`
              w-[85%] md:w-[80%] h-[7vh] 
              text-[5vw] md:text-[1.4vw] 
              rounded-[3vw] md:rounded-[1.5vw] 
              transition-all duration-300 
              ${otp.join("").length === 6 
                ? 'bg-blue-800 hover:scale-[1.02] text-white shadow-lg cursor-pointer' 
                : 'bg-gray-400 text-gray-200 cursor-not-allowed'}
            `}
          >
            Verificar
          </button>
        </form>
        {/* MENSAGEM DE ERRO/SUCESSO */}
        <p className={`text-center  mt-[3vh] md:mt-[4vh] w-full h-[2vh] text-[3.5vw] md:text-[1.2vw] ${messageColor ? "text-blue-700" : "text-red-700"}`}>
          {message}
        </p>
        <p className="text-blue-600 text-center">Não recebeu o código?</p>
      </div>
    </div>
  );
}