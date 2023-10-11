import { Competition } from "../../models/Competition"
import { useAddCompetitionMutation, useUpdateCompetitionMutation } from "./competitionHooks";
import { useGetGamesQuery } from "../games/gameHooks";
import { FC, useState } from "react";
import { CustomParamsSerializer } from "axios";
import { useTextInput } from "../../components/forms/TextInput";

type CompetitionEditorModalProps =
  | {
    editing: false;
    eventId: number;
  }
  | {
    editing: true;
    competition: Competition;
  };


export const CompetitionEditorModal: FC<CompetitionEditorModalProps> = (props: CompetitionEditorModalProps) => {
  const addCompetitionMutation = useAddCompetitionMutation();
  const updateCompetitionMutation = useUpdateCompetitionMutation();

  const getGamesQuery = useGetGamesQuery();
  const games = getGamesQuery.data ?? [];

  const [eventId, seteventId] = useState(props.editing ? props.competition.eventId : props.eventId);
  const locationControl = useTextInput(props.editing ? props.competition.location : "");

  return (
    <div>CompetitionEditorModal</div>
  )
}
