import React from "react";
import { FC } from "react";

const Item = ({ type }: { type: string }) => {
  return <li>{type}</li>
}

const list = ['a', 'b', 'c', 'd'];

const List = ({ list }: { list: string[] }) => {
  return <ul>
    {
      list.map(item => <Item type={item} key={item}></Item>)
    }
  </ul>
}

const AuthorityHOC = (passList: string[]) => {
  return (Component: FC) => {
    return (props: any) => {
      const el = Component(props);
      const newChildren = React.Children.map(el?.props.children, (child, index) => {
        const { type } = child.props;
        if (passList.includes(type)) {
          return child
        }
        return <div key={type}>没有权限查看{type}</div>
      })
      return newChildren
    }
  }
}

const AuthorityList = AuthorityHOC(['a', 'c'])(List.bind(null, { list }))
export default AuthorityList;
