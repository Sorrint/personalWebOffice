export interface IDreamkasProduct {
    id: string
    name: string
    department: {
        id: number
        name: string
        tax: string
    }
    departmentId: number
    family: null | string
    image: null | string
    imageId: null | number
    isMarked: null | boolean
    maxPrice: null | number
    minPrice: null | number
    postfix: null
    price: null | number
    prices: null | number[]
    stock: null | IProductStock[]
    syncStatuses: null
    tax: string
    type: string
    unit: string
}

export interface IProductCategory {
    id: number
    name: string
    productCount: number
}

export interface IProductQueryTrace {
    event: string
    duration?: string
    t: string
}

export type IProductStock = [number, string, string, string, string];
