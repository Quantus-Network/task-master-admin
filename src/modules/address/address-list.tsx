import { ETHERSCAN_BASE_URL, X_BASE_URL } from "@/constants/env-variables";
import {
  List,
  TextField,
  BooleanField,
  Datagrid,
  BooleanInput,
  SearchInput,
} from "react-admin";
import { LinkField } from "./components/LinkField";

export const AddressList = () => {
  const postFilters = [
    <SearchInput key={0} source="q" alwaysOn placeholder="Keyword" />,
    <BooleanInput key={1} source="is_opted_in" label="Opted In?" />,
    <BooleanInput key={2} source="has_eth_address" label="Has ETH?" />,
    <BooleanInput key={3} source="has_x_account" label="Has X?" />,
  ];

  return (
    <List filters={postFilters}>
      <Datagrid rowClick={false}>
        <TextField
          source="address.quan_address"
          label="Address"
          sortBy="address"
        />
        <TextField
          source="address.referral_code"
          label="Referral Code"
          sortBy="referral_code"
        />
        <TextField
          source="address.referrals_count"
          label="Referrals Count"
          sortBy="referrals_count"
        />
        <BooleanField source="is_opted_in" label="Reward Program Participant" />
        <TextField source="opt_in_number" label="Participant Number" />
        <LinkField
          source="eth_address"
          label="ETH Address"
          base_url={`${ETHERSCAN_BASE_URL}/address`}
        />
        <LinkField
          source="x_username"
          label="X Username"
          base_url={X_BASE_URL}
          sortBy=""
        />
      </Datagrid>
    </List>
  );
};
