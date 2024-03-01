import { InputNumber, Select } from "antd"
import { METHOD, ParamsData } from "../../types"
import { useImperativeHandle, useState } from "react"
import { methodOptions } from "./utils"

export interface ParamsSectionRef {
  getData: () => ParamsData
}

interface ParamsSectionProps {
  paramsRef: React.Ref<ParamsSectionRef>
}

export function ParamsSection({ paramsRef }: ParamsSectionProps) {
  const [initialTime, setInitialTime] = useState(0)
  const [time, setTime] = useState(0)
  const [step, setStep] = useState(0)
  const [method, setMethod] = useState(METHOD.EXPLICIT_EULER)

  useImperativeHandle(paramsRef, () => ({
    getData: () => ({
      initial_time: initialTime,
      time,
      step,
      method,
    }),
  }))

  return (
    <>
      <InputNumber
        value={initialTime}
        onChange={(newValue) => {
          setInitialTime(newValue || 0)
        }}
        addonBefore="Начальное время, с:"
      />
      <InputNumber
        value={time}
        onChange={(newValue) => {
          setTime(newValue || 0)
        }}
        addonBefore="Время, с:"
      />
      <InputNumber
        value={step}
        onChange={(newValue) => {
          setStep(newValue || 0)
        }}
        addonBefore="Шаг, с:"
      />
      <Select
        value={method}
        onChange={(value) => {
          setMethod(value)
        }}
        options={methodOptions}
        showSearch
      />
    </>
  )
}
