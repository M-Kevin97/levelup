import { IInstructor } from './../instructor/instructor';
import { Category } from './../category/category';


export interface ICourse {
    id:string;
    title:string;
    description:string;
    price:number;
    category:Category;
    instructor:IInstructor;
    imageLink:string;
    srcLink:string;
}   

export class Course {
    public get nbClick(): number {
        return this._nbClick;
    }
    public set nbClick(value: number) {
        this._nbClick = value;
    }
    public get srcLink(): string {
        return this._srcLink;
    }
    public set srcLink(value: string) {
        this._srcLink = value;
    }
    public get instructor(): IInstructor {
        return this._instructor;
    }
    public set instructor(value: IInstructor) {
        this._instructor = value;
    }
    public get id(): string {
        return this._id;
    }
    public set id(value: string) {
        this._id = value;
    }
    public get title(): string {
        return this._title;
    }
    public set title(value: string) {
        this._title = value;
    }
    public get category(): Category {
        return this._category;
    }
    public set category(value: Category) {
        this._category = value;
    }
    public get description(): string {
        return this._description;
    }
    public set description(value: string) {
        this._description = value;
    }
    public get price(): number {
        return this._price;
    }
    public set price(value: number) {
        this._price = value;
    }
    public get creationDate(): string {
        return this._creationDate;
    }
    public set creationDate(value: string) {
        this._creationDate = value;
    }
    public get searchContent(): string {
        return this._searchContent;
    }
    public set searchContent(value: string) {
        this._searchContent = value;
    }
    public get imageLink(): string {
        return this._imageLink;
    }
    public set imageLink(value: string) {
        this._imageLink = value;
    }

    constructor(private _id: string, 
                private _title: string, 
                private _category: Category,
                private _description: string,
                private _price: number,
                private _instructor: IInstructor,
                private _srcLink: string,
                private _creationDate: string, 
                private _searchContent: string,
                private _nbClick?: number,
                private _imageLink?: string){
    }

    getICourse(){
        const iCourse:ICourse = {
            id: this.id,
            title: this.title,
            price: this.price,
            description: this.description,
            category: this.category,
            instructor: this.instructor,
            imageLink: this.imageLink,
            srcLink: this.srcLink,
        }

        return iCourse;
    }

    getInstructorFullName() {
        if(this.instructor)
        {
          return this.instructor.firstname+" "+this.instructor.lastname;
        }
      }


    public static getICoursesFromJson(json: Object): ICourse[] {

        console.log('-----------',json);

        if(json === null || json === undefined) return null;

        console.log('°°°°°°°°°°°°',json);

        var crs:ICourse[] = [];
        var courses = Object.keys(json).map(
            function(coursesIdIndex){
            let courseJson = json[coursesIdIndex];

            if(courseJson['type']==='course') {

                var course:ICourse = {
                    id: coursesIdIndex,
                    title: courseJson['title'],
                    category: Category.categoryFromJson(courseJson['category']),
                    price: courseJson['price'],
                    description: courseJson['description'],
                    imageLink: courseJson['imageLink'],
                    instructor: this.getIAuthorsItemFromJson(courseJson['instructor']),
                    srcLink: courseJson['srcLink']
                };
                crs.push(course);
                return course;
            }
        });
        if(crs.length<=0) return null;
        else return crs;
    }

    public static courseFromJson(json: Object): Course {

        if(json === null || json === undefined) return null;

        console.log(json);


        return new Course(
            json['id'],
            json['title'],
            Category.categoryFromJson(json['category']),
            json['description'],
            json['price'],
            this.getIInstructorCourseFromJson(json['instructor']),
            json['srcLink'],
            json['creationDate'],
            json['searchContent'],
            json['imageLink'],
            json['nbClick'],
        );
    }

    public static coursesFromJson(json: Object): Course[] {

        console.log(json);

        if(json === null || json === undefined) return null;

        var courses: Course[] = Object.keys(json).map(
            function(coursesIdIndex){
            let courseJson = json[coursesIdIndex];
        
            console.log(json);

            var course = Course.courseFromJson(courseJson)
            course.id = coursesIdIndex;

            return course;
        });

        console.log('courses',courses);

        return courses;
    }

    public static getIInstructorCourseFromJson(json: Object): IInstructor {
        
        if(json === null || json === undefined) return null;

       /* console.log(json);

        var instructor = Object.keys(json).map(
            function(instructorIdIndex){
            let userJson = json[authorsIdIndex];
            
            console.log(userJson);

            var iInstructor:IInstructor = {
                id: authorsIdIndex,
                firstname: userJson['firstname'],
                lastname: userJson['lastname'],
            };
            return author;
        });

        return iInstructor; */
    }
}
