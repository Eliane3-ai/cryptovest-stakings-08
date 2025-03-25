
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
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{getTranslation('user', language)}</TableHead>
            <TableHead>{getTranslation('fullName', language)}</TableHead>
            <TableHead>{getTranslation('status', language)}</TableHead>
            <TableHead>{getTranslation('submittedDate', language)}</TableHead>
            <TableHead>{getTranslation('actions', language)}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {verifications.map((verification) => (
            <TableRow key={verification.id}>
              <TableCell className="font-medium">{verification.user_id.substring(0, 8)}...</TableCell>
              <TableCell>{verification.full_name}</TableCell>
              <TableCell>
                <KycStatusBadge status={verification.status} />
              </TableCell>
              <TableCell>{new Date(verification.created_at).toLocaleDateString()}</TableCell>
              <TableCell>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => onViewDetails(verification)}
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
