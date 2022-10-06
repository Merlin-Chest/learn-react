import { FC, useEffect, useState } from "react";
import { Circle } from "./util";
import './index.css'

type State = {
  position: {
    width: number,
    height: number
  },
  dataList: number[],
  renderList: JSX.Element[],
  eachRenderNum: number,
  currentIdx: number,
  times: number,
  startTime: number,
}

const TimeSlicing: FC<{
  status?: 'default' | 'optimize',
  total: number,
  children?: (duration?: string) => JSX.Element
}> = ({ status, total, children }) => {


  const [state, setState] = useState<State>({
    position: {
      width: 0,
      height: 0
    },
    dataList: [],
    renderList: [],
    eachRenderNum: 500,
    currentIdx: 0,
    times: total / 500,
    startTime: Date.now()
  })

  const getNextPart = (currentIdx: number) => {
    let { dataList, position } = state;
    const list = dataList.slice(currentIdx * state.eachRenderNum, (currentIdx + 1) * state.eachRenderNum);
    return list.map((item, idx) => {
      return <Circle position={position} key={currentIdx * state.eachRenderNum + idx}></Circle>
    })
  }

  const renderNextPart = (currentIdx: number) => {
    if (currentIdx < state.times) {
      const { renderList } = state;
      renderList?.push(...getNextPart(currentIdx));
      setState((state) => {
        return {
          ...state,
          currentIdx: currentIdx + 1,
          renderList: [...renderList]
        }
      })
    }
  }

  // 监听模式变化，改变模式后重置配置
  useEffect(() => {
    const target = document.getElementById('duration')
    const { offsetHeight, offsetWidth } = target!
    setState((state) => ({
      ...state,
      position: { height: offsetHeight, width: offsetWidth },
      dataList: Array(total).fill(1),
      renderList: [],
      currentIdx: 0,
      startTime: Date.now()
    })
    )
  }, [status])

  // 监听渲染列表变化
  useEffect(() => {
    // 当模式为一次性加载时并且还没加载时，设置，已经渲染过不重复渲染
    if (status === 'default' && state.renderList.length === 0) {
      setState((state) => {
        return {
          ...state,
          renderList: state.dataList.map((item, index) => {
            return <Circle position={state.position} key={index}></Circle>
          })
        }
      })
    } else if (status === 'optimize') {
      // 如果是分批加载，每次多加载一点，调用renderNextPart，内部会调用setState
      // 更新完后会再次监听到renderList的变化，循环调用renderNextPart
      // 直到全部加载完
      const { currentIdx } = state;
      renderNextPart(currentIdx)
    }
  }, [state.renderList])

  const [duration, setDuration] = useState<string>();

  useEffect(() => {
    const target = document.getElementById('duration')
    const observer = new MutationObserver(() => {
      setDuration(`${(Date.now() - state.startTime) / 1000}s`);
      observer.disconnect()
    })
    observer.observe(target!, {
      childList: true
    })
  }, [state.startTime])

  return <>
    <div style={{ position: 'absolute', zIndex: '100' }}>
      {children && children(duration)}
    </div>
    <div id="duration" className="container">
      {
        state.renderList
      }
    </div></>
}

export default () => {
  const [status, setStatus] = useState<'default' | 'optimize'>();

  const handleClick1 = () => {
    if (status !== 'default') {
      setStatus('default')
    }
  }

  const handleClick2 = () => {
    if (status !== 'optimize') {
      setStatus('optimize')
    }
  }

  return <>
    <div style={{ display: 'flex' }}>

    </div>
    <TimeSlicing status={status} total={40000}>
      {(duration) => <>
        <button onClick={handleClick1}>一次性加载</button>
        <button onClick={handleClick2}>分批加载</button>
        <div style={{ color: 'white', fontWeight: 'bold' }}>白屏时间：{duration}</div>
      </>}
    </TimeSlicing>
  </>
};
