export interface AboutItem {
	id?: number;
	title: string;
	text: string;
	img?: string | null;
}

export interface NewsItem {
	id?: number;
	img?: string | null;
	alt?: string | null;
	date: string;
	title: string;
	text: string;
	slug: string;
	isoDate: string;
	categories: string[];
	content: string;
}

export interface FaqItem {
	id?: number;
	question: string;
	answer: string;
	order_number?: number | null;
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
