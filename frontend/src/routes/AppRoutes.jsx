import { Navigate, Route, Routes } from 'react-router-dom';
import { LoginPage } from '@/pages/login/LoginPage';
import { AppLayout } from '@/components/layout/AppLayout';
import { EmConstrucaoPage } from '@/pages/EmConstrucaoPage';
import { FaixasPage } from '@/pages/faixas/FaixasPage';
import { ProfessoresPage } from '@/pages/professores/ProfessoresPage';
import { ProfessorFormPage } from '@/pages/professores/ProfessorFormPage';
import { ProfessorDetalhePage } from '@/pages/professores/ProfessorDetalhePage';
import { AtletasPage } from '@/pages/atletas/AtletasPage';
import { AtletaFormPage } from '@/pages/atletas/AtletaFormPage';
import { AtletaDetalhePage } from '@/pages/atletas/AtletaDetalhePage';
import { TurmasPage } from '@/pages/turmas/TurmasPage';
import { TecnicasPage } from '@/pages/tecnicas/TecnicasPage';
import { PrivateRoute } from './PrivateRoute';
import { PublicOnlyRoute } from './PublicOnlyRoute';

export function AppRoutes() {
    return (
        <Routes>
            <Route path="/login" element={<PublicOnlyRoute><LoginPage /></PublicOnlyRoute>} />

            <Route path="/" element={<PrivateRoute><AppLayout /></PrivateRoute>}>
                <Route index element={<Navigate to="/dashboard" replace />} />
                <Route path="dashboard" element={<EmConstrucaoPage titulo="Dashboard" />} />

                <Route path="atletas" element={<AtletasPage />} />
                <Route path="atletas/novo" element={<AtletaFormPage />} />
                <Route path="atletas/:id" element={<AtletaDetalhePage />} />
                <Route path="atletas/:id/editar" element={<AtletaFormPage />} />

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
                <Route path="professores/novo" element={<ProfessorFormPage />} />
                <Route path="professores/:id" element={<ProfessorDetalhePage />} />
                <Route path="professores/:id/editar" element={<ProfessorFormPage />} />

                <Route path="configuracoes" element={<EmConstrucaoPage titulo="Configurações" />} />
            </Route>

            <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
    );
}
