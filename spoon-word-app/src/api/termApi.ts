import axiosInstance from "./axiosInstance";

type Term = {
    id: number | string;
    title: string;
    description?: string | null;
    tags?: string[] | null;
};

type SearchByTagResponse = {
    page?: number;
    size?: number;
    total?: number;
    items?: Term[];
    content?: Term[];
    totalElements?: number;
};

export const fetchTermsByTag = async (
    tag: string,
    page = 0,
    size = 20
): Promise<SearchByTagResponse> => {
    if (!tag || !tag.trim()) {
        // 빈 태그 방지: 필요 시 빈 결과 형식으로 반환
        return { page, size, total: 0, items: [] };
    }

    // encodeURIComponent로 안전하게 전달
    const { data } = await axiosInstance.get<SearchByTagResponse>("/terms/search/by-tag", {
        params: { tag: tag.trim(), page, size },
    });

    // 응답 키가 섞여 들어오는 경우 일관 포맷으로 정규화
    const items = data.items ?? data.content ?? [];
    const total = data.total ?? data.totalElements ?? items.length;

    return { ...data, items, total };
};
