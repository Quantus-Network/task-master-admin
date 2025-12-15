import { Create, SimpleForm, TextInput } from "react-admin";

export const RaidQuestCreate = () => {
  return (
    <Create redirect="list">
      <SimpleForm>
        <TextInput source="name" isRequired />
      </SimpleForm>
    </Create>
  );
};
