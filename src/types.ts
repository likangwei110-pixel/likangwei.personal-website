export interface Internship {
  id: string;
  company: string;
  role: string;
  roleCn?: string;
  period: string;
  highlights: string[];
  highlightsCn?: string[];
  results: { label: string; labelCn?: string; value: string }[];
  details: string;
  detailsCn?: string;
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
