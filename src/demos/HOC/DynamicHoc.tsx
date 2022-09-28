import { LoadingOutlined } from "@ant-design/icons"
import { FC, useEffect, useState } from "react"

const DynamicHoc = (loadComponent: () => Promise<{ default: () => FC }>) => {
  return (props: any) => {
    const [Comp, setComp] = useState<FC | null>(null)
    useEffect(() => {
      if (!Comp) {
        loadComponent().then(module => module.default).then(Comp => setComp(Comp))
      }
    }, [])
    return Comp ? <Comp {...props}></Comp> : <LoadingOutlined></LoadingOutlined>
  }
}

const DynamicComp = DynamicHoc(
  // 模拟import('xxx')
  () => new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        { default: () => (() => <div>三秒后出现动态组件</div>) }
      )
    }, 3000)
  })
)

export default DynamicComp
