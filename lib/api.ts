import { LineItemDetail } from "@/types/lineItem";
import { PaginatedResponse } from "@/types/api";

const BASE_URL = "https://lab.kapitalai.io/certification/api/v1/ASRODEV";

// Generic fetch with headers + pagination
export async function fetchApi<T>(
  endpoint: string,
  pageSize?: number,
  pageNumber?: number
): Promise<T> {
  const url = new URL(endpoint);

  if (pageSize !== undefined) {
    url.searchParams.append("pageSize", pageSize.toString());
  }

  if (pageNumber !== undefined) {
    url.searchParams.append("pageNumber", pageNumber.toString());
  }

  const headers = {
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
  };

  const res = await fetch(url.toString(), { headers }); // ✅ fixed

  if (!res.ok) {
    const errorBody = await res.text();
    throw new Error(
      `Fetch failed: ${res.status} ${res.statusText}\n${errorBody}`
    );
  }

  return res.json();
}

export async function getCertifications(
  reviewerId: string,
  pageSize?: number,
  pageNumber?: number
): Promise<PaginatedResponse<any>> {
  const endpoint = `${BASE_URL}/getCertificationList/${reviewerId}`;
  return fetchApi(endpoint, pageSize, pageNumber);
}

export async function getCertificationDetails(
  reviewerId: string,
  certId: string,
  pageSize?: number,
  pageNumber?: number
): Promise<PaginatedResponse<any>> {
  const endpoint = `${BASE_URL}/getCertificationDetails/${reviewerId}/${certId}`;
  return fetchApi(endpoint, pageSize, pageNumber);
}

export async function getAccessDetails(
  reviewerId: string,
  certId: string,
  taskId?: string,
  all?: string,
  pageSize?: number,
  pageNumber?: number
): Promise<PaginatedResponse<any>> {
  const finalPart = all ? "All" : taskId ?? "";
  const endpoint = `${BASE_URL}/getAccessDetails/${reviewerId}/${certId}/${finalPart}`;
  return fetchApi(endpoint, pageSize, pageNumber);
}

export async function getLineItemDetails(
  reviewerId: string,
  certId: string,
  taskId: string,
  lineItemId: string,
  pageSize?: number,
  pageNumber?: number
): Promise<LineItemDetail[]> {
  const endpoint = `${BASE_URL}/getLineItemDetails/${reviewerId}/${certId}/${taskId}/${lineItemId}`;
  const response: { items?: LineItemDetail[] } = await fetchApi(
    endpoint,
    pageSize,
    pageNumber
  );

  if (Array.isArray(response?.items)) return response.items;
  if (Array.isArray(response)) return response;

  return [];
}
