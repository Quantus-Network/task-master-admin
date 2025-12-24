import { Create, SimpleForm, TextInput } from "react-admin";

export const TweetAuthorCreate = () => {
  return (
    <Create redirect="list" title="Create Tweet Author">
      <SimpleForm>
        <TextInput source="username" isRequired label="Username" />
      </SimpleForm>
    </Create>
  );
};
