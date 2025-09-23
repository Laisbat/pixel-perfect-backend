import compression from 'compression';
import 'dotenv/config';
import express from 'express';
import { createServer } from 'http';

import cors from 'cors';
import loggerMorgan from 'morgan';
import env from './configs/env';
import logger from './middlewares/logger';
import routes from './routes/index.route';

const APP_PORT = env.APP_PORT || 3333;

const app = express();
app.disable('x-powered-by');
app.use(compression());
app.use(loggerMorgan('dev'));
app.use(cors());
app.use(express.json({ limit: 12 * 1024 * 1024 }));
app.use(express.urlencoded({ extended: true }));
app.use(routes);

const http = createServer(app);

enum ExitStatus {
  falha = 1,
  sucesso = 0,
}

http.listen(APP_PORT, () => {
  try {
    logger.info(`Servidor inicializado na porta ${APP_PORT}`);
    const exitSignals: NodeJS.Signals[] = ['SIGINT', 'SIGTERM', 'SIGQUIT'];
    exitSignals.forEach((signal) =>
      process.on(signal, async () => {
        try {
          logger.info('Servidor desligado com sucesso.');
          process.exit(ExitStatus.sucesso);
        } catch (error) {
          logger.error(`Error ao finalizar o servidor ${error}`);
          process.exit(ExitStatus.falha);
        }
      }),
    );
  } catch (error) {
    logger.error('Erro na inicialização do server: ' + error);
    process.exit(ExitStatus.falha);
  }
});
