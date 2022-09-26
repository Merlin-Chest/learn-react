import { useRef } from "react";
import Form from "./Form";
import FormItem from "./FormItem";
import Input from "./Input";

const FormPage = () => {
  const form = useRef<Form | null>(null)

  const submit = () => {
    /* 表单提交 */
    form.current!.submitForm((formValue: any) => {
      console.log(formValue)
    })
  }
  const reset = () => {
    /* 表单重置 */
    form.current!.resetForm()
  }
  return <>
    <Form ref={form}>
      <FormItem name="username" label="用户">
        <Input></Input>
      </FormItem>
      <FormItem name="password" label="密码">
        <Input></Input>
      </FormItem>
      <button onClick={() => submit()}>登录</button>
      <button onClick={() => reset()}>重置</button>
    </Form >
    <span>{ }</span>
  </>
}

export default FormPage;
