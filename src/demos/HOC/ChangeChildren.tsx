import React from "react";
import { FC } from "react";

const Primary = () => {
  return <>
    <ul style={{ display: 'flex', flexFlow: 'column' }}>
      <li>React</li>
      <li>Vue</li>
      <li>Angular</li>
    </ul>
  </>
}

const HOC = (Component: FC) => {
  const newComp = () => {
    const el = Component({})!;
    const newChild = React.Children.map(el?.props.children.props.children, (child, index) => {
      if (index === 2) return <li>Not Angular</li>
      return child
    })
    return React.cloneElement(el.props.children, el.props, newChild);
  }
  return newComp;
}

const ChangeChildren = HOC(Primary);

export default ChangeChildren;
