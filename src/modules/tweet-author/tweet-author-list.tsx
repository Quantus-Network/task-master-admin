import {
  List,
  Datagrid,
  SearchInput,
  DateField,
  NumberInput,
  FunctionField,
  ChipField,
  WrapperField,
} from "react-admin";
import { LinkField } from "../shared/components/LinkField";
import { X_BASE_URL } from "@/constants/env-variables";
import { TweetAuthorStatusToggle } from "./tweet-author-buttons";

export const TweetAuthorList = () => {
  const filters = [
    <SearchInput key={0} source="q" alwaysOn placeholder="Keyword" />,
    <NumberInput key={1} source="min_likes" label="Min likes" />,
    <NumberInput key={2} source="min_followers" label="Min followers" />,
  ];

  return (
    <List filters={filters}>
      <Datagrid rowClick={false}>
        <LinkField source="username" label="Username" base_url={X_BASE_URL} />

        <FunctionField
          source="followers_count"
          label="Followers"
          render={(record: { followers_count: number }) =>
            new Intl.NumberFormat("en-US", {
              notation: "compact",
              maximumFractionDigits: 1,
            }).format(record.followers_count)
          }
        />

        <FunctionField
          source="like_count"
          label="Likes"
          render={(record: { like_count: number }) =>
            new Intl.NumberFormat("en-US", {
              notation: "compact",
              maximumFractionDigits: 1,
            }).format(record.like_count)
          }
        />

        <DateField source="fetched_at" label="Fetched At" sortable={false} />

        <FunctionField
          label="Status"
          render={(record: { is_ignored: boolean }) => (
            <ChipField
              source="is_ignored"
              record={{
                is_ignored: record.is_ignored ? "Ignored" : "Watched",
              }}
              color={record.is_ignored ? "error" : "success"}
              size="small"
              variant="outlined"
            />
          )}
        />

        <WrapperField label="Action">
          <TweetAuthorStatusToggle />
        </WrapperField>
      </Datagrid>
    </List>
  );
};
