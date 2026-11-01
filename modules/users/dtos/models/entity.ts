// ----------------- USER
export interface User {
  name: string;
  accessToken: any;
  user: any;
  userId: string;
  username: string;
  password: string;
  roles: string;
  phoneNumber: string;
}
// ----------------- USER

export interface Pemasukan {
  tanggal: string;
  uraian: string;
  jumlah: number;
  jenis_transaksi: string;
}

export interface editUser {
  userId?: string;
  username?: string;
  password?: string;
  roles?: string;
  phoneNumber?: string;
  address?: string;
}

export interface topUp {
  house_number?: number;
  amount?: number;
}

export interface UserAdd {
  name: string;
  username: string;
  password: string;
  phoneNumber: string;
}

export interface CreateActivity {
  title: string;
  description: string;
  activity_photos: File[];
  invoice_photos: File[];
  type: string;
  amount: number;
}

// ----------------- WALLET
export interface WalletEntity {
  id: string;
  userid: string;
  balance: number;
  type: string;
  user?: CurrentUserDTO;
}

export enum WALLET_TYPE_ENUM {
  NORMAL = "NORMAL", // dompet warga
  VAULT = "VAULT", // penyimpanan kas / DOMPET ADMIN
}

export type WALLET_TYPE = keyof typeof WALLET_TYPE_ENUM;
// ----------------- WALLET

// ----------------- ROLE
/**
 * Organization-scoped roles used by Iqam Global / Ommar.net.
 */
export enum ROLE_TYPE_ENUM {
  ADMIN = "ADMIN",
  FINANCE = "FINANCE",
  OPERATOR = "OPERATOR",
  GUEST = "GUEST",
}

export type RoleType = keyof typeof ROLE_TYPE_ENUM;

// ----------------- ROLE

// ----------------- Current User
export interface CurrentUserDTO {
  id: string;
  name: string;
  roles: RoleType;
}
