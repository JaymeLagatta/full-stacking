"use client"; // Indica que este componente deve ser tratado como um componente do lado do cliente

import React, { useState } from 'react'; // Importa React e useState
import './styles/formulario.css'; // Importa estilos específicos para este componente

export default function Formulario() {
    // Definindo estados para os campos do formulário
    const [cep, setCep] = useState('');
    const [endereco, setEndereco] = useState({ rua: '', bairro: '' });
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Função para lidar com mudanças no campo de CEP
    const handleCepChange = async (event) => {
        const cepValue = event.target.value;
        setCep(cepValue);

        // Verifica se o CEP tem 8 caracteres
        if (cepValue.length === 8) {
            const response = await fetch(`https://viacep.com.br/ws/${cepValue}/json/`); // Chama a API para obter dados do CEP
            const data = await response.json(); // Converte a resposta em JSON
            setEndereco({ rua: data.logradouro, bairro: data.bairro }); // Atualiza o estado com os dados retornados
        }
    };

    // Função para lidar com o envio do formulário
    const handleSubmit = async (event) => {
        event.preventDefault(); // Impede o comportamento padrão do formulário
        const formData = { email, password, cep, endereco }; // Prepara os dados para envio

        try {
            const response = await fetch('http://localhost:8080/auth', {
                method: 'POST', // Define o método como POST
                headers: {
                    'Content-Type': 'application/json', // Define o tipo de conteúdo como JSON
                },
                body: JSON.stringify(formData), // Converte os dados do formulário para JSON
            });

            if (response.ok) {
                console.log('Dados enviados com sucesso!'); // Loga mensagem de sucesso
            } else {
                console.error('Erro ao enviar dados:', response.statusText); // Loga mensagem de erro se a resposta não for OK
            }
        } catch (error) {
            console.error('Erro ao enviar dados:', error); // Loga qualquer erro que ocorra
        }
    };

    // Renderiza o formulário
    return (
        <div className="form-container">
            <form className="form" onSubmit={handleSubmit}> {/* Adiciona onSubmit diretamente no formulário */}
                <h2>Formulário de Cadastro</h2>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} // Atualiza o estado ao mudar o valor
                        required // Campo obrigatório
                    />
                </div>
                <div>
                    <label>Senha:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} // Atualiza o estado ao mudar o valor
                        required // Campo obrigatório
                    />
                </div>
                <div>
                    <label>CEP:</label>
                    <input
                        type="text"
                        value={cep}
                        onChange={handleCepChange} // Chama a função ao mudar o valor
                        maxLength={8} // Limita a entrada a 8 caracteres
                        required // Campo obrigatório
                    />
                </div>
                <div>
                    <label>Rua:</label>
                    <input
                        type="text"
                        value={endereco.rua}
                        readOnly // Campo somente leitura
                    />
                </div>
                <div>
                    <label>Bairro:</label>
                    <input
                        type="text"
                        value={endereco.bairro}
                        readOnly // Campo somente leitura
                    />
                </div>
                <button type="submit">Enviar</button> {/* Botão de envio */}
            </form>
        </div>
    );
}
