import { TextField, useRecordContext } from "react-admin";

interface Props {
  source: string;
  base_url: string;
  label?: string;
}

export const LinkField = ({ source, base_url, label }: Props) => {
  const record = useRecordContext();

  if (!record) return null;

  return (
    <a
      href={`${base_url}/${record[source]}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <TextField source={source} label={label} />
    </a>
  );
};
