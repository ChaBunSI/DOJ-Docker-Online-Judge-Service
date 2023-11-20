import axios from "axios";

export const LOCAL_STORAGE_JWT_KEY = "aksdjflaksdfj;lfsd";

export const BASE_URL = "https://api.goodpose.shop";

export const fetchGroup = {
  api: axios.create({
    baseURL: BASE_URL,
  }),
};

export interface ProblemListItemDataInterface {
  id: number;
  title: string;
  solve_num: number;
  wrong_num: number;
  content: string;
}

export interface ProblemDataInterface {
  id: number;
  title: string;
  content: string;
  solve_num: number;
  wrong_num: number;
  memory_limited: number;
  time_limited: number;
  input_description: string;
  output_description: string;
  testCaseList: {
    id: number;
    input: string;
    output: string;
  }[];
}

export interface SubmitDataInterface {
  id: number;
  user_id: number;
  is_passed: boolean;
  is_judged: boolean;
  judge_status: number;
  source: string;
  language_code: number;
  judge_description: string;
  error_message: string;
  created_time: string;
  start_time: string;
  end_time: any;
  problem_id: number;
}

export const getLanguage = (num: number) => {
  switch (num) {
    case 0:
      return "C11";
    case 1:
      return "C++20";
    case 2:
      return "Java 17";
    case 3:
      return "Python 3.10.9";
    default:
      return "Espanol";
  }
};

export const getSubmitResult = (status: number) => {
  switch (status) {
    case 0:
      return "Judging...";
    case 1:
      return "Accepted";
    case 2:
      return "Wrong Answer";
    case 3:
      return "Compile Error";
    case 4:
      return "Runtime Error";
    case 5:
      return "Time Limit Exceeded";
    case 6:
      return "Memory Limit Exceeded";
    case 7:
      return "Output Limit Exceeded";
    case 8:
      return "Sandbox Limit Exceeded";
    default:
      return "Unknown Error";
  }
};
