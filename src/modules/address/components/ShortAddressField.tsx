import { useNotify, useRecordContext } from "react-admin";
import { Typography, Box, Tooltip } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { getRecordValue } from "@/utils/record-access";

// Helper to truncate text
const truncate = (str: string, n: number) => {
  if (!str || str.length <= n) return str;
  return `${str.slice(0, 6)}...${str.slice(str.length - 4)}`;
};

export const ShortAddressField = (props: {
  source: string;
  base_url: string;
  label?: string;
  sortBy?: string;
}) => {
  const record = useRecordContext(props);
  const notify = useNotify();

  const value = record ? getRecordValue(record, props.source) : null;

  if (!value) return <span>-</span>;

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(value);
    notify(`Copied to clipboard!`, { type: "info", autoHideDuration: 1_000 });
  };

  return (
    <Box display="flex" alignItems="center" gap={1}>
      <Tooltip title={value}>
        <a
          href={`${props.base_url}/${value}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Typography variant="body2" sx={{ fontFamily: "monospace" }}>
            {truncate(value, 20)}
          </Typography>
        </a>
      </Tooltip>

      <ContentCopyIcon
        sx={{
          fontSize: 14,
          cursor: "pointer",
          color: "action.active",
          opacity: 0.6,
          "&:hover": { opacity: 1 },
        }}
        onClick={handleCopy}
      />
    </Box>
  );
};
