import React, { useCallback, useMemo } from 'react'
import { Select } from 'antd'
import { useStore } from '../App'
import { changeSort } from '../store/actions'

const SORTINGS = [
    {
        id: 'username',
        label: 'имени пользователя'
    },
    {
        id: 'email',
        label: 'e-mail'
    },
    {
        id: 'status',
        label: 'статусу'
    }
]

const DIRECTIONS = {
    'asc': {
        label: 'по возрастанию',
        id: 'asc'
    },
    'desc': {
        label: 'по убыванию',
        id: 'desc'
    }
}

const Sort = () => {
    const [{ sort: storeSort }, dispatch] = useStore()

    const handleSelect = useCallback((value) => {
        dispatch(changeSort(value))
    }, [])

    const currentSort = useMemo(() => {
        if (storeSort) {
            return SORTINGS.find(s => s.id === storeSort.key)
        }
    }, [storeSort])

    const storeSortLabel = useMemo(() => {
        if (!storeSort.value) {
            return null
        }
        return `Отсортировано по ${currentSort.label} (${DIRECTIONS[storeSort.value].label})`
    }, [currentSort, storeSort])
    
    return (
        <div>
            <Select
                options={SORTINGS.map((sort) => {
                    let directionLabel =
                        sort.id === currentSort?.id && storeSort.value === 'desc'
                            ? DIRECTIONS.asc.label
                            : DIRECTIONS.desc.label
                    let label = `Отсортировать по ${sort.label} (${directionLabel})`
                    return {
                        label,
                        value: sort.id
                    }
                })}
                style={{
                    minWidth: 400
                }}
                onSelect={handleSelect}
                placeholder="Сортировка"
                value={storeSortLabel}
            />
        </div>
    )
}

export default Sort