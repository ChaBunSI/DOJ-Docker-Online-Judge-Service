import axios from "axios";

export const LOCAL_STORAGE_JWT_KEY = "aksdjflaksdfj;lfsd";

export const BASE_URL = "http://172.17.0.1";
export const BASE_URL_WS = "ws://172.17.0.1";

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

  time_used: number;
  memory_used: number;

  tc_cur: number;
  tc_total: number;
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

const INIT_CODE_C = `#include<stdio.h>

int main(void){
  printf("Hello DOJ!\\n");
  return 0;
}`;

const INIT_CODE_CPP = `#include<iostream>
using namespace std;

int main(void){
  cout << "Hello DOJ!" << endl;
  return 0;
}`;

const INIT_CODE_JAVA = `public class Main {
  public static void main(String[] args) {
    System.out.println("Hello DOJ!");
  }
}`;

const INIT_CODE_PYTHON = `print("Hello DOJ!")`;

export const INIT_CODE_LIST = [
  INIT_CODE_C,
  INIT_CODE_CPP,
  INIT_CODE_JAVA,
  INIT_CODE_PYTHON,
];

export interface RealTimeInfoInterface {
  id: number;
  problem_id: number;
  tc_total: number;
  tc_cur: number;
  result: number;

  time_used: number;
  mem_used: number;
}

export interface UserStatInfoInterface {
  total_count: number;
  success_count: number;
  fail_count: number;
  success_problems: number[];
  fail_problems: number[];
}

export interface UserInfoInterfase {
  id: number;
  name: string;
  email: string;
}
