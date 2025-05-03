import { LineItemDetail } from "@/types/lineItem";

const BASE_URL = "https://lab.kapitalai.io/certification/api/v1/ASRODEV";
// Generic fetch function with optional pagination
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
  const res = await fetch(url.toString());

  if (!res.ok) {
    const errorBody = await res.text();
    throw new Error(
      `Fetch failed: ${res.status} ${res.statusText}\n${errorBody}`
    );
  }

  return res.json();
}

// Get list of certifications for a reviewer
export async function getCertifications<T>(
  reviewerId: string,
  pageSize?: number,
  pageNumber?: number
): Promise<T> {
  const endpoint = `${BASE_URL}/getCertificationList/${reviewerId}`;
  return fetchApi<T>(endpoint, pageSize, pageNumber);
}

// Get certification details for a specific certification
export async function getCertificationDetails<T>(
  reviewerId: string,
  certId: string,
  pageSize?: number,
  pageNumber?: number
): Promise<T> {
  const endpoint = `${BASE_URL}/getCertificationDetails/${reviewerId}/${certId}`;
  return fetchApi<T>(endpoint, pageSize, pageNumber);
}

// Get access details (for either a specific task or all)
export async function getAccessDetails<T>(
  reviewerId: string,
  certId: string,
  taskId?: string,
  all?: string,
  pageSize?: number,
  pageNumber?: number
): Promise<T> {
  const finalPart = all ? "All" : taskId ?? "";
  const endpoint = `${BASE_URL}/getAccessDetails/${reviewerId}/${certId}/${finalPart}`;
  return fetchApi<T>(endpoint, pageSize, pageNumber);
}

// Get all entitlements of an applicatio
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

  if (Array.isArray(response?.items)) {
    return response.items as LineItemDetail[];
  }

  if (Array.isArray(response)) {
    return response as LineItemDetail[];
  }

  return [];
}
