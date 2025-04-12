import TreeClient from "./TreeClient";
export default async function CertificationDetailsPage({ params }: { params: Promise<{ reviewerId: string, certId: string }> }) {
  const { reviewerId, certId } = await params; 
  return (
    <>
      <h1 className="text-xl font-bold mb-6 border-b border-gray-300 pb-2 text-blue-950">Manager Actions</h1>
      <TreeClient reviewerId={reviewerId} certId={certId} />
    </>
  );
};
