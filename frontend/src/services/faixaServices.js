import axios from 'axios'

const baseUrl = 'http://localhost:3000';

export function getAllFaixas() {
    const response = axios.get(`${baseUrl}/faixa`);
    return response
}