import { Pagination } from "../types/Paginations"

export  function createSkip(pagination: Pagination) {
    const skip = (pagination.page - 1) * pagination.limit
    return skip
}