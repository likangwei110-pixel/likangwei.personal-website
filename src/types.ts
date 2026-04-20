export interface Internship {
  id: string;
  company: string;
  role: string;
  period: string;
  highlights: string[];
  results: { label: string; value: string }[];
  details: string;
}

export interface Photo {
  url: string;
  title: string;
  location: string;
}

export interface Movie {
  year: number;
  title: string;
  role: string;
  image: string;
  description?: string;
  descriptionEn?: string;
}
