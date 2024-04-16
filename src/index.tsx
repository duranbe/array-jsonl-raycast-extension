import { Form, ActionPanel, Action, showToast } from "@raycast/api";

type Values = {
  textfield: string;
  textarea: string;
  datepicker: Date;
  checkbox: boolean;
  dropdown: string;
  tokeneditor: string[];
};

export default function Command() {
  function handleSubmit(values: Values) {
    console.log(values);
    showToast({ title: "Submitted form", message: "See logs for submitted values" });
  }

  return (
    <Form
      actions={
        <ActionPanel>
          <Action.SubmitForm onSubmit={handleSubmit} />
        </ActionPanel>
      }
    >

      <Form.TextArea id="input-textarea" title="Text area" placeholder="Enter multi-line text" />
      <Form.Separator />
      <Form.TextArea id="textarea" title="Text area" placeholder="Enter multi-line text" />

    </Form>
  );
}
