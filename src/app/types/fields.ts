import { ErrorInfo } from './error';

// --- Common ---

export type Field = {
  id: string;
  cat: string | null;
  name: string | null;
};

// --- Fetch field ---

export type FetchFieldRequest = null;
export type DeleteFieldRequest = null;


export type FetchFieldResponse = {
  status: number;
  message: string | null;
  errorInfo: ErrorInfo | null;
  data: Field | null;
};

// --- Fetch delete dield ---

export type FetchDeleteFieldResponse = {
  status: number;
  message: string | null;
  errorInfo: ErrorInfo | null;
};

// --- Fetch all fields ---

export type FetchAllFieldsRequest = null;

export type FetchAllFieldsResponse = {
  status: number;
  message: string | null;
  errorInfo: ErrorInfo | null;
  data: Field[] | null;
};

export type FieldAddRequest = {
  data: Field;
};