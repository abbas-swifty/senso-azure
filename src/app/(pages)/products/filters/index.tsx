import React, { useState } from 'react'
import { Category } from '../../../../payload/payload-types'
import { Checkbox } from '../../../_components/Checkbox'
import { HR } from '../../../_components/HR'
import { RadioButton } from '../../../_components/Radio'
import { useFilter } from '../../../_providers/Filter'
import classes from './index.module.scss'
import { usePathname } from 'next/navigation'

const Filters = ({ categories }: { categories: Category[] }) => {
  const { categoryFilters, sort, setCategoryFilters, setSort } = useFilter()
  const [showAllCategories, setShowAllCategories] = useState(false)
  const categoriesToShow = showAllCategories ? categories : categories.slice(0, 5)
  const pathName = usePathname()

  const handleCategories = (categoryId: string) => {
    if (categoryFilters.includes(categoryId)) {
      const updatedCategories = categoryFilters.filter(id => id !== categoryId)
      setCategoryFilters(updatedCategories)
    } else {
      setCategoryFilters([...categoryFilters, categoryId])
    }
  }

  const handleSort = (value: string) => setSort(value)

  const toggleShowCategories = () => {
    setShowAllCategories(prev => !prev)
  }

  return (
    <div className={'flex flex-col bg-[#BFBFBF] shadow-xl rounded-2xl py-3 lg:min-w-72 h-fit'}>
      <div>
        <h6 className={'px-3 py-1 text-brand-black text-h6 leading-headingLH2 tracking-tight'}>
          Categories
        </h6>
        <div className={'flex flex-col'}>
          {categoriesToShow.map(category => {
            const isSelected = categoryFilters.includes(category.id)
            return (
              <Checkbox
                key={category.id}
                label={category.title}
                value={category.id}
                isSelected={isSelected}
                onClickHandler={handleCategories}
              />
            )
          })}
        </div>
        <div className="p-3">
          {categories.length > 5 && (
            <button
              className={
                'text-brand-black cursor-pointer outline-none border border-brand-black bg-white py-2 px-6 text-b16 rounded-2xl'
              }
              onClick={toggleShowCategories}
            >
              {showAllCategories ? 'Show Less' : 'Show More'}
            </button>
          )}
        </div>
          <div>
            <HR className={classes.hr} />
            <h6
              className={'px-3 py-1 text-brand-black text-h6 leading-headingLH2 tracking-tight'}
            >
              Sort By
            </h6>
            <div className={'flex flex-col'}>
              <RadioButton
                label="Latest"
                value="-createdAt"
                isSelected={sort === '-createdAt'}
                onRadioChange={handleSort}
                groupName="sort"
              />
              <RadioButton
                label="Oldest"
                value="createdAt"
                isSelected={sort === 'createdAt'}
                onRadioChange={handleSort}
                groupName="sort"
              />
            </div>
          </div>
      </div>
    </div>
  )
}

export default Filters
