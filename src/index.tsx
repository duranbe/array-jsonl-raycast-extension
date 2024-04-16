import { Form, ActionPanel, Action, showToast, Toast } from "@raycast/api";
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
    if(!val.startsWith('[') || !val.endsWith(']')){
      showToast({
        style: Toast.Style.Failure,
        title: 'Please copy a valid JSON/JS Object',
      });
      return;
    }
    try {
      let jsonVal = JSON.parse(`{"data":${val}}`);  
      setResult(jsonVal.data.map(JSON.stringify).join('\n'));
      showToast({ title: "Formatting Done", message: "Formatting to Jsonl done" });
    } catch (e) {
      showToast({
        style: Toast.Style.Failure,
        title: 'Invalid Json Input : '+e,
      });
    }
    
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
