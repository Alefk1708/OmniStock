"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

// Componente visual para cada item da lista de requisitos
const PasswordRequirement = ({ met, text }) => (
  <div className={`flex items-center gap-2 transition-all duration-300 ${met ? "text-green-600 font-bold" : "text-gray-400"}`}>
    {met ? (
      // Ícone de Check (Sucesso)
      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
    ) : (
      // Ícone de Círculo (Pendente)
      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
      </svg>
    )}
    <span className="text-[3vw] md:text-[0.8vw] whitespace-nowrap">{text}</span>
  </div>
);

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [messageColor, setMessageColor] = useState(true);

  // Estados de validação em tempo real
  const [validations, setValidations] = useState({
    length: false,
    upper: false,
    lower: false,
    special: false,
  });

  // Effect para atualizar as validações sempre que a senha mudar
  useEffect(() => {
    setValidations({
      length: password.length >= 8,
      upper: /[A-Z]/.test(password),
      lower: /[a-z]/.test(password),
      special: /[^A-Za-z0-9]/.test(password),
    });
  }, [password]);

  // Verifica se tudo está válido para habilitar o envio
  const isPasswordValid = Object.values(validations).every(Boolean);

  const handleSubmit = async () => {
    const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    })

    if (res.ok) {
        setMessage("Conta criada com sucesso!");
        setMessageColor(true);
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
    } else {
        const data = await res.json();
        setMessage(data.message);
        setMessageColor(false);
    }
  };

  return (
    <div className="bg-white w-screen h-screen flex items-center justify-center overflow-hidden">
      <div className="relative shadow-2xl w-[90%] md:w-[25vw] h-[68vh] md:h-[79vh] rounded-[5vw] md:rounded-[1.5vw] bg-white z-10">
        
        {/* HEADER AZUL */}
        <div className="w-full h-[14vh] bg-blue-800 rounded-t-[5vw] md:rounded-t-[1.5vw] rounded-b-[60%] flex items-center justify-center gap-[3vw] md:gap-[0.7vw]">
          <div className="bg-white w-[13vw] h-[13vw] md:w-[3vw] md:h-[3vw] rounded-full flex justify-center items-center">
            <Image
              src="/logo.png"
              width={200}
              height={200}
              alt="Logo"
              className="w-[10vw] md:w-[2.5vw]"
            />
          </div>
          <h1 className="text-[7vw] md:text-[1.7vw] text-white font-bold">Criar conta</h1>
        </div>

        {/* TÍTULO BEM-VINDO */}
        <h2 className="text-[6vw] md:text-[2vw] text-center text-black m-[3vh]">
          Vamos começar?
        </h2>

        <form
          className="flex flex-col gap-[4vh] md:gap-[5vh] justify-center items-center"
          onSubmit={(e) => {
            e.preventDefault();
            setMessageColor(false);

            if (password !== confirmPassword) {
              setMessage("As senhas não coincidem.");
              return;
            }

            if (!isPasswordValid) {
              setMessage("A senha não atende aos requisitos.");
              return;
            }

            setMessageColor(true);
            setMessage("Conta criada com sucesso!");
            handleSubmit();
          }}
        >
          <div className="flex flex-col gap-[2.5vh] md:gap-[3vh] justify-center items-center w-full">
            {/* INPUT NOME */}
            <input
              type="text"
              placeholder="Nome de usuario"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-[85%] md:w-[80%] h-[7vh] text-[4.5vw] md:text-[1.2vw] text-black px-[4vw] md:px-[1vw] bg-blue-100 outline-blue-800 rounded-[2vw] md:rounded-[0.5vw] border-[0.3vw] md:border-[0.1vw] border-slate-400 transition-all hover:scale-[1.02]"
            />

            {/* INPUT E-MAIL */}
            <input
              type="text"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-[85%] md:w-[80%] h-[7vh] text-[4.5vw] md:text-[1.2vw] text-black px-[4vw] md:px-[1vw] bg-blue-100 outline-blue-800 rounded-[2vw] md:rounded-[0.5vw] border-[0.3vw] md:border-[0.1vw] border-slate-400 transition-all hover:scale-[1.02]"
            />

            {/* CONTAINER DA SENHA (RELATIVE PARA O POSICIONAMENTO) */}
            <div className="w-[85%] md:w-[80%] relative group">
              <input
                type="password"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-[7vh] text-[4.5vw] md:text-[1.2vw] text-black px-[4vw] md:px-[1vw] bg-blue-100 outline-blue-800 rounded-[2vw] md:rounded-[0.5vw] border-[0.3vw] md:border-[0.1vw] border-slate-400 transition-all hover:scale-[1.02]"
              />

              {/* === BOX DE REQUISITOS === */}
              {/* No Mobile: Aparece abaixo (block). No Desktop: Aparece ao lado direito (absolute) */}
              <div className={`
                  mt-2 md:mt-0 
                  md:absolute md:left-[105%] md:top-0 md:w-[15vw]
                  bg-white p-3 rounded-lg md:shadow-lg border border-slate-200
                  transition-opacity duration-300
                  ${password ? 'opacity-100' : 'opacity-0 md:opacity-0 group-focus-within:opacity-100'}
              `}>
                 <div className="flex flex-col gap-1">
                    <p className="text-[3vw] md:text-[0.8vw] font-semibold text-gray-500 mb-1">Sua senha deve ter:</p>
                    <PasswordRequirement met={validations.length} text="Mínimo 8 caracteres" />
                    <PasswordRequirement met={validations.upper} text="Letra maiúscula" />
                    <PasswordRequirement met={validations.lower} text="Letra minúscula" />
                    <PasswordRequirement met={validations.special} text="Caractere especial (!@#)" />
                 </div>
                 
                 {/* Seta decorativa apenas para desktop */}
                 <div className="hidden md:block absolute top-[1.5vh] left-[-0.4vw] w-3 h-3 bg-white border-l border-b border-slate-200 rotate-45 transform"></div>
              </div>
            </div>

            {/* CONFIRMAR SENHA */}
            <input
              type="password"
              placeholder="Confirmar senha"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-[85%] md:w-[80%] h-[7vh] text-[4.5vw] md:text-[1.2vw] text-black px-[4vw] md:px-[1vw] bg-blue-100 outline-blue-800 rounded-[2vw] md:rounded-[0.5vw] border-[0.3vw] md:border-[0.1vw] border-slate-400 transition-all hover:scale-[1.02]"
            />
          </div>

          {/* BOTÃO */}
          <button 
            disabled={!isPasswordValid || password !== confirmPassword}
            className={`w-[85%] md:w-[80%] h-[7vh] text-[5vw] md:text-[1.4vw] rounded-[3vw] md:rounded-[1.5vw] transition-all duration-300 ${isPasswordValid && password === confirmPassword ? 'bg-blue-800 hover:scale-[1.02] text-white shadow-lg' : 'bg-gray-400 text-gray-200 cursor-not-allowed'}`}
          >
            Criar
          </button>
        </form>

        {/* MENSAGEM */}
        <p className={`text-center mt-[3vh] md:mt-[2vh] w-full h-[2vh] text-[3.5vw] md:text-[1vw] ${messageColor ? "text-blue-700" : "text-red-700"}`}>
          {message}
        </p>
      </div>
    </div>
  );
}