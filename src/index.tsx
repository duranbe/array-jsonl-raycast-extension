import { Form, ActionPanel, Action, showToast } from "@raycast/api";
import { useState } from "react";

type Values = {
  textfield: string;
  textarea: string;
  datepicker: Date;
  checkbox: boolean;
  dropdown: string;
  tokeneditor: string[];
};

export default function Command() {
  const [result, setResult] = useState<string>('');
  
  function handleSubmit(values: Values) {
    let val: string = values['input-textarea'];
    val = `{"data":${val}}`
    let jsonVal = JSON.parse(val);  
    setResult(jsonVal.data.map(JSON.stringify).join('\n'));
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
      <Form.TextArea id="textarea" title="Text area" placeholder="Enter multi-line text" value={result} onChange={setResult} />

    </Form>
  );
}
