import React, { ChangeEvent, useState } from 'react'

import classes from './index.module.scss'

interface CheckboxProps {
  label: string
  value: string
  isSelected: boolean
  onClickHandler: (value: string) => void
}

export const Checkbox: React.FC<CheckboxProps> = ({ label, value, isSelected, onClickHandler }) => {
  const [isChecked, setIsChecked] = useState(isSelected)

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked)
    onClickHandler(value)
  }

  return (
    <label
      className={
        'flex flex-row items-center gap-3 whitespace-nowrap cursor-pointer px-3 py-[6px] font-semibold text-brand-black leading-headingLH1'
      }
    >
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleCheckboxChange}
        className={classes.checkbox}
      />
      {label}
    </label>
  )
}
