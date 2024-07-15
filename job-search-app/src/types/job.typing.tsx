export interface Job {
  id: number;
  name: string;
  model_type?: string;
  publication_date?: string;
  type?: string;
  locations?: { name: string }[];
  categories?: string[];
  levels?: { name: string; short_name?: string }[];
  refs?: { landing_page?: string };
  company?: { name: string; short_name?: string; logo_url?: string };
  contents?: string;
}
