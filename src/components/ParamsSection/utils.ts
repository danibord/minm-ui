import { METHOD } from "../../types"

export const methodOptions: { value: METHOD; label: string }[] = [
  { value: METHOD.EXPLICIT_EULER, label: "Явный метод Эйлера" },
  { value: METHOD.IMPLICIT_EULER, label: "Неявный метод Эйлера" },
  { value: METHOD.SEMI_IMPLICIT_EULER, label: "Полунеявный метод Эйлера" },
  { value: METHOD.TRAPEZOID, label: "Метод трапеций" },
  { value: METHOD.MIDDLE, label: "Метод средней точки" },
  { value: METHOD.EXPLICIT_RK2, label: "Явный метод Рунге-Кутты 2-го порядка" },
  {
    value: METHOD.IMPLICIT_RK2,
    label: "Неявный метод Рунге-Кутты 2-го порядка",
  },
  {
    value: METHOD.SEMI_IMPLICIT_RK2,
    label: "Полунеявный метод Рунге-Кутты 2-го порядка",
  },
  { value: METHOD.EXPLICIT_RK4, label: "Явный метод Рунге-Кутты 4-го порядка" },
  {
    value: METHOD.IMPLICIT_RK4,
    label: "Неявный метод Рунге-Кутты 4-го порядка",
  },
  {
    value: METHOD.SEMI_IMPLICIT_RK4,
    label: "Полунеявный метод Рунге-Кутты 4-го порядка",
  },
  { value: METHOD.KM, label: "Метод Кутты-Мерсона" },
  { value: METHOD.EXPLICIT_ADAMS, label: "Явный двухшаговый метод Адамса" },
  // { value: "RKF", label: "Метод Рунге-Кутты-Фелберга" },
]
