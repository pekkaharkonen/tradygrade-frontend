export type User = {
  name: string;
  email: string | null;
  password: string | null;
  image_url?: string | null;
  token: string | null
  refreshToken: string | null
  isAuthenticated: boolean | null
  isLoading: boolean | null
};

export type Error = {
  message: object
  status: number | null
  id?: string | null
}

export type IItem2 = {
  id?: string;
  name: string;
  description: string;
  sold: boolean;
  seller: string;
  category: string;
  price: number;
  listedAt: Date;
  expires: Date;
  condition: string;
  pictureURL: string;
};

export type IItem = {
  item: {
    id: string;
    name: string;
    description: string;
    sold: boolean;
    category: string;
    price: number;
    listedAt: Date;
    expires: Date;
    condition: string;
    pictureURL: string;
  };
  seller: {
    name: string;
    id: number;
  };
};


export type StoreState = {
  items: IItem[];
  user: User | undefined;
  error: any
};
