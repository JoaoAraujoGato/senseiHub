import { Navigate, Route, Routes } from 'react-router-dom';
import { LoginPage } from '@/pages/login/LoginPage';
import { AppLayout } from '@/components/layout/AppLayout';
import { EmConstrucaoPage } from '@/pages/EmConstrucaoPage';
import { FaixasPage } from '@/pages/faixas/FaixasPage';
import { ProfessoresPage } from '@/pages/professores/ProfessoresPage';
import { AtletasPage } from '@/pages/atletas/AtletasPage';
import { TurmasPage } from '@/pages/turmas/TurmasPage';
import { TecnicasPage } from '@/pages/tecnicas/TecnicasPage';
import { PrivateRoute } from './PrivateRoute';

export function AppRoutes() {
    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />

            <Route path="/" element={<PrivateRoute><AppLayout /></PrivateRoute>}>
                <Route index element={<Navigate to="/dashboard" replace />} />
                <Route path="dashboard" element={<EmConstrucaoPage titulo="Dashboard" />} />
                <Route path="atletas" element={<AtletasPage />} />
                <Route path="turmas" element={<TurmasPage />} />
                <Route path="presenca" element={<EmConstrucaoPage titulo="Presença" />} />
                <Route path="treinos" element={<EmConstrucaoPage titulo="Treinos" />} />
                <Route path="tecnicas" element={<TecnicasPage />} />
                <Route path="faixas" element={<FaixasPage />} />
                <Route path="exames" element={<EmConstrucaoPage titulo="Exames de Faixa" />} />
                <Route path="campeonatos" element={<EmConstrucaoPage titulo="Campeonatos" />} />
                <Route path="financeiro" element={<EmConstrucaoPage titulo="Financeiro" />} />
                <Route path="comunicados" element={<EmConstrucaoPage titulo="Comunicados" />} />
                <Route path="professores" element={<ProfessoresPage />} />
                <Route path="configuracoes" element={<EmConstrucaoPage titulo="Configurações" />} />
            </Route>

            <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
    );
}
