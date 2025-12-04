import { TextField, useRecordContext } from "react-admin";

interface Props {
  source: string;
  base_url: string;
  label?: string;
  sortBy?: string;
}

export const LinkField = ({ source, base_url, label, sortBy }: Props) => {
  const record = useRecordContext();

  if (!record) return null;

  return (
    <a
      href={`${base_url}/${record[source]}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <TextField source={source} label={label} sortBy={sortBy} />
    </a>
  );
};
