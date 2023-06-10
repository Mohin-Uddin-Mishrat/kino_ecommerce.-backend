class apifeatures {
    constructor(query, queryStr){
        this.query =query
        this.queryStr=queryStr
    }
    search(){
        const keyword =this.queryStr.keyword ? {
            name:{
                $regex: this.queryStr.keyword,
                $options:"i"
            }
        }:{};
        this.query= this.query.find({...keyword});
        return this;
    }

    filter(){
        const array = ["keyword","page","limit"];
        const querycopy = {...this.queryStr};
        array.forEach(key => delete querycopy[key]);
        let queryStr = JSON.stringify(querycopy);

        queryStr= queryStr.replace(/\b(gt|gte|lt|lte)\b/g,(key)=> `$${key}`)
        this.query= this.query.find(JSON.parse(queryStr));

        return this;

    }

    pagination(resulPerpage){
        const currentPage = this.queryStr.page || 1;
        const skip = (currentPage-1)*resulPerpage;
        this.query= this.query.limit(resulPerpage).skip(skip);
        return this;
    }
}
module.exports= apifeatures