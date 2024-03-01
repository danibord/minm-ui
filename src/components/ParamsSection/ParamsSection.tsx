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
  const [modelingTime, setModelingTime] = useState(0)
  const [timeStep, setTimeStep] = useState(0)
  const [method, setMethod] = useState(METHOD.EXPLICIT_EULER)

  useImperativeHandle(paramsRef, () => ({
    getData: () => ({
      initial_time: initialTime,
      modeling_time: modelingTime,
      time_step: timeStep,
      ODE_method_name: method,
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
        value={modelingTime}
        onChange={(newValue) => {
          setModelingTime(newValue || 0)
        }}
        addonBefore="Время, с:"
      />
      <InputNumber
        value={timeStep}
        onChange={(newValue) => {
          setTimeStep(newValue || 0)
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
