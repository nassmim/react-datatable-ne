import { useRef } from 'react'

/**
 * Custom hook used to store the previous value of a variable
 * @param value which corresponds to the new prop value passed to the function
 * @returns this value
 */
const useCustomPrevious = (value: string): string => {
  const ref: React.MutableRefObject<{
    value: string
    previousValue: string
  }> = useRef({
    value: value,
    previousValue: '',
  })

  const current = ref.current.value

  if (value !== current) {
    ref.current = {
      value: value,
      previousValue: current,
    }
  }

  return ref.current.previousValue
}

export default useCustomPrevious
