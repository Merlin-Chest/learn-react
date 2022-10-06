import { FC, useEffect, useRef, useState } from "react"
import './index.css'
type State = {
  renderList: number[],
  dataList: number[],
  startIdx: number,
  endIdx: number,
  renderCount: number,
  itemHeight: number,
  bufferCount: number,
  offsetHeight: number,
  contextHeight: number,
  totalHeight: number
}
const VirtualList: FC<{
  total: number,
  childHeight: number,
  gap: number,
  style: React.CSSProperties
}> = ({ total, childHeight, gap, style }) => {
  const [state, setState] = useState<State>({
    renderList: [],
    dataList: [],
    startIdx: 0,
    endIdx: 0,
    offsetHeight: 0,
    contextHeight: 0,
    bufferCount: 0,  /* 缓冲区个数 */
    itemHeight: childHeight + gap,  /* 每一个item高度 */
    renderCount: 0,  /* 渲染区个数 */
    totalHeight: 0
  })

  useEffect(() => {
    setState((state) => ({
      ...state,
      itemHeight: childHeight + gap
    }))
  }, [childHeight, gap])


  const box = useRef<HTMLDivElement | null>(null);
  const context = useRef<HTMLDivElement | null>(null);
  const scroll = useRef<HTMLDivElement | null>(null)

  const [status, setStatus] = useState(true);

  useEffect(() => {
    const boxHeight = box.current!.offsetHeight;
    let { itemHeight } = state
    const accommodation = Math.ceil(boxHeight / itemHeight);
    const renderCount = accommodation * 2;
    const dataList = Array(total).fill(1).map((item, index) => index + 1)
    if (total < renderCount) {
      setStatus(false);
      setState((state) => ({
        ...state,
        renderList: dataList
      }))
    } else {
      setStatus(true);
    }
  }, [total, childHeight, gap])

  useEffect(() => {
    if (status) {
      const boxHeight = box.current!.offsetHeight;
      let { itemHeight, startIdx } = state
      const accommodation = Math.ceil(boxHeight / itemHeight);
      const renderCount = accommodation * 2;
      const dataList = Array(total).fill(1).map((item, index) => index + 1)
      const { scrollTop } = scroll.current!
      const bufferCount = Math.ceil(boxHeight / itemHeight);
      const endIdx = startIdx + renderCount;
      const offsetHeight = boxHeight - dataList.length * itemHeight + gap + scrollTop - scrollTop % itemHeight;
      const renderList = dataList.slice(startIdx, renderCount);
      const totalHeight = dataList.length * itemHeight - boxHeight - gap;
      setState((state) => ({
        ...state,
        dataList,
        offsetHeight,
        startIdx,
        endIdx,
        renderCount,
        renderList,
        totalHeight,
        bufferCount
      }))
    }
  }, [total, childHeight, gap, status])

  const handleScroll = () => {
    if (!scroll.current) return;
    const boxHeight = box.current!.offsetHeight;
    const { scrollTop } = scroll.current
    let { itemHeight, renderCount, endIdx: oldEndIdx, dataList, startIdx: oldStartIdx } = state
    const offsetHeight = boxHeight - dataList.length * itemHeight + gap + scrollTop - scrollTop % itemHeight;
    const startIdx = Math.floor(scrollTop / itemHeight);
    const endIdx = startIdx + renderCount;
    const renderList = dataList.slice(startIdx, endIdx);
    const totalHeight = dataList.length * itemHeight - boxHeight - gap;
    if (oldEndIdx !== endIdx || oldStartIdx !== startIdx) {
      setState((state) => ({
        ...state,
        totalHeight,
        offsetHeight,
        startIdx,
        endIdx,
        renderList
      }))
    }
  }
  const { offsetHeight, startIdx, renderList, totalHeight } = state
  return <div className="box" ref={box} style={style}>
    {status ? <div className="scroll" onScroll={() => handleScroll()} ref={scroll}>
      <div className="scroll_hold" style={{ height: `${totalHeight}px` }} />
      <div ref={context} className="context" style={{ transform: `translateY(${offsetHeight}px)` }}>
        {
          renderList.map((item, index) => {
            return <div className="list-item" style={{ height: childHeight + 'px', marginBottom: gap + 'px' }} key={index}>{'item' + (startIdx + index)}</div>
          })
        }
      </div>
    </div>
      : <>
        {
          renderList.map((item, index) => {
            return <div className="list-item" style={{ height: childHeight + 'px', marginBottom: gap + 'px' }} key={index}>{'item' + (startIdx + index)}</div>
          })
        }</>
    }
  </div >
}

export default () => {
  const [total, setTotal] = useState(100);
  const [gap, setGap] = useState(10);
  const [childHeight, setChildHeight] = useState(50);
  return <>
    <div style={{ display: 'flex', alignContent: 'center' }}>
      <p>总数:</p><input type="number" value={total} onInput={(e) => {
        const value = Number(e.currentTarget.value)
        if (value < 0) return;
        setTotal(value)
      }}></input>
      <p>间隔:</p><input type="number" value={gap} onInput={(e) => {
        const value = Number(e.currentTarget.value)
        if (value < 0) return;
        setGap(value)
      }}></input>
      <p>子项高度:</p><input type="number" value={childHeight} onInput={(e) => {
        const value = Number(e.currentTarget.value)
        if (value < 0) return;
        setChildHeight(value)
      }}></input>
    </div>
    <VirtualList style={{ height: '80%' }} total={total} childHeight={childHeight} gap={gap}></VirtualList>
  </>
};
