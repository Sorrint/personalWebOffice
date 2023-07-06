export interface IInventoryProduct {
    name: string
    price: number | null
    quantity: number
    id: string | undefined
}

export interface IInventoryDocs {
    _id?: string
    documentNumber: number
    storeName: string
    choosenDate: Date
    comment: string
    products: IInventoryProduct[]
}

export interface IdataForXLSX {
    '№ п/п'?: number
    Наименование: string
    Количество?: number
    Цена?: number
    Сумма: number
}

export interface IInventoryContent {
    onClick?: (product: IInventoryProduct) => void
    onDelete?: (product: IInventoryProduct) => void
    index?: number
}

export interface IInventoryProductListBodyProps {
    products: IInventoryProduct[]
    itemNumber: number
    onClick?: (product: IInventoryProduct) => void
    onDelete?: (product: IInventoryProduct) => void
    tabIndex?: number
}

export interface IInventoryProductCardProps {
    product: IInventoryProduct
    itemNumber: number
    onClick?: (product: IInventoryProduct) => void
    onDelete?: (product: IInventoryProduct) => void
    tabIndex?: number
}
