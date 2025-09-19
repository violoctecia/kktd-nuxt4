export type titleTag = 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p';

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

export interface Faq {
	id?: number;
	question: string;
	content: string;
}

export interface About {
	id?: number;
	content: string;
}

export interface Specialty {
	id?: number;
	code: string;
	name: string;
	qualification: string;
	durationMonths: number;
	base: number;
	form: string;
}

type Funding = 'BUDGET' | 'PAID';

export interface AdmissionPlan {
	id?: number;
	specialtyId: number;
	year: number;
	funding: Funding;
	price?: number;
	places: number;
	specialty?: Specialty;
}

export interface Abiturient {
	id?: number;
	full_name: string;
	specialtyId: number;
	score?: number;
	isEnrolled?: boolean;
}
