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

export interface EnrolledItem {
	id?: number;
	full_name: string;
	fio?: string;
	birthDate?: string | null;
	speciality: string;
	group_name?: string | null;
	status?: string | null;
	documents?: Record<string, any> | null;
}

export interface AdmissionPlanItem {
	id?: number;
	speciality: string;
	qualification?: string | null;
	form: string;
	duration?: string | null;
	budget_places?: number;
	paid_places?: number;
	cost?: number | null;
	accreditation?: string | null;
	extras?: Record<string, any> | null;
}

export interface RatingItem {
	id?: number;
	full_name: string;
	fio?: string;
	speciality: string;
	score: number;
	year: number;
	extra?: Record<string, any> | null;
}
