import { PaginationMeta } from '../types/meta'

export abstract class CollectionPresenter<T> {
	public readonly data: Array<T>
	public readonly meta: PaginationMeta

	constructor(data: T[], meta: PaginationMeta) {
		this.data = data
		this.meta = meta
	}
}
