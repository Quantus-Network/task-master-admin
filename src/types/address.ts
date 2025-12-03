export interface Address {
  address: {
    quan_address: string;
    referral_code: string;
    referrals_count: number;
    updated_at: string | null;
    created_at: string | null;
  };
  is_opted_in: boolean;
  opt_in_number: number | null;
  eth_address: string | null;
  x_username: string | null;
}
