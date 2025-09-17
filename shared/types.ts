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

export type ModalType = 'admission' | 'custom';
