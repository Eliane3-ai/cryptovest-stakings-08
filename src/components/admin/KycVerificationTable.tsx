
import React from 'react';
import { Eye } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useLanguage } from '@/contexts/LanguageContext';
import { getTranslation } from '@/utils/translations';
import { KycVerification } from '@/types/kyc';
import KycStatusBadge from './KycStatusBadge';

interface KycVerificationTableProps {
  verifications: KycVerification[];
  onViewDetails: (verification: KycVerification) => void;
}

const KycVerificationTable: React.FC<KycVerificationTableProps> = ({ 
  verifications,
  onViewDetails
}) => {
  const { language } = useLanguage();
  
  return (
    <div className="bg-[#1E2026] border-[#2B3139] border rounded-xl overflow-hidden">
      <Table>
        <TableHeader className="bg-[#2B3139]">
          <TableRow>
            <TableHead className="text-[#F0B90B]">{getTranslation('user', language).toUpperCase()}</TableHead>
            <TableHead className="text-[#F0B90B]">{getTranslation('fullName', language).toUpperCase()}</TableHead>
            <TableHead className="text-[#F0B90B]">{getTranslation('status', language).toUpperCase()}</TableHead>
            <TableHead className="text-[#F0B90B]">{getTranslation('submittedDate', language).toUpperCase()}</TableHead>
            <TableHead className="text-[#F0B90B]">{getTranslation('actions', language).toUpperCase()}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {verifications.map((verification) => (
            <TableRow key={verification.id} className="border-b border-[#2B3139] hover:bg-[#2B3139]/30">
              <TableCell className="font-medium text-white">{verification.user_id.substring(0, 8)}...</TableCell>
              <TableCell className="text-white">{verification.full_name}</TableCell>
              <TableCell>
                <KycStatusBadge status={verification.status} />
              </TableCell>
              <TableCell className="text-white">{new Date(verification.created_at).toLocaleDateString()}</TableCell>
              <TableCell>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => onViewDetails(verification)}
                  className="border-[#F0B90B] text-[#F0B90B] hover:bg-[#F0B90B]/10"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  {getTranslation('view', language)}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default KycVerificationTable;
