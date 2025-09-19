export interface AboutItem {
	id?: number;
	content: string;
}

export interface NewsItem {
	id?: number;
	img: string;
	alt: string;
	date: string;
	title: string;
	text: string;
	slug: string;
	iso_date: string;
	categories: string[];
	content: string;
}

export interface FaqItem {
	id?: number;
	question: string;
	content: string;
}

export type Funding = 'BUDGET' | 'PAID';

export interface AdmissionPlan {
	id?: number;
	specialtyId: number;
	year: number;
	funding: Funding;
	price?: number;
	places: number;
}

export interface Abiturient {
	id?: number;
	full_name: string;
	specialtyId: number;
	score?: number;
	isEnrolled?: boolean;
}

export interface Specialty {
	id?: number;
	code: string;
	name: string;
	qualification: string;
	durationMonths: number;
	base: number;
	form: string;
	AdmissionPlan?: AdmissionPlan[];
	Abiturient?: Abiturient[];
}
