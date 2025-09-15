import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import fs from 'fs';
import path from 'path';

import errorHandler from './middleware/errorHandler';
import aboutRoutes from './routes/aboutRoutes';
import planRoutes from './routes/admissionPlanRoutes';
import enrolledRoutes from './routes/enrolledRoutes';
import faqRoutes from './routes/faqRoutes';
import newsRoutes from './routes/newsRoutes';
import ratingRoutes from './routes/ratingRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const UPLOAD_DIR = process.env.UPLOAD_DIR || 'uploads';

app.use(cors());
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true }));

const uploadsPath = path.join(process.cwd(), UPLOAD_DIR);
if (!fs.existsSync(uploadsPath)) fs.mkdirSync(uploadsPath, { recursive: true });
app.use('/' + UPLOAD_DIR, express.static(uploadsPath));

// API routes
app.use('/api/about', aboutRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/faq', faqRoutes);
app.use('/api/enrolled', enrolledRoutes);
app.use('/api/admission-plan', planRoutes);
app.use('/api/rating', ratingRoutes);

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server started on http://localhost:${PORT}`));
