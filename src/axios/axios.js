import axios from "axios";

// axios 인스턴스 생성
// baseURL: 모든 요청의 기본 URL (매번 전체 URL을 쓰지 않아도 됨)
// headers: 모든 요청에 공통으로 붙는 헤더
export const instance = axios.create({
  baseURL: "http://localhost:3000/",
  headers: {
    "Content-Type": "application/json",
  },
});
