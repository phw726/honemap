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
  likes?: LikeInterface[];
}

export interface LikeInterface {
  id: number;
  storeId: number;
  userId: number;
  store?: StoreType;
}

export interface LikeApiResponse {
  data: LikeInterface[];
  totalPage?: number;
  totalCount?: number;
  page?: number;
}

export interface CommentInterface {
  id: number;
  storeId: number;
  userId: number;
  store?: StoreType;
  body?: string;
  createdAt?: Date;
  user?: UserType;
}

export interface UserType {
  id: number;
  email?: string | null;
  name?: string | null;
  image?: string | null;
}

export interface CommentApiResponse {
  data: CommentInterface[];
  totalPage?: number;
  totalCount?: number;
  page?: number;
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
