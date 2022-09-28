import React, { ComponentClass } from "react";

const GetInstanceHOC = (Component: ComponentClass) => {
  return class Content extends React.Component {
    constructor(props: any) {
      super(props);
      (this as any).node = null;
    }
    componentDidMount(): void {
      console.log('获取到组件实例', (this as any).node)
    }
    render(): React.ReactNode {
      return <Component {...this.props} ref={(node) => (this as any).node = node}></Component>
    }
  }
}

class Index extends React.Component {
  state: Readonly<{ color: string }> = {
    color: 'red'
  };
  constructor(props: any) {
    super(props);
  }
  render(): React.ReactNode {
    return <div style={{ color: this.state.color }}>GetInstance</div>
  }
}

const GetInstance = GetInstanceHOC(Index)

export default GetInstance;
