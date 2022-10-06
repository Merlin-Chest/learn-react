import React from "react";

export const getColor = () => {
  const r = Math.floor(Math.random() * 255)
  const g = Math.floor(Math.random() * 255)
  const b = Math.floor(Math.random() * 255);
  return `rgba(${r},${g},${b},0.8)`;
}

type Position = { width: number; height: number; }

export const getPosition = (position: Position) => {
  const { width, height } = position
  return {
    left: `${Math.ceil(Math.random() * width)}px`,
    top: `${Math.ceil(Math.random() * height)}px`,
  }
}

export function Circle({ position }: { position: Position }): JSX.Element {
  const style = React.useMemo(() => { //用useMemo缓存，计算出来的随机位置和色值。
    return {
      background: getColor(),
      ...getPosition(position)
    }
  }, [])
  return <div style={style} className="circle" />
}
