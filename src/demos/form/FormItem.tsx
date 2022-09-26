import React from "react";

const FormItem = ({ children, name, handleChange, value, label }: any) => {

  const onChange = (value: any) => {
    handleChange(name, value)
  }
  return <div className="form">
    <span>{label}：</span>
    {
      React.isValidElement(children) && (children as any).type.name === 'Input'
        ? React.cloneElement<any>(children, { onChange, value })
        : null
    }
  </div>
}

FormItem.displayName = 'formItem'

export default FormItem;
