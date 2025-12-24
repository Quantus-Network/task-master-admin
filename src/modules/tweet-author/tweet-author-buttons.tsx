import { Button, useNotify, useRefresh, useRecordContext } from "react-admin";
import { httpClient } from "@/lib/http-client";
import { getAccessTokenOptions } from "@/lib/auth";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useState } from "react";
import extractErrMsg from "@/utils/extract-error-msg";

export const TweetAuthorStatusToggle = () => {
  const record = useRecordContext();
  const notify = useNotify();
  const refresh = useRefresh();
  const [loading, setLoading] = useState(false);

  if (!record) return null;

  const handleToggle = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setLoading(true);
    try {
      const endpoint = record.is_ignored
        ? `/tweet-authors/${record.id}/watch`
        : `/tweet-authors/${record.id}/ignore`;

      await httpClient.put(endpoint, {}, getAccessTokenOptions());
      notify(record.is_ignored ? "Author watched" : "Author ignored", {
        type: "success",
      });
      refresh();
    } catch (error) {
      const errMsg = extractErrMsg(error);
      notify(errMsg, { type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleToggle}
      color={record.is_ignored ? "primary" : "warning"}
      label={record.is_ignored ? "Watch" : "Ignore"}
      disabled={loading}
    >
      {record.is_ignored ? <VisibilityIcon /> : <VisibilityOffIcon />}
    </Button>
  );
};
