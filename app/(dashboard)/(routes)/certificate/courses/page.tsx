"use client";

import {
  IGetPaginatedCertificateParams,
  getPaginatedCertificateService,
} from "@/services/certificate.service";
import { useCallback, useEffect, useState, useRef } from "react";
import { toast } from "react-hot-toast";
import { createColumns } from "./_components/column";
import { DataTable } from "./_components/data-table";
import { useAuthStore } from "@/store/use-auth-store";
const CertificateLearnsPage = () => {
  const certificateRef = useRef<any>(null);
  const [certificates, setCertificates] = useState<any[]>([]);
  const { user } = useAuthStore.getState();
  const [params, setParams] = useState<IGetPaginatedCertificateParams>({
    pageSize: 1000,
    pageNumber: 1,
    conditions: [{
      key: "userId",
      condition: "equal",
      value: user.id
    },
    {
      key: "isCourse",
      condition: "equal",
      value: true
    }
    ],
    sortOrder: "createdAt desc",
    searchKey: "",
    searchFields: [],
    includeReferences: [],
  });

  const fetchCertificate = useCallback((param) => {
    getPaginatedCertificateService(param)
      .then((response) => {
        if (response.data.data) {
          const listCertificate = response.data.data.map((certificate: any) => ({
            ...certificate,
          }));
          setCertificates(listCertificate);
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }, [params]);

  useEffect(() => {
    fetchCertificate(params);
  }, [fetchCertificate]);


  const columns = createColumns(certificateRef);
  const onSearchCertificate = function(searchText){
    const condition = {
      pageSize: 1000,
      pageNumber: 1,
      conditions: [{
        key: "userId",
        condition: "equal",
        value: user.id
      },
      {
        key: "isCourse",
        condition: "equal",
        value: false
      }
      ],
      sortOrder: "createdAt desc",
      searchKey: searchText,
      searchFields: ["title"],
    }
    fetchCertificate( condition);
  }
  return (
    <div className="p-6">
      <DataTable onSearchCertificate={onSearchCertificate} columns={columns} data={certificates} />
    </div>
  );
};

export default CertificateLearnsPage;
