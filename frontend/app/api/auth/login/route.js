import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const body = await request.json()
        const { email, password } = body

        if (!email || !password) {
            return NextResponse.json({message: "Usuario e senha não recebidos"}, {status: 400})
        }

        if (email != "kaiquealef42@gmail.com" && password != "123456") {
            return NextResponse.json({message: "Usuario ou senha incorretos"}, {status: 401})
        }
        return NextResponse.json({message: "Codigo de verificação enviado para seu email"}, {status: 200})
    } catch (error) {
        console.log(error)
        NextResponse.json({message: "Erro ao comunicar com a api"}, {status: 500})
    }
}