export type TOrganization = {
  _id: string;
  name: string;
  login_id: string;
  password: string;
  price: number;
  currency: string;
  billing: "monthly" | "yearly" | "one-time";
  users: string[];
  purchase_date: Date;
  expire_date: Date;
};

export type TTool = {
  platform: string;
  website: string;
  organizations: TOrganization[];
  createdAt: Date;
};

export type TToolState<T = TTool[]> = {
  loading: boolean;
  result: T;
  meta: {
    total: number;
  };
  error: boolean;
};

export type TAllToolsState = {
  success: boolean;
  message: string;
  result: (TOrganization & { platform: string; website: string })[];
};
