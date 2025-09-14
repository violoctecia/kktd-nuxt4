import fontkit from '@pdf-lib/fontkit';
import fs from 'fs';
import { defineEventHandler, readBody, setHeader } from 'h3';
import path from 'path';
import { PDFDocument, rgb } from 'pdf-lib';

interface Student {
	fullName: string;
	status: 'budget' | 'contract';
}

interface Group {
	name: string;
	specialtyTitle: string;
	students: Student[];
}

export default defineEventHandler(async (event) => {
	const group: Group = await readBody(event);

	const pdfDoc = await PDFDocument.create();

	pdfDoc.registerFontkit(fontkit);

	const fontPath = path.resolve(process.cwd(), 'app/assets/font/Roboto-Regular.ttf');
	const fontBytes = fs.readFileSync(fontPath);
	const font = await pdfDoc.embedFont(fontBytes);

	const fontSizeTitle = 18;
	const fontSizeNormal = 12;

	let page = pdfDoc.addPage();
	const { height } = page.getSize();
	let y = height - 50;

	// Заголовок
	page.drawText(group.name, { x: 50, y, size: fontSizeTitle, font, color: rgb(0, 0, 0) });
	y -= fontSizeTitle + 10;

	// Специальность
	page.drawText(group.specialtyTitle, { x: 50, y, size: fontSizeNormal, font, color: rgb(0, 0, 0) });
	y -= fontSizeNormal + 20;

	// Студенты
	for (const s of group.students) {
		const text = `${s.fullName} — ${s.status === 'budget' ? 'Бюджет' : 'Внебюджет'}`;
		if (y < 50) {
			page = pdfDoc.addPage();
			y = height - 50;
		}
		page.drawText(text, { x: 50, y, size: fontSizeNormal, font, color: rgb(0, 0, 0) });
		y -= fontSizeNormal + 5;
	}

	const pdfBytes = await pdfDoc.save();

	const fileName = encodeURIComponent(group.name) + '.pdf';
	setHeader(event, 'Content-Type', 'application/pdf');
	setHeader(event, 'Content-Disposition', `attachment; filename*=UTF-8''${fileName}`);
	event.node.res.end(Buffer.from(pdfBytes));
});
