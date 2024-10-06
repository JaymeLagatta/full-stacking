import express from 'express'; // Importa o framework Express
import cors from 'cors'; // Importa o middleware CORS para habilitar requisições entre diferentes origens
import { createClient } from '@supabase/supabase-js'; // Importa o cliente Supabase para interagir com o banco de dados
//import React from 'react';


const app = express(); // Cria uma instância do aplicativo Express
const port = 8080; // Define a porta que o servidor irá escutar

// Configurações do Supabase
const supabaseUrl = 'postgresql://postgres.spvagvufbznknwgsfjwa:[FIAP2024ADMIN]@aws-0-sa-east-1.pooler.supabase.com:6543/postgres'; // URL de conexão com o banco de dados Supabase
const supabaseKey = 'FIAP2024ADMIN'; // Senha
const supabase = createClient(supabaseUrl, supabaseKey); // Cria uma instância do cliente Supabase

app.use(cors()); // Habilita CORS para permitir requisições de diferentes origens
app.use(express.json()); // Middleware para parsear o corpo das requisições como JSON

// Endpoint para autenticação e registro de usuários
app.post('/auth', async (req, res) => {
    const { email, password, cep, endereco } = req.body; // Desestrutura os dados do corpo da requisição

    // Inserir os dados no banco de dados
    const { data, error } = await supabase
        .from('usuario') // Nome da tabela no Supabase
        .insert([ // Insere um novo registro na tabela
            { email, password, cep, rua: endereco.rua, bairro: endereco.bairro }, // Cria o objeto de dados a ser inserido
        ]);

    if (error) { // Verifica se ocorreu um erro na inserção
        console.error('Erro ao inserir dados:', error); // Loga o erro no console
        return res.status(500).json({ error: 'Erro ao inserir dados' }); // Retorna uma resposta de erro 500
    }

    return res.status(201).json({ message: 'Usuário cadastrado com sucesso!', data }); // Retorna uma resposta de sucesso
});

// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`); // Loga no console a URL do servidor
});
