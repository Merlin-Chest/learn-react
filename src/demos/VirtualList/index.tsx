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
  gap: number
}> = ({ total, childHeight, gap }) => {
  const [state, setState] = useState<State>({
    renderList: [],
    dataList: [],
    startIdx: 0,
    endIdx: 0,
    offsetHeight: 0,
    contextHeight: 0,
    bufferCount: 8,  /* 缓冲区个数 */
    itemHeight: childHeight + gap,  /* 每一个item高度 */
    renderCount: 0,  /* 渲染区个数 */
    totalHeight: 0
  })


  const box = useRef<HTMLDivElement | null>(null);
  const context = useRef<HTMLDivElement | null>(null);
  const scroll = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const boxHeight = box.current!.offsetHeight;
    let { itemHeight, startIdx, bufferCount } = state
    const { scrollTop } = scroll.current!
    const renderCount = Math.ceil(boxHeight / itemHeight) + bufferCount;
    const endIdx = startIdx + renderCount;
    const dataList = Array(total).fill(1).map((item, index) => index + 1)
    const offsetHeight = boxHeight - dataList.length * itemHeight + scrollTop - scrollTop % itemHeight;
    const renderList = dataList.slice(startIdx, renderCount);
    const totalHeight = dataList.length * itemHeight - boxHeight + gap;
    setState((state) => ({
      ...state,
      dataList,
      offsetHeight,
      startIdx,
      endIdx,
      renderCount,
      renderList,
      totalHeight
    }))
  }, [])

  const handleScroll = () => {
    if (!scroll.current) return;
    const boxHeight = box.current!.offsetHeight;
    const { scrollTop } = scroll.current
    let { itemHeight, renderCount, endIdx: oldEndIdx, dataList, startIdx: oldStartIdx } = state
    const offsetHeight = boxHeight - dataList.length * itemHeight + scrollTop - scrollTop % itemHeight;
    const startIdx = Math.floor(scrollTop / itemHeight);
    const endIdx = startIdx + renderCount;
    const renderList = dataList.slice(startIdx, endIdx);
    const totalHeight = dataList.length * itemHeight - boxHeight + gap;
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
  return <div className="box" ref={box}>
    <div className="scroll" onScroll={() => handleScroll()} ref={scroll}>
      <div className="scroll_hold" style={{ height: `${totalHeight}px` }} />
      <div ref={context} className="context" style={{ transform: `translateY(${offsetHeight}px)` }}>
        {
          renderList.map((item, index) => {
            return <div className="list-item" style={{ height: childHeight + 'px', marginBottom: gap + 'px' }} key={index}>{'item' + (startIdx + index)}</div>
          })
        }
      </div>
    </div>
  </div>
}

export default () => {
  return <VirtualList total={100} childHeight={50} gap={10}></VirtualList>
};
