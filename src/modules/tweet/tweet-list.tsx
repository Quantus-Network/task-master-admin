/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  List,
  TextField,
  Datagrid,
  SearchInput,
  DateField,
  FunctionField,
  TextInput,
  NumberInput,
  DateInput,
} from "react-admin";
import { LinkField } from "../shared/components/LinkField";
import { X_BASE_URL } from "@/constants/env-variables";

export const TweetList = () => {
  const filters = [
    <SearchInput key={0} source="q" alwaysOn placeholder="Keyword" />,
    <TextInput
      key={1}
      source="author_username"
      label="Author"
      placeholder="Username e.g YuviLightman"
    />,
    <NumberInput key={2} source="min_likes" label="Min likes" />,
    <NumberInput key={3} source="min_impressions" label="Min impressions" />,
    <DateInput
      key={4}
      source="created_after"
      label="Created At/After"
      parse={(date) => {
        if (!date) return;
        return new Date(date).toISOString();
      }}
    />,
  ];

  return (
    <List filters={filters}>
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

        <FunctionField
          source="tweet.impression_count"
          label="Impressions"
          sortBy="impression_count"
          render={(record: any) =>
            new Intl.NumberFormat("en-US", {
              notation: "compact",
              maximumFractionDigits: 1,
            }).format(record.tweet.impression_count)
          }
        />

        <FunctionField
          source="tweet.reply_count"
          label="Replies"
          sortBy="reply_count"
          render={(record: any) =>
            new Intl.NumberFormat("en-US", {
              notation: "compact",
              maximumFractionDigits: 1,
            }).format(record.tweet.reply_count)
          }
        />

        <FunctionField
          source="tweet.retweet_count"
          label="Retweets"
          sortBy="retweet_count"
          render={(record: any) =>
            new Intl.NumberFormat("en-US", {
              notation: "compact",
              maximumFractionDigits: 1,
            }).format(record.tweet.retweet_count)
          }
        />

        <FunctionField
          source="tweet.like_count"
          label="Likes"
          sortBy="like_count"
          render={(record: any) =>
            new Intl.NumberFormat("en-US", {
              notation: "compact",
              maximumFractionDigits: 1,
            }).format(record.tweet.like_count)
          }
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
