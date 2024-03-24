import { MODULE } from "../../types"
import { ExampleModule } from "./components"

export const moduleOptions = [
  { value: MODULE.NONE, label: "Нет" },
  { value: MODULE.EXAMPLE, label: "Пример" },
]

export const COMPONENT_BY_MODULE = {
  [MODULE.NONE]: null,
  [MODULE.EXAMPLE]: ExampleModule,
}

export const DEFAULT_VALUE_BY_MODULE = {
  [MODULE.NONE]: null,
  [MODULE.EXAMPLE]: {
    first_field: 0,
    second_field: 0,
  },
}
