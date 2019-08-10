export interface HRFilter {
  genders: string[];
  locations: string[];
  professions: string[];
  tags: string[];
  rairties: string[];
  methods: string[];
}

export interface HRLabel {
  name: string;
  icon?: string;
}

export interface HRInfo {
  name: string;
  pic: string[];
  alt: string;
  logo: string;
  job: string;
  num: string;
  r: number;
  pool: number;
  sex: number;
  tags: string[];
  desc: string;
}
