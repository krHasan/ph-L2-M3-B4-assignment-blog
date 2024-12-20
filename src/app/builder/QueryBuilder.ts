import { FilterQuery, Query } from "mongoose";

class QueryBuilder<T> {
    public modelQuery: Query<T[], T>;
    public query: Record<string, unknown>;

    constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
        this.modelQuery = modelQuery;
        this.query = query;
    }

    search(searchableFields: string[]) {
        //example: http://.../students?searchTerm=khandoker
        if (this?.query?.searchTerm) {
            this.modelQuery = this.modelQuery.find({
                $or: searchableFields.map(
                    (field) =>
                        ({
                            [field]: {
                                $regex: this?.query?.searchTerm,
                                $options: "i",
                            },
                        }) as FilterQuery<T>,
                ),
            });
        }

        return this;
    }

    filter() {
        //example: http://.../students?email=john.doe1@example.com
        const queryObj = { ...this.query };
        const excludeFields = ["searchTerm", "sort", "limit", "page", "fields"];
        excludeFields.forEach((el) => delete queryObj[el]); //remains email
        this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>);

        return this;
    }

    sort() {
        //example: http://.../students?sort=-email
        const sort =
            (this?.query?.sort as string)?.split(",")?.join(" ") ||
            "-createdAt";
        this.modelQuery = this.modelQuery.sort(sort as string);

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
