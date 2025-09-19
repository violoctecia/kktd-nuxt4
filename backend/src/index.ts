import cors from 'cors';
import express from 'express';
import fs from 'fs';
import path from 'path';
import { cfg } from './config';
import errorHandler from './middleware/errorHandler';

import { abiturientRoutes } from './modules/abiturient';
import { aboutRoutes } from './modules/about';
import { planRoutes } from './modules/admissionPlan';
import { faqRoutes } from './modules/faq';
import { newsRoutes } from './modules/news';
import { specialtiesRoutes } from './modules/specialties';

const app = express();

const port = cfg.port;
const uploadDir = cfg.uploadDir;
const prefix = cfg.prefix;

app.use(
	cors({
		origin: 'http://localhost:3000',
	}),
);
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true }));

const uploadsPath = path.join(process.cwd(), uploadDir);
if (!fs.existsSync(uploadsPath)) fs.mkdirSync(uploadsPath, { recursive: true });
app.use('/' + uploadDir, express.static(uploadsPath));

// API routes
app.use(`${prefix}/about`, aboutRoutes);
app.use(`${prefix}/faq`, faqRoutes);
app.use(`${prefix}/news`, newsRoutes);
app.use(`${prefix}/specialties`, specialtiesRoutes);
app.use(`${prefix}/admission-plan`, planRoutes);
app.use(`${prefix}/abiturient`, abiturientRoutes);

app.use(errorHandler);

app.listen(port, () => console.log(`Server running on port ${port} with prefix ${prefix}`));
