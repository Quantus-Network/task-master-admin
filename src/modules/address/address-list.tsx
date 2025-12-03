import { ETHERSCAN_BASE_URL, X_BASE_URL } from "@/constants/env-variables";
import { List, TextField, BooleanField, Datagrid } from "react-admin";
import { LinkField } from "./components/LinkField";

export const AddressList = () => {
  return (
    <List>
      <Datagrid rowClick={false}>
        <TextField source="address.quan_address" label="Address" />
        <TextField source="address.referral_code" label="Referral Code" />
        <TextField source="address.referrals_count" label="Referrals Count" />
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
        />
      </Datagrid>
    </List>
  );
};
