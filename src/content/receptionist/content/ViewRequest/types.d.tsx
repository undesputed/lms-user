export interface subCategory {
  id: number;
  category_id: number;
  sub_category_name: string;
  price: number;
  status: number;
  authBy: number;
  created_at: Date;
  updated_at: null;
  deleted_at: null;
}

export interface category {
  id: number;
  category_name: string;
  authBy: number;
  status: number;
  created_at: Date | string | null;
  updated_at: Date | string | null;
  deleted_at: Date | string | null;
}

export interface BasicInfo {
  id: number;
  name: string;
  dateOfVisit: Date | string;
  phone: string;
  birthday: Date | string;
  gender: number;
  address: string;
  companyName: string;
  others: string | null;
  referredBy: string | null;
  dateRequested: Date | string | null;
  status: number;
  authBy: number;
  created_at: Date | string | null;
  updated_at: Date | string | null;
}

export interface LabTest {
  id: number;
  category_id: number;
  sub_category_name: string;
  price: number;
  status: number;
  authBy: number;
  created_at: Date | string | null;
  updated_at: Date | string | null;
  deleted_at: Date | string | null;
}

export type LabTestProps = {
  labTest: LabTest[];
  handleAddTest?: () => void;
  handleOnDelete?: (id: number, sub_category_name: string) => void;
  open?: boolean;
  handleClose?: () => void;
  subCategory?: subCategory[];
  category?: category[];
  handleAddTestOnChange?: (event: any, id: number) => void;
  handleAddingTest?: () => void;
};

export type BasicInfoProp = {
  open?: boolean;
  basicInfo: BasicInfo;
  onChange?: (e: any) => void;
  handleUpdate?: () => void;
  handleClose?: () => void;
};

export type State = {
  basicInfo: BasicInfo;
  labTest: LabTest[];
  promptModal: boolean;
  addLabTest: boolean;
  subCategory: subCategory[];
  category?: category[];
};

export type Action =
  | { type: 'setBasicInfo'; payload: BasicInfo }
  | { type: 'updateBasicInfo'; name: string; value: any }
  | { type: 'setPrompt'; payload: boolean }
  | { type: 'setAddLabTest'; payload: boolean }
  | { type: 'setSubCategory'; payload: subCategory[] }
  | { type: 'setCategory'; payload: category[] }
  | { type: 'setLabTest'; payload: LabTest[] };
