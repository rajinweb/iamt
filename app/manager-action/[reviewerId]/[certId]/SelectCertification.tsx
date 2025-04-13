'use client';

import React, { useEffect, useState } from 'react';
import { getCertifications } from "@/lib/api";
import dynamic from "next/dynamic";
const Select = dynamic(() => import('react-select'), {
  ssr: false,
});

interface CertOption {
  value: string;
  label: string;
}

interface SelectCertificationProps {
  reviewerId: string;
  certIdFromURL: string | null;
  onSelectCert: (cert: CertOption) => void;
}

const SelectCertification: React.FC<SelectCertificationProps> = ({
  reviewerId,
  certIdFromURL,
  onSelectCert,
}) => {
  const [certificationList, setCertificationList] = useState<CertOption[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCerts = async () => {
      setLoading(true);
      try {
        const response = await getCertifications(reviewerId);
        const certs = response.items || [];

        const mapped = certs.map((cert: any) => {
          const info = cert.reviewerCertificationInfo[0] || {};
          return {
            value: cert.certificationId,
            label: info.certificationName,
          };
        });

        const allOption = { value: "ALL", label: "All Certifications" };
        const finalList = [allOption, ...mapped];

        setCertificationList(finalList);

        const preselected = finalList.find((c) => c.value === certIdFromURL);
        onSelectCert(preselected || allOption);
      } catch (err) {
        setError("Failed to fetch certifications.");
      } finally {
        setLoading(false);
      }
    };

    fetchCerts();
  }, [certIdFromURL, reviewerId, onSelectCert]);

  const handleChange = (selectedOption: any) => {
    onSelectCert(selectedOption || certificationList[0]);
  };

  return (
    <div>
      {loading && <div>Loading...</div>}
      {error && <div style={{ color: 'red' }}>{error}</div>}
      
      {/* React-Select dropdown */}
      <Select
        options={certificationList}
        onChange={handleChange}
        defaultValue={certificationList[0]}  // Set default value as the first option
        getOptionLabel={(e:any) => e.label}
        getOptionValue={(e:any) => e.value}
        placeholder="Select Certification"
        isSearchable={true}  // Enable search functionality in the dropdown
        styles={{
          control: (styles) => ({
            ...styles,
            width: '300px',
          }),
        }}
      />
    </div>
  );
};

export default SelectCertification;
