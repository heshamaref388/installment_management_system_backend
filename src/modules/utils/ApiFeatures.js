import QueryString from "qs";

export class ApiFeatures {
  constructor(mongooseQuery, queryString) {
    this.mongooseQuery = mongooseQuery;
    this.queryString = queryString;
  }
  //1- pagination
  pagination() {
    let page = this.queryString.page * 1 || 1;
    if (this.queryString.page < 0) page = 1;
    let skip = (page - 1) * 5;
    this.page=page
    this.mongooseQuery.skip(skip).limit(5);
    return this;
  }
  //2- filtering
  filter() {
    let filter = { ...this.queryString };
    let excludeFields = ["page", "sort", "fields", "search"];
    excludeFields.forEach((ele) => delete filter[ele]);
    filter = QueryString.parse(filter);
    filter = JSON.stringify(filter);
    filter = filter.replace(/\b(lte|gte|gt|lt)\b/g, (match) => `$${match}`);
    filter = JSON.parse(filter);
    this.mongooseQuery.find(filter);
    return this;
  }
  // 3- sort
  sort() {
    if (this.queryString.sort) {
      let sortedBy = this.queryString.sort.split(",").join(" ");
      this.mongooseQuery.sort(sortedBy);
    }
    return this;
  }
  //4- search 
  search(){
if (this.queryString.search){
  // console.log(sortedBy);
 this.mongooseQuery.find({
    $or:[
      {title:{$regex: this.queryString.search, $options: "i"}},
      {description:{$regex: this.queryString.search, $options: "i"}},
    ]
  })
}
    return this;
  }
  // 5- select field
  fields(){
if (this.queryString.fields){
  let fields = this.queryString.fields.split(",").join(" ");
  // console.log(fields);
  this.mongooseQuery.select(fields)
}
    return this;
  }
}
