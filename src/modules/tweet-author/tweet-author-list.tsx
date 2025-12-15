/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  List,
  TextField,
  Datagrid,
  SearchInput,
  DateField,
  NumberInput,
} from "react-admin";
import { LinkField } from "../shared/components/LinkField";
import { X_BASE_URL } from "@/constants/env-variables";

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

        <TextField source="followers_count" label="Followers" />

        <TextField source="like_count" label="Likes" />

        <DateField source="fetched_at" label="Fetched At" sortable={false} />
      </Datagrid>
    </List>
  );
};
