import { ErrorInfo } from './error';
import { User } from './users';

// --- Common ---

export type Lifecycle = {
  id: string;
  opened: string;
  distributed: string | null;
  proccesing: string | null;
  checking: string | null;
  closed: string | null;
};

export type Request = {
  id: string;
  a_name: string;
  a_mail: string;
  theme: string;
  description: string;
  chennal: string;
  infsys: string;
  executor: User | null;
  status: number;
  lifecycle: Lifecycle;
};

export type RequestWithIds = {
  id: string;
  a_name: string;
  a_mail: string;
  theme: string;
  description: string;
  chennal: string;
  infsys: string;
  executorId: string | null;
  executor: User | null;
  status: number;
  lifecycleId: string;
  lifecycle: Lifecycle;
};


// --- Fetch request ---

export type FetchRequestRequest = {
  data: {id: string;}
};

export type FetchRequestResponse = {
  data: Request | null;
  status: number;
  message: string | null;
  errorInfo: ErrorInfo | null;
};

// --- Fetch delete request ---

export type DeleteRequestRequest = {
  data: {id: string;}
};

export type FetchDeleteRequestResponse = {
  status: number;
  message: string | null;
  errorInfo: ErrorInfo | null;
};

// --- Fetch all requests ---
export type Pagination = {
    page: number | null;
    pageSize: number | null;
}
export type Filters = {
    searchString: string | null; 
    channel: string | null; 
    infsys: string | null; 
    executorLogin: string | null; 
    statuses: number[] | null;
    dateFrom: Date | null; 
    dateTo:  Date | null; 
}

export type FetchAllRequestsRequest = {
  data: {
    pagination: Pagination;
    filters: Filters;
  }
};

export type FetchAllRequestsResponse = {
  data: RequestWithIds[] | null;
  status: number;
  message: string | null;
  errorInfo: ErrorInfo | null;
};

// --- Fetch my requests ---

export type FetchMyRequestsRequest = null;

export type FetchMyRequestsResponse = {
  data: RequestWithIds[] | null;
  status: number;
  message: string | null;
  errorInfo: ErrorInfo | null;
};

// --- Create requests ---
export type RequestCreate = {
  a_name: string;
  a_mail: string;
  theme: string;
  description: string;
  chennal: string;
  infsys: string;
}


export type RequestCreateRequest = {
  data: RequestCreate;
};

export type RequestCreateResponse = {
  status: number;
  message: string | null;
  errorInfo: ErrorInfo | null;
};

// --- Edit requests ---
export type RequestEdit = {
  id: string;
  a_name: string;
  a_mail: string;
  theme: string;
  description: string;
  chennal: string;
  infsys: string;
  executorId: string | null;
}


export type RequestEditRequest = {
  data: RequestEdit;
};

export type RequestEditResponse = {
  status: number;
  message: string | null;
  errorInfo: ErrorInfo | null;
};

// --- Request distribute ---

export type DistributeRequestRequest = {
  data: {
    id: string;
    executorId: string | null;
  }
};

export type DistributeRequestResponse = {
  status: number;
  message: string | null;
  errorInfo: ErrorInfo | null;
};

// --- Request update ---

export type UpdateRequestRequest = {
  data: {
    id: string;
  }
};

export type UpdateRequestResponse = {
  status: number;
  message: string | null;
  errorInfo: ErrorInfo | null;
};