// server.js
const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

const app = express();
const port = 8080;

// Configurações do Supabase
//const supabaseUrl = 'ttps://your-supabase-url.supabase.co'; // Substitua pelo seu URL
const supabaseUrl = 'postgresql://postgres.spvagvufbznknwgsfjwa:[FIAP2024ADMIN]@aws-0-sa-east-1.pooler.supabase.com:6543/postgres';
const supabaseKey = 'FIAP2024ADMIN'; // Substitua pela sua chave anônima
const supabase = createClient(supabaseUrl, supabaseKey);

app.use(cors());
app.use(express.json());

app.post('/auth', async (req, res) => {
    const { email, password, cep, endereco } = req.body;

    // Inserir os dados no banco de dados
    const { data, error } = await supabase
        .from('usuario') // Nome da tabela no Supabase
        .insert([
            { email, password, cep, rua: endereco.rua, bairro: endereco.bairro },
        ]);

    if (error) {
        console.error('Erro ao inserir dados:', error);
        return res.status(500).json({ error: 'Erro ao inserir dados' });
    }

    return res.status(201).json({ message: 'Usuário cadastrado com sucesso!', data });
});

// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
