
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useLanguage } from '@/contexts/LanguageContext';
import { getTranslation } from '@/utils/translations';
import { KycFormData, KycVerification } from '@/types/kyc';

interface KycSubmissionFormProps {
  formData: KycFormData;
  kycData: KycVerification | null;
  uploading: boolean;
  uploadProgress: number;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onIdCardUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => Promise<void>;
  onCancel: () => void;
}

const KycSubmissionForm: React.FC<KycSubmissionFormProps> = ({
  formData,
  kycData,
  uploading,
  uploadProgress,
  onInputChange,
  onIdCardUpload,
  onSubmit,
  onCancel
}) => {
  const { language } = useLanguage();

  return (
    <form onSubmit={onSubmit} className="space-y-4 py-4">
      <div className="grid grid-cols-1 gap-4">
        <div className="space-y-2">
          <label htmlFor="full_name" className="text-sm font-medium">{getTranslation('fullName', language)}</label>
          <Input
            id="full_name"
            name="full_name"
            placeholder={getTranslation('enterFullName', language)}
            value={formData.full_name}
            onChange={onInputChange}
            disabled={uploading}
            required
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">{getTranslation('emailAddress', language)}</label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder={getTranslation('enterEmail', language)}
            value={formData.email}
            onChange={onInputChange}
            disabled={uploading}
            required
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="mobile" className="text-sm font-medium">{getTranslation('mobileNumber', language)}</label>
          <Input
            id="mobile"
            name="mobile"
            placeholder={getTranslation('enterMobile', language)}
            value={formData.mobile}
            onChange={onInputChange}
            disabled={uploading}
            required
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="country" className="text-sm font-medium">{getTranslation('country', language)}</label>
          <Input
            id="country"
            name="country"
            placeholder={getTranslation('enterCountry', language)}
            value={formData.country}
            onChange={onInputChange}
            disabled={uploading}
            required
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="address" className="text-sm font-medium">{getTranslation('address', language)}</label>
          <Input
            id="address"
            name="address"
            placeholder={getTranslation('enterAddress', language)}
            value={formData.address}
            onChange={onInputChange}
            disabled={uploading}
            required
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="id_card_file" className="text-sm font-medium">
            {getTranslation('idCard', language)}
            {!kycData && <span className="text-red-500">*</span>}
            {kycData && <span className="text-muted-foreground text-xs ml-2">({getTranslation('optionalIfAlreadyUploaded', language)})</span>}
          </label>
          <div className="flex items-center space-x-2">
            <Input
              id="id_card_file"
              type="file"
              accept="image/*,.pdf"
              onChange={onIdCardUpload}
              disabled={uploading}
              className="file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:bg-primary file:text-white hover:file:bg-primary/90"
              required={!kycData}
            />
          </div>
          {formData.id_card_file && (
            <p className="text-xs text-muted-foreground mt-1">
              {getTranslation('selectedFile', language)}: {formData.id_card_file.name}
            </p>
          )}
          {kycData?.id_card_url && !formData.id_card_file && (
            <p className="text-xs text-primary mt-1">
              <a href={kycData.id_card_url} target="_blank" rel="noopener noreferrer">
                {getTranslation('viewCurrentDocument', language)}
              </a>
            </p>
          )}
        </div>
      </div>
      
      {uploading && (
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>{getTranslation('processingVerification', language)}</span>
            <span>{uploadProgress}%</span>
          </div>
          <Progress value={uploadProgress} className="h-2" />
        </div>
      )}
      
      <div className="flex justify-end gap-3 pt-4">
        <Button type="button" variant="outline" onClick={onCancel} disabled={uploading}>
          {getTranslation('cancel', language)}
        </Button>
        <Button type="submit" disabled={uploading}>
          {uploading ? getTranslation('processing', language) : getTranslation('submitVerification', language)}
        </Button>
      </div>
    </form>
  );
};

export default KycSubmissionForm;
