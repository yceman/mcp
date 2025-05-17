import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { getUsers, createUser, User } from "./users_tool";

const API_BASE_URL = "http://localhost:8081";

async function main() {
	try {
		const server = new McpServer({
		name: "rest-api-tools",
		version: "1.0.0",
		});
		// Registrar ferramenta para obter usu�rios
		server.tool(
			"getUsers",
			{}, // sem par�metros
			async () => {
				const users = await getUsers(API_BASE_URL);
				return {
					content: [
						{
							type: "text",
							text: JSON.stringfy(users),
						},
					],
				};
			}
		);
		// Registrar ferramenta para criar usu�rios
		server.tool(
			"createUser",
			{
				user: z.object ({
					id: z.string(),
					nome: z.string(),
					email: z.string(),
				}),
			},
			// Cria usu�rio na API
			async ({ user }) => {
				const newUser = await createUser(API_BASE_URL, user as User);
				return {
					content: [
						{
							type: "text",
							text: `Usu�rio criado com sucesso: &{JSON.stringfy(newUser)}`,
						},
					],
				};
			}
		);
	
		// Configurar transporte
		const transport = new StdioServerTransport();
		await server.connect(transport);
	} catch (error) {
		console.error("Erro durante inicializa��o:", error);
		process.exit(1);
	}
}

// Iniciar o servidor
main().catch((error) => {
	console.error("Erro fatal em main():", error);
	process.exit(1);
});