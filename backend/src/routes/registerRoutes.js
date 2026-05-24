import atletaRoutes from './atleta.route.js';
import authRoutes from './auth.route.js';
import faixaRoutes from './faixa.route.js';
import professorRoutes from './professor.route.js';
import tecnicaRoutes from './tecnica.route.js';
import turmaRoutes from './turma.route.js';
import swaggerRoute from './swagger.route.js';

export default function registerRoutes(app) {
  app.use('/auth', authRoutes);
  app.use('/doc', swaggerRoute);

  app.use('/atleta', atletaRoutes);
  app.use('/faixa', faixaRoutes);
  app.use('/professor', professorRoutes);
  app.use('/tecnica', tecnicaRoutes);
  app.use('/turma', turmaRoutes);
}