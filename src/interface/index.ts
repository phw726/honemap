export interface StoreType {
  id: number;
  phone?: string | null;
  address?: string | null;
  lat?: string | null;
  lng?: string | null;
  name?: string | null;
  category?: string | null;
  storeType?: string | null;
  foodCertifyName?: string | null;
}

export interface StoreApiResponse {
  data: StoreType[];
  totalPage?: number;
  totalCount?: number;
  page?: number;
}

export interface LocationType {
  lat?: string | null;
  lng?: string | null;
  zoom?: number;
}

export interface SearchType {
  q?: string;
  district?: string;
}

// tel_no: string;
// cob_code_nm: string;
// bizcnd_code_nm: string;
// upso_nm: string;
// y_dnts: string;
// x_cnts: string;
// rdn_code_nm: string;
// crtfc_gbn_nm: string;
