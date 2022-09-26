import React, { Children, cloneElement, ReactElement, FC } from "react";

class Form extends React.Component<{ children: any }> {
  static displayName = 'form'
  state: Readonly<{ formData: Record<string, any> }> = {
    formData: {}
  };
  submitForm(cb: Function) {
    cb({ ...this.state.formData })
  }
  resetForm() {
    const { formData } = this.state;
    Object.keys(formData).forEach(key => {
      formData[key] = ''
    })
    this.setState({
      formData
    })
  }
  setValue = (name: string, value: string) => {
    this.setState({
      formData: {
        ...this.state.formData,
        [name]: value
      }
    })
  }
  render() {
    const { children } = this.props;
    return <div>
      {Children.toArray(children).map((children) => {
        if ((children as ReactElement<any, any>).type.displayName === 'formItem') {
          const { name } = (children as ReactElement<any, any>).props;
          return cloneElement((children as ReactElement<any, any>), {
            key: name,
            handleChange: this.setValue,
            value: this.state.formData[name] || ''
          })
        } else {
          return children;
        }
      })}
    </div>
  }
}

export default Form;
