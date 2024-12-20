import { FilterQuery, Query } from "mongoose";

class QueryBuilder<T> {
    public modelQuery: Query<T[], T>;
    public query: Record<string, unknown>;

    constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
        this.modelQuery = modelQuery;
        this.query = query;
    }

    search(searchableFields: string[]) {
        //example: http://.../students?search=khandoker
        if (this?.query?.search) {
            this.modelQuery = this.modelQuery.find({
                $or: searchableFields.map(
                    (field) =>
                        ({
                            [field]: {
                                $regex: this?.query?.search,
                                $options: "i",
                            },
                        }) as FilterQuery<T>,
                ),
            });
        }

        return this;
    }

    filter() {
        // example: http://.../students?email=john.doe1@example.com
        const queryObj = { ...this.query };
        const excludeFields = [
            "search",
            "sortBy",
            "sortOrder",
            "limit",
            "page",
            "fields",
        ];
        excludeFields.forEach((el) => delete queryObj[el]); //remains email
        this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>);

        return this;
    }

    sort() {
        //example: http://.../students?sortBy=createdAt,title&sortOrder=desc
        const sortBy = (this?.query?.sortBy as string)?.split(",") || [
            "createdAt",
        ];
        const sortOrder = (this?.query?.sortOrder as string)?.split(",") || [
            "asc",
        ];

        const sortObject = sortBy.reduce(
            (acc: Record<string, 1 | -1>, field, index) => {
                acc[field] =
                    sortOrder[index]?.toLowerCase() === "desc" ? -1 : 1;
                return acc;
            },
            {},
        );

        this.modelQuery = this.modelQuery.sort(sortObject);

        return this;
    }

    paginate() {
        //example: http://.../students?limit=10&page=1
        const page = Number(this?.query?.page) || 1;
        const limit = Number(this?.query?.limit) || 10;
        const skip = (page - 1) * limit;

        this.modelQuery = this.modelQuery.skip(skip).limit(limit);

        return this;
    }

    fields() {
        //example: http://.../students?fields=email,gender
        const fields =
            (this?.query?.fields as string)?.split(",")?.join(" ") || "-__v";

        this.modelQuery = this.modelQuery.select(fields);

        return this;
    }
}

export default QueryBuilder;
