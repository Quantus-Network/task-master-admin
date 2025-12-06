/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ETHERSCAN_BASE_URL,
  QUBE_BASE_URL,
  X_BASE_URL,
} from "@/constants/env-variables";
import {
  List,
  TextField,
  Datagrid,
  BooleanInput,
  SearchInput,
  FunctionField,
  ChipField,
} from "react-admin";
import { LinkField } from "../shared/components/LinkField";
import { ShortAddressField } from "../shared/components/ShortAddressField";

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
        <ShortAddressField
          source="address.quan_address"
          base_url={`${QUBE_BASE_URL}/accounts`}
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

        <FunctionField
          label="Reward Program"
          sortBy="is_opted_in"
          render={(record: any) => (
            <ChipField
              source="is_opted_in"
              record={{
                is_opted_in: record.is_opted_in ? "Active" : "Inactive",
              }}
              color={record.is_opted_in ? "success" : "error"}
              size="small"
              variant="outlined"
            />
          )}
        />

        <ShortAddressField
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
