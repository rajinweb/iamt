// Generic fetch function with optional pagination
export async function fetchApi<T>(
  endpoint: string,
  pageSize?: number,
  pageNumber?: number
): Promise<T> {
  const url = new URL(endpoint);

  if (pageSize !== undefined) {
    url.searchParams.append('pageSize', pageSize.toString());
  }

  if (pageNumber !== undefined) {
    url.searchParams.append('pageNumber', pageNumber.toString());
  }

  const res = await fetch(url.toString());

  if (!res.ok) {
    throw new Error(`Fetch failed: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

// Get list of certifications for a reviewer
export async function getCertifications<T>(
  reviewerId: string,
  pageSize?: number,
  pageNumber?: number
): Promise<T> {
  const endpoint = `https://lab.kapitalai.io/certification/api/v1/ASRODEV/getCertificationList/${reviewerId}`;
  return fetchApi<T>(endpoint, pageSize, pageNumber);
}

// Get certification details for a specific certification
export async function getCertificationDetails<T>(
  reviewerId: string,
  certId: string,
  pageSize?: number,
  pageNumber?: number
): Promise<T> {
  const endpoint = `https://lab.kapitalai.io/certification/api/v1/ASRODEV/getCertificationDetails/${reviewerId}/${certId}`;
  return fetchApi<T>(endpoint, pageSize, pageNumber);
}

// Get access details (for either a specific task or all)
export async function getAccessDetails<T>(
  reviewerId: string,
  certId: string,
  taskId?: string,
  all?: string
): Promise<T> {
  const finalPart = all ? 'All' : taskId ?? '';
  const endpoint = `https://lab.kapitalai.io/certification/api/v1/ASRODEV/getAccessDetails/${reviewerId}/${certId}/${finalPart}`;
  return fetchApi<T>(endpoint);
}
