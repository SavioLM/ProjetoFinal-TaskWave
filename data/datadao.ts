import { PrismaClient, Cadastrado, Tarefa, Quadro } from "prisma/prisma-client";

const prisma = new PrismaClient();

/** 
export async function obterUsuarios(): Promise<Array<Cadastrado>> {
  const cadastrados = await prisma.cadastrado.findMany;
  return cadastrados;
}
*/

export async function criarUsuario(usuario: Cadastrado ): Promise<boolean> {

    const usuarioCriado = await prisma.cadastrado.create({
      data: {
        nome: usuario.nome,
        telefone: usuario.telefone,
        email: usuario.email,
        senha: usuario.senha,
      },
    });

    return usuarioCriado ? true : false;
}

export async function consultarUsuario(email: string, senha: string): Promise<{ email: string, senha: string } | null> {
  try {
      const usuario = await prisma.cadastrado.findFirst({
          where: {
              email: email,
              senha: senha,
          },
      });
      return usuario || null;
  } catch (error) {
      console.error("Erro ao consultar usuario:", error);
      return null;
  }
}

export async function excluirUsuario(email: string ): Promise<boolean> {

  const usuarioCriado = await prisma.cadastrado.delete({
    where: {
      email: email
    }
  });

  return usuarioCriado ? true : false;
}
