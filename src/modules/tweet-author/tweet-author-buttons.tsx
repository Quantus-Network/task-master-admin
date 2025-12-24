import { Button, useNotify, useRefresh, useRecordContext } from "react-admin";
import { httpClient } from "@/lib/http-client";
import { getAccessTokenOptions } from "@/lib/auth";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

export const WatchTweetAuthorButton = () => {
  const record = useRecordContext();
  const notify = useNotify();
  const refresh = useRefresh();

  const handleClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!record) return;

    try {
      await httpClient.put(
        `/tweet-authors/${record.id}/watch`,
        {},
        getAccessTokenOptions(),
      );
      notify("Author watched", { type: "success" });
      refresh();
    } catch (error) {
      notify("Error watching author", { type: "error" });
    }
  };

  return (
    <Button label="Watch" onClick={handleClick} color="primary">
      <VisibilityIcon />
    </Button>
  );
};

export const IgnoreTweetAuthorButton = () => {
  const record = useRecordContext();
  const notify = useNotify();
  const refresh = useRefresh();

  const handleClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!record) return;

    try {
      await httpClient.put(
        `/tweet-authors/${record.id}/ignore`,
        {},
        getAccessTokenOptions(),
      );
      notify("Author ignored", { type: "info" });
      refresh();
    } catch (error) {
      notify("Error ignoring author", { type: "error" });
    }
  };

  return (
    <Button label="Ignore" onClick={handleClick} color="warning">
      <VisibilityOffIcon />
    </Button>
  );
};

