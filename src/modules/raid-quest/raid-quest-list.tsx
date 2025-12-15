/* eslint-disable @typescript-eslint/no-explicit-any */
import { API_URL } from "@/constants/env-variables";
import { getAccessTokenOptions } from "@/lib/auth";
import { httpClient } from "@/lib/http-client";
import extractErrMsg from "@/utils/extract-error-msg";
import { History, SportsScore } from "@mui/icons-material";
import { useState } from "react";
import {
  List,
  TextField,
  Datagrid,
  SearchInput,
  DateField,
  NumberInput,
  BooleanInput,
  TopToolbar,
  FilterButton,
  CreateButton,
  WrapperField,
  DeleteButton,
  FunctionField,
  Button,
  useNotify,
  useRefresh,
} from "react-admin";

export const RaidQuestList = () => {
  const notify = useNotify();
  const refresh = useRefresh();

  const [loading, setLoading] = useState(false);

  const actions = (
    <TopToolbar>
      <FilterButton />
      <CreateButton />
    </TopToolbar>
  );

  const filters = [
    <SearchInput key={0} source="q" alwaysOn placeholder="Keyword" />,
    <BooleanInput key={1} source="is_active" label="Is Active" />,
    <NumberInput key={2} source="min_followers" label="Min followers" />,
  ];

  const handleFinishRaid = async (id: number) => {
    try {
      setLoading(true);

      await httpClient.put(
        `${API_URL}/raid-quests/${id}/finish`,
        null,
        getAccessTokenOptions(),
      );

      refresh();
    } catch (error) {
      const errMsg = extractErrMsg(error);

      notify(errMsg, { type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleRevertActiveRaid = async (id: number) => {
    try {
      setLoading(true);

      await httpClient.put(
        `${API_URL}/raid-quests/${id}/active`,
        null,
        getAccessTokenOptions(),
      );

      refresh();
    } catch (error) {
      const errMsg = extractErrMsg(error);

      notify(errMsg, { type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <List filters={filters} actions={actions}>
      <Datagrid rowClick={false} bulkActionButtons={false}>
        <TextField source="name" label="Name" />

        <DateField source="start_date" label="Start Date" />

        <DateField source="end_date" label="End Date" />

        <DateField source="created_at" label="Created At" />

        <WrapperField label="Actions">
          <FunctionField
            render={(record: any) =>
              record.end_date ? (
                <Button
                  startIcon={<History color="info" />}
                  label="Revert Active"
                  variant="text"
                  color="primary"
                  loading={loading}
                  onClick={() => {
                    handleRevertActiveRaid(record.id);
                  }}
                />
              ) : (
                <Button
                  startIcon={<SportsScore color="info" />}
                  label="Finish"
                  variant="text"
                  color="info"
                  loading={loading}
                  onClick={() => {
                    handleFinishRaid(record.id);
                  }}
                />
              )
            }
          />

          <DeleteButton />
        </WrapperField>
      </Datagrid>
    </List>
  );
};
