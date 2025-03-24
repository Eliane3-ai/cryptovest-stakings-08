
export interface KycVerification {
  id: string;
  user_id: string;
  full_name: string;
  email: string;
  mobile: string;
  country: string;
  address: string;
  id_card_url?: string;
  status: 'pending' | 'approved' | 'rejected';
  admin_notes?: string;
  created_at: string;
  updated_at: string;
}

export interface KycFormData {
  full_name: string;
  email: string;
  mobile: string;
  country: string;
  address: string;
  id_card_file?: File;
}
