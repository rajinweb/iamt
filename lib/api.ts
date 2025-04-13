// getCertificationList of a Reviewer
export const getCertifications = async (reviewerId: string) => {
    const res = await fetch(`https://lab.kapitalai.io/certification/api/v1/ASRODEV/getCertificationList/${reviewerId}`);
    return res.json();
  };
  //Get All Users of a Certification Instance
  export async function getCertificationDetails(reviewerId: string, certId: string) {
  const res = await fetch(`https://lab.kapitalai.io/certification/api/v1/ASRODEV/getCertificationDetails/${reviewerId}/${certId}`);
  return res.json();
  }

/*
export async function getCertificationDetails(
  reviewerId: string,
  certId: string,
  pageSize?: number,
  pageNumber?: number
) {
  let url = `https://lab.kapitalai.io/certification/api/v1/ASRODEV/getCertificationDetails/${reviewerId}/${certId}`;

  if (pageSize && pageNumber) {
    url += `?pageSize=${pageSize}&pageNumber=${pageNumber}`;
  }

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error('Failed to fetch certification details');
  }
  return res.json();
}
*/
  //Get All Access of All Users 
  export const getAccessDetails = async (reviewerId: string, certId: string, taskId?: string, all?:string) => {
  const res = await fetch(`https://lab.kapitalai.io/certification/api/v1/ASRODEV/getAccessDetails/${reviewerId}/${certId}/${all ? 'All' : taskId}`);
  return res.json();
  };
  