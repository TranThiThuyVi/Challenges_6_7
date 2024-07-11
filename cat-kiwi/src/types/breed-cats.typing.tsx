export interface IBreedCats {
  id: string;
  name: string;
  cfa_url?: string | null;
  vetstreet_url?: string;
  vcahospitals_url?: string;
  temperament?: string;
  origin?: string;
  country_codes?: string;
  country_code?: string;
  description?: string;
  life_span?: string;
  adaptability?: number;
  affection_level?: number;
  child_friendly?: number;
  grooming?: number;
  intelligence?: number;
  health_issues?: number;
  social_needs?: number;
  stranger_friendly?: number;
  wikipedia_url?: string;
  image?: { id: string; url: string }; 
}
