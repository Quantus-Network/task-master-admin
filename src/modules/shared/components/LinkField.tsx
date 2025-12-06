import { getRecordValue } from "@/utils/record-access";
import { TextField, useRecordContext } from "react-admin";

interface Props {
  source: string;
  base_url: string;
  label?: string;
  sortBy?: string;
  sortable?: boolean;
}

export const LinkField = ({
  source,
  base_url,
  label,
  sortBy,
  sortable,
}: Props) => {
  const record = useRecordContext();
  const value = record ? getRecordValue(record, source) : null;

  if (!value) return <span>-</span>;

  return (
    <a href={`${base_url}/${value}`} target="_blank" rel="noopener noreferrer">
      <TextField
        source={source}
        label={label}
        sortBy={sortBy}
        sortable={sortable}
      />
    </a>
  );
};
