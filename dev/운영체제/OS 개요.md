# OS 개요

## Layered structure of a computer system 
컴퓨터 시스템의 계층 구조 개요

![image](https://user-images.githubusercontent.com/31977543/98387343-a034de00-2094-11eb-84d5-14abd2323e11.png)


(Source: A.Silberschatz, "Operating System Concept")

## 프로그램 실행 시, 컴퓨터 컴포넌트들의 논리적 View

![image](https://user-images.githubusercontent.com/31977543/98388296-edfe1600-2095-11eb-8a68-2dd80f08d114.png)

대표적인 컴포넌트
1. CPU (Central Processing Unit: 중앙 처리 장치)
2. Main Memory 
3. I/O Module

System Bus 로 연결됨

### CPU
![image](https://user-images.githubusercontent.com/31977543/98388852-9ca25680-2096-11eb-81f6-99f14545f16c.png)

1. PC (Program Counter) 
    - 다음 수행 명령어의 주소를 가리킴 
1. Register (레지스터)
    - 빠르게 접근 가능한 메모리
    - CPU 내부에 위치
    1. IR (Instruction Register) 
        - 명령어 저장
        - 명령어 디코딩 (해석)
    2. MAR (Memory Address Register), MBR (Memory Buffer Resister), I/O AR, I/O BR
        - 데이터를 담음
1. Execution Unit
    - ALU 수행 (Arithmetic Logic Unit: 산술 논리 연산 장치) 
   
### Main Memory
![image](https://user-images.githubusercontent.com/31977543/98389902-05d69980-2098-11eb-98d2-bc3062a73d69.png)

1. Instruction 명령어
1. Data 

명령어(데이터) = Content + 주소

### I/O Module
![image](https://user-images.githubusercontent.com/31977543/98390087-46361780-2098-11eb-9225-81b4d5db8ba7.png)
1. Buffer 
    - 작은 메모리 공간
    
![image](https://user-images.githubusercontent.com/31977543/98390261-77aee300-2098-11eb-8a0b-cb866c31afdc.png)

    
    
 