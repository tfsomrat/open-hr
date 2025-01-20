export type TLog = {
  log: string;
  date: Date;
};

export type TAsset = {
  asset_id: string;
  user: string;
  name: string;
  type: "laptop" | "desktop" | "mobile" | "keyboard" | "mouse" | "monitor";
  serial_number: string;
  price: number;
  currency: "bdt" | "usd";
  purchase_date: Date;
  archive: boolean;
  note: string;
  logs: TLog[];
  createdAt: Date;
};

export type TAssetState<T = TAsset[]> = {
  loading: boolean;
  result: T;
  meta: {
    total: number;
  };
  error: boolean;
};

export type TAllAssetsState = {
  success: boolean;
  message: string;
  result: TAsset[];
};
