import {
  Edit,
  NumberInput,
  ReferenceInput,
  required,
  SelectInput,
  SimpleForm,
  TextInput,
} from "react-admin";

export const ChallengeEdit = () => {
  return (
    <Edit>
      <SimpleForm>
        <TextInput source="question" validate={[required()]} label="Question" />
        <SelectInput
          source="type"
          choices={[
            {
              id: "SELECT",
              name: "SELECT",
            },
            {
              id: "ASSIST",
              name: "ASSIST",
            },
            {
              id: "MATCH",
              name: "MATCH",
            },
            {
              id: "AUDIO_TRANSCRIPTION",
              name: "AUDIO_TRANSCRIPTION",
            },
            {
              id: "DIALOGUE",
              name: "DIALOGUE",
            },
            {
              id: "TRANSLATION",
              name: "TRANSLATION",
            },
          ]}
          validate={[required()]}
        />
        <ReferenceInput source="lessonId" reference="lessons" />
        <NumberInput source="order" validate={[required()]} label="Order" />
      </SimpleForm>
    </Edit>
  );
};