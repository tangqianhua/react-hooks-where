import React, { useState, useCallback, useEffect } from 'react'

function useCustomHook() {
  console.log('useCustomHook')
    const [size, setSize] = useState({
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight
    })
    useEffect(() => {
      window.addEventListener('resize', onResize, false)
      return () => {
        window.removeEventListener('resize', onResize, false)
      }
    }, [])
    const onResize = useCallback(() => {
      setSize({
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight
      })
    })
    return size
}

export default useCustomHook

