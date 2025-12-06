/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  List,
  TextField,
  Datagrid,
  BooleanInput,
  SearchInput,
  DateField,
  FunctionField,
} from "react-admin";
import { LinkField } from "../shared/components/LinkField";
import { X_BASE_URL } from "@/constants/env-variables";

export const TweetList = () => {
  const postFilters = [
    <SearchInput key={0} source="q" alwaysOn placeholder="Keyword" />,
    <BooleanInput key={1} source="is_opted_in" label="Opted In?" />,
    <BooleanInput key={2} source="has_eth_address" label="Has ETH?" />,
    <BooleanInput key={3} source="has_x_account" label="Has X?" />,
  ];

  return (
    <List filters={postFilters}>
      <Datagrid rowClick={false}>
        <FunctionField
          label="Tweet Id"
          sortable={false}
          render={(record: any) => (
            <LinkField
              source="tweet.id"
              base_url={`${X_BASE_URL}/${record.author_username}/status`}
              sortable={false}
            />
          )}
        />

        <LinkField
          source="author_username"
          label="Author"
          base_url={X_BASE_URL}
        />

        <TextField source="tweet.text" label="Text" sortable={false} />

        <TextField
          source="tweet.impression_count"
          label="Impressions"
          sortBy="impression_count"
        />

        <TextField
          source="tweet.reply_count"
          label="Replies"
          sortBy="reply_count"
        />

        <TextField
          source="tweet.retweet_count"
          label="Retweets"
          sortBy="retweet_count"
        />

        <TextField
          source="tweet.like_count"
          label="Likes"
          sortBy="like_count"
        />

        <DateField
          source="tweet.created_at"
          label="Created At"
          sortBy="created_at"
        />

        <DateField
          source="tweet.fetched_at"
          label="Fetched At"
          sortable={false}
        />
      </Datagrid>
    </List>
  );
};
