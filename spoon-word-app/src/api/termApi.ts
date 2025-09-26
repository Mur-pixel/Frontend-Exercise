// src/api/termApi.ts
import axiosInstance from "./axiosInstance";

/** 일반 검색: /api/terms/search (UI 0-base → 서버 1-base) */
export const searchTerms = async (params: {
    q?: string;
    page?: number;   // 0-base (UI)
    size?: number;
    initial?: string;
    alpha?: string;
    symbol?: string;
    catPath?: string;
}) => {
    const {
        q = "",
        page = 0,
        size = 20,
        initial = "",
        alpha = "",
        symbol = "",
        catPath = "",
    } = params || {};

    const { data } = await axiosInstance.get("/api/terms/search", {
        params: {
            q,
            page: page + 1, // 👈 서버 1-base
            size,
            initial,
            alpha,
            symbol,
            catPath,
        },
    });
    return data;
};

/** 태그 검색: /api/terms/search/by-tag (서버 1-base) */
export const fetchTermsByTag = async (tag: string, page = 1, size = 10) => {
    const { data } = await axiosInstance.get("/api/terms/search/by-tag", {
        params: { tag, page, size },
    });
    return data;
};
