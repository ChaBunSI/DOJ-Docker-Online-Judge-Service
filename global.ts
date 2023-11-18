import axios from "axios";

export const LOCAL_STORAGE_JWT_KEY = "aksdjflaksdfj;lfsd";

export const BASE_URL = "https://api.goodpose.shop";

export const axiosGroup = {
  default: axios.create({
    baseURL: BASE_URL,
  }),
  api: axios.create({
    baseURL: BASE_URL,
  }),
};

export interface ProblemListItemDataInterface {
  id: number;
  title: string;
  solve_num: number;
  wrong_num: number;
}

export interface ProblemDataInterface {
  id: number;
  title: string;
  content: string;
  solve_num: number;
  wrong_num: number;
  memory_limited: number;
  time_limited: number;
  testCaseList: {
    id: number;
    input: string;
    output: string;
  }[];
}
