export type titleTag = 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p';

export interface NewsItem {
	img: string;
	alt: string;
	date: string;
	isoDate: string;
	title: string;
	text: string;
	categories: string[];
	slug: string;
	content: string;
}

export type ModalType = 'admission';
