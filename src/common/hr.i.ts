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
  job: string;
  star: number;
  sex: number;
  pub: number;
  memo: string;
  tags: string[];
}
