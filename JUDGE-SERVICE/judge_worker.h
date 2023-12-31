#ifndef JUDGE_WORKER_H
#define JUDGE_WORKER_H

#include <iostream>
#include <string>
#include <filesystem>
#include <fstream>
#include <algorithm>
#include <vector>
#include <unistd.h>
#include <iomanip>
#include <map>
 
/* Judge Result:
 * NJ: Not Judged
 * AC: Accepted
 * WA: Wrong Answer
 * CE: Compile Error
 * RE: Runtime Error
 * TLE: Time Limit Exceeded
 * MLE: Memory Limit Exceeded
 * OLE: Output Limit Exceeded (출력 초과)
 * SE: Sandbox Execution Error 
 */

enum judge_result {
    NJ, AC, WA, CE, RE, TLE, MLE, OLE, SE
};

std::string judge_result_to_string(judge_result res) {
    switch(res) {
        case NJ: return "NJ";
        case AC: return "AC";
        case WA: return "WA";
        case CE: return "CE";
        case RE: return "RE";
        case TLE: return "TLE";
        case MLE: return "MLE";
        case OLE: return "OLE";
        case SE: return "SE";
        default: return "NJ";
    }
}

// 채점 프로세스 내부에서만 사용되는 에러 코드입니다.
enum error_code {
    NO_ERROR, COMPILE_ERROR, RUNTIME_ERROR, TIME_LIMIT_EXCEEDED, FILE_CREATE_ERROR, NO_FILE_ERROR
};

enum language {
    C, CPP, JAVA, PYTHON
};

std::string language_to_string(language lang) {
    switch(lang) {
        case C: return "C";
        case CPP: return "CPP";
        case JAVA: return "JAVA";
        case PYTHON: return "PYTHON";
        default: return "C";
    }
}

// 각 언어별 컴파일 옵션, 실행 옵션, 시간 제한, 메모리 제한 등을 저장하는 구조체
struct lang_config {
    language lang;
    std::string code_ext, exec_ext;
    std::string compile_cmd;
    std::string run_cmd;
    int(*get_max_time)(int);
    int(*get_max_mem)(int);

    lang_config(language l, std::string ce, std::string ee, std::string cc, std::string rc, int(*gwm)(int), int(*gmm)(int)): lang(l), code_ext(ce), exec_ext(ee), compile_cmd(cc), run_cmd(rc), get_max_time(gwm), get_max_mem(gmm) {}
    lang_config() {
        lang = CPP;
        code_ext = ".cc";
        exec_ext = "";
        compile_cmd = "g++ Main.cc -o Main -O2 -Wall -lm -static -std=gnu++20 -DONLINE_JUDGE -DBOJ";
        run_cmd = "./Main";
        get_max_time = [](int time) -> int { return time; };
        get_max_mem = [](int mem) -> int { return mem; };
    }
};

// 각 테스트 케이스별로 시간, 메모리, 결과 등을 저장하는 구조체
// 이 구조체를 기반으로 채점 결과를 알릴 것이다.
struct judge_info {
    size_t time, mem, code_bytes; // in ms, MB, bytes
    size_t tc_id;
    judge_result res;
    std::string err_msg; // 에러 메세지 출력용
    judge_info() { time = mem = code_bytes = 0; res = NJ; err_msg = ""; }
};

// 각 언어별 컴파일 옵션, 실행 옵션, 시간 제한, 메모리 제한 등을 저장하는 map
// 채점 큐에서 하나씩 꺼내, 해당 언어의 컴파일 옵션, 실행 옵션, 시간 제한, 메모리 제한 등을 가져올 것이다.
std::map<language, lang_config> lang_configs = {
    {C, lang_config(C, ".c", "", "gcc Main.c -o Main -O2 -Wall -lm -static -std=gnu11 -DONLINE_JUDGE -DBOJ", "./Main", [](int time) -> int { return time; }, [](int mem) -> int { return mem; })},
    {CPP, lang_config(CPP, ".cc", "", "g++ Main.cc -o Main -O2 -Wall -lm -static -std=gnu++20 -DONLINE_JUDGE -DBOJ", "./Main", [](int time) -> int { return time; }, [](int mem) -> int { return mem; })},
    {JAVA, lang_config(JAVA, ".java", ".class", "javac --release 17 -J-Xms256m -J-Xmx256m -J-Xss256m -encoding UTF-8 Main.java", " -- /usr/lib/jvm/java-17-openjdk-amd64/bin/java -Xms256m -Xmx256m -Xss256m -Dfile.encoding=UTF-8 -XX:+UseSerialGC -DONLINE_JUDGE=1 -DBOJ=1 Main", [](int time) -> int { return 2*time+1; }, [](int mem) -> int { return 2*mem+16; })},
    {PYTHON, lang_config(PYTHON, ".py", ".py", "python3 -W ignore -c \"import py_compile; py_compile.compile(r\'Main.py\')\"", " -- /usr/bin/python3 -W ignore Main.py", [](int time) -> int { return 3*time+2; }, [](int mem) -> int { return 2*mem+32; })}
};

// 채점 큐에서 꺼낸 제출 정보
// 이때 코드 자체가 긴 문자열로 되어있기 때문에, 문자열을 기반으로 파일을 만드는 작업 필요
// 사용하는 언어를 기반으로 파일을 만들고 컴파일할 것이다.
// 파일 입출력을 사용해 주어진 코드 (문자열)을 파일로 작성할 것이다.
// 이때 확장자 (code_ext)는 위 lang_configs에서 정의한 확장자를 사용할 것이다.
struct user_submission {
    size_t submit_id, problem_id, user_id;
    language lang;
    std::string code;
    size_t max_time, max_mem, code_bytes; // ms, MB, bytes

    user_submission(size_t si, size_t pi, size_t ui, language l, std::string c, size_t mw, size_t mm): submit_id(si), problem_id(pi), lang(l), user_id(ui), code(c), max_time(mw), max_mem(mm) { code_bytes = code.size(); }
    user_submission() {
        submit_id = 0U;
        problem_id = 0U;
        user_id = 0U;
        lang = CPP;
        code = "";
        max_time = max_mem = code_bytes = 0;
    }

    error_code compile_code(lang_config& cur_config) {
        std::string compile_cmd;
        std::ofstream cur_code;
        cur_code.open("Main" + cur_config.code_ext, std::ios::out | std::ios::trunc);

        // 파일 만들기
        if(!cur_code.is_open()) {
            std::cerr << "Failed to make the file\n";
            return FILE_CREATE_ERROR; 
        }

        cur_code << code;
        cur_code.close();

        // 컴파일 에러 -> 컴파일 에러 시 user_sumbission
        int compile_res = system(cur_config.compile_cmd.c_str());
        if(compile_res != 0) {
            std::cerr << "Compile Error\n";
            return COMPILE_ERROR;
        }
        return NO_ERROR;
    }
};

// 두 .out 파일을 비교하는 함수
// 테스트 케이스의 출력 파일과, 사용자의 출력 파일을 비교한다.
bool strip_and_compare(std::string& out, std::string& usr_out) {
    // Strip the string
    out.erase(std::remove(out.begin(), out.end(), ' '), out.end());
    out.erase(std::remove(out.begin(), out.end(), '\n'), out.end());
    out.erase(std::remove(out.begin(), out.end(), '\r'), out.end());
    usr_out.erase(std::remove(usr_out.begin(), usr_out.end(), ' '), usr_out.end());
    usr_out.erase(std::remove(usr_out.begin(), usr_out.end(), '\n'), usr_out.end());
    usr_out.erase(std::remove(usr_out.begin(), usr_out.end(), '\r'), usr_out.end());
    return out == usr_out;
}

bool remove_rawnline_compare(std::string out, std::string usr_out) {
    std::string new_usr_out;
    
    for (int i = 0; i < usr_out.size(); i++) {
        if (usr_out[i] == '\\') {
            if (usr_out[i + 1] == 'n') {
                new_usr_out += '\n';
                i++;
            } else {
                new_usr_out += usr_out[i];
            }
        } else {
            new_usr_out += usr_out[i];
        }
    }
    return out == new_usr_out;
}

// 채점 결과를 출력하는 함수
// 채점 중 가장 긴 실행 시간과 가장 큰 메모리 사용량을 출력해야 한다.
void print_statistics(user_submission& cur_sub, judge_info& cur_judge_info, int tc_cnt, int ac_cnt) {
    if (cur_judge_info.res == NJ)
    {
        if (ac_cnt == tc_cnt)
            cur_judge_info.res = AC;
        else
            cur_judge_info.res = WA;
    }

    std::cout << "=======================================\n";
    std::cout << std::to_string(cur_sub.problem_id) + " Statistics: \n";
    std::cout << "AC: " << ac_cnt << "\n";
    std::cout << "NOT AC: " << tc_cnt - ac_cnt << "\n";
    std::cout << "Judge result: " << judge_result_to_string(cur_judge_info.res) << "\n";
    std::cout << "Max Time: " << cur_judge_info.time << "ms\n";
    std::cout << "Max Memory: " << cur_judge_info.mem << "KB\n";
    std::cout << "Error Message: " << cur_judge_info.err_msg << "\n";
    std::cout << "=======================================\n";    
}

#endif