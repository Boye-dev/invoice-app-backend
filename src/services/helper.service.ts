import { Model, PopulateOptions } from "mongoose";
export interface IQuery {
  pageNumber?: number;
  pageSize?: number;
  sort?: string;
}
type IFindBy<T> = Partial<Record<keyof T, any>>;

export const paginatedFind = async <T>(
  Model: Model<T>,
  findBy?: IFindBy<T>,
  populate?: PopulateOptions | (PopulateOptions | string)[],
  query?: IQuery
) => {
  let page = 0;
  let pageSize = 10;
  let sort: string | undefined;
  if (query) {
    const {
      pageNumber = 0,
      pageSize: queryPageSize = 10,
      sort: querySort,
    } = query;
    page = pageNumber;
    pageSize = queryPageSize;
    sort = querySort;
  }
  const sortOrder = sort && sort.startsWith("-") ? -1 : 1;
  const total = await Model.countDocuments(findBy);
  const results = await Model.find({
    ...(findBy && {
      ...findBy,
    }),
  })
    .sort({
      ...(sort && {
        [sort]: sortOrder,
      }),
    })
    .skip(pageSize * page)
    .limit(page)
    .populate(populate || []);
  return { results, total, page, pageSize };
};
