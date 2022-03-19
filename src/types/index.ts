import { SelectOption, SelectGroupOption } from 'naive-ui'

export type SelectOptionProps = {
  value: string
  options: Array<SelectOption | SelectGroupOption>
}
