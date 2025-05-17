import axios from "axios";

// Interface para representar um usuário
export interface User {
	id: string;
	nome: string;
	email: string;
}
/**
* Função para buscar todos os usuários
* @param baseUrl URL base da API
* @returns Lista de usuários
*/
export async function getUsers(baseUrl: string): Promise<User[]> {
	try {
		const response = await axios.get(`${baseUrl}/users`);
		return response.data;
	} catch (error) {
		console.error(`Erro ao buscar usuários em ${baseUrl}/users:`, error);
		throw error;
	}
}

/**
* Função para criar um novo usuário
* @param baseUrl URL base da API
* @param user Dados do usuário a ser criado
* @returns Lista de usuários
*/
export async function createUsers(baseUrl: string, user: User): Promise<User> {
	try {
		const response = await axios.post(`${baseUrl}/users`, user, {
			headers: {"Content-Type": "application/json"},
		});
		return response.data;
	} catch (error) {
		console.error(`Erro ao criar usuário em ${baseUrl}/users:`, error);
		throw error;
	}
}