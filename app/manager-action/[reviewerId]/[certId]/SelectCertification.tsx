'use client';

import React, { useEffect, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { useCertifications } from '@/hooks/useApi';
import type { Props as SelectProps, SingleValue } from 'react-select';

interface CertOption {
  value: string;
  label: string;
}

interface SelectCertificationProps {
  reviewerId: string;
  certIdFromURL: string | null;
  onSelectCert: (cert: CertOption) => void;
}

const Select = dynamic<SelectProps<CertOption>>(
  () => import('react-select'),
  { ssr: false }
);

const SelectCertification: React.FC<SelectCertificationProps> = ({
  reviewerId,
  certIdFromURL,
  onSelectCert,
}) => {
  const { data: certifications, isLoading, isError } = useCertifications(reviewerId);

  // ✅ Memoize certificationOptions to avoid useEffect warning
  const certificationOptions: CertOption[] = useMemo(() => {
    if (!certifications) return [];

    return [
      { value: 'ALL', label: 'All Certifications' },
      ...certifications.map((cert) => ({
        value: cert.certificationId,
        label: cert.certificationName,
      })),
    ];
  }, [certifications]);

  useEffect(() => {
    if (!certificationOptions.length) return;

    const preselected =
      certificationOptions.find((c) => c.value === certIdFromURL) ||
      certificationOptions[0];

    onSelectCert(preselected);
  }, [certificationOptions, certIdFromURL, onSelectCert]);

  const handleChange = (selectedOption: SingleValue<CertOption>) => {
    onSelectCert(selectedOption || certificationOptions[0]);
  };

  return (
    <div>
      {isLoading && <div>Loading certifications...</div>}
      {isError && <div style={{ color: 'red' }}>Failed to load certifications.</div>}

      {!isLoading && !isError && (
        <Select
          options={certificationOptions}
          onChange={()=>handleChange}
          defaultValue={certificationOptions[0]}
          placeholder="Select Certification"
          isSearchable
          styles={{
            control: (styles) => ({
              ...styles,
              width: '300px',
            }),
          }}
        />
      )}
    </div>
  );
};

export default SelectCertification;