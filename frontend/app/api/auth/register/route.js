import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const body = await request.json()
        const { name, email, password } = body

        if (!name || !email || !password) {
            return NextResponse.json({message: "Dados incompletos"}, {status: 400})
        }

        return NextResponse.json({message: "Usuario criado com sucesso"}, {status: 201})
    } catch (error) {
        console.log(error);
        return NextResponse.json({message: "Erro ao se conectar com a api"}, {status: 500})
    }
}