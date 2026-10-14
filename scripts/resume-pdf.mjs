// Prints /resume to public/resume/Shubhdeep_Chhabra.pdf, so the PDF is the page.
//
//   pnpm dev            # or pnpm build && pnpm start
//   pnpm resume:pdf     # RESUME_URL=http://localhost:8080/resume by default
//
// Uses your installed Chrome. Set CHROMIUM_PATH to point at another Chromium build.
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright-core';

const URL_TO_PRINT = process.env.RESUME_URL ?? 'http://localhost:8080/resume';
const OUT = fileURLToPath(new URL('../public/resume/Shubhdeep_Chhabra.pdf', import.meta.url));

// Lives only in the PDF: the web page, markdown, JSON and JSON-LD never include it.
const PDF_ONLY = { phone: '+91-9116108753' };

const browser = await chromium.launch(
	process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : { channel: 'chrome' }
);

try {
	const page = await browser.newPage({ colorScheme: 'light' });
	await page.goto(URL_TO_PRINT, { waitUntil: 'networkidle' });
	await page.evaluate(async ({ phone }) => {
		const slot = document.querySelector('[data-pdf-slot="phone"]');
		if (slot) {
			const value = slot.querySelector('[data-pdf-value]');
			if (value) value.textContent = phone;
			slot.hidden = false;
		}
		await document.fonts.ready;
	}, PDF_ONLY);
	await page.emulateMedia({ media: 'print', colorScheme: 'light' });
	await page.pdf({ path: OUT, format: 'A4', printBackground: true, preferCSSPageSize: true });
	console.log(`Wrote ${OUT}`);
} finally {
	await browser.close();
}
