import { FC, useEffect, useRef } from "react"

const SetListenerHOC = (Component: FC<any>) => {
  return (props: any) => {
    const dom = useRef<HTMLDivElement | null>();
    useEffect(() => {
      const handleClick = () => {
        console.log('发生点击事件')
      }
      dom.current?.addEventListener('click', handleClick)
      return () => dom.current?.removeEventListener('click', handleClick)
    }, [])
    return <div ref={(node) => dom.current = node}><Component {...props}></Component></div>
  }
}

const Button = ({ content }: { content: string }) => {
  return <button>{content}</button>
}
const SetListener = SetListenerHOC(Button)

export default () => <>
  <SetListener content="被监听的button"></SetListener>
  <Button content="原始button"></Button>
  <div>查看控制台</div>
</>
