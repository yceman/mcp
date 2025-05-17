import axios from "axios";

// Interface para representar um usu�rio
export interface User {
	id: string;
	nome: string;
	email: string;
}
/**
* Fun��o para buscar todos os usu�rios
* @param baseUrl URL base da API
* @returns Lista de usu�rios
*/
export async function getUsers(baseUrl: string): Promise<User[]> {
	try {
		const response = await axios.get(`${baseUrl}/users`);
		return response.data;
	} catch (error) {
		console.error(`Erro ao buscar usu�rios em ${baseUrl}/users:`, error);
		throw error;
	}
}

/**
* Fun��o para criar um novo usu�rio
* @param baseUrl URL base da API
* @param user Dados do usu�rio a ser criado
* @returns Lista de usu�rios
*/
export async function createUsers(baseUrl: string, user: User): Promise<User> {
	try {
		const response = await axios.post(`${baseUrl}/users`, user, {
			headers: {"Content-Type": "application/json"},
		});
		return response.data;
	} catch (error) {
		console.error(`Erro ao criar usu�rio em ${baseUrl}/users:`, error);
		throw error;
	}
}