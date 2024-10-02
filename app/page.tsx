// pages/formulario.js
"use client";

import { useState } from 'react';
import './styles/formulario.css';

export default function Formulario() {
  const [cep, setCep] = useState('');
  const [endereco, setEndereco] = useState({ rua: '', bairro: '' });
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleCepChange = async (event) => {
    const cepValue = event.target.value;
    setCep(cepValue);

    if (cepValue.length === 8) {
      const response = await fetch(`https://viacep.com.br/ws/${cepValue}/json/`);
      const data = await response.json();
      setEndereco({ rua: data.logradouro, bairro: data.bairro });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = { email, password, cep, endereco };

    try {
      const response = await fetch('http://localhost:8080/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Dados enviados com sucesso!');
      } else {
        console.error('Erro ao enviar dados:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao enviar dados:', error);
    }
  };

  return (
    <div className="form-container">
      <form className="form">
        <h2>Formulário de Cadastro</h2>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Senha:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>CEP:</label>
          <input
            type="text"
            value={cep}
            onChange={handleCepChange}
            maxLength="8"
            required
          />
        </div>
        <div>
          <label>Rua:</label>
          <input
            type="text"
            value={endereco.rua}
            readOnly
          />
        </div>
        <div>
          <label>Bairro:</label>
          <input
            type="text"
            value={endereco.bairro}
            readOnly
          />
        </div>
        <button type="submit" onClick={handleSubmit}>Enviar</button>
      </form>
    </div>
  );
}
