function obj(){
    
    const company = {
        name: "xyx",
        location: "Islamabad",
        department: {
            name: "HR",
            head: "jone",
            totalEmployee: 12
        },
        totalDepart: 12

    }

    // let compName = company.name
    // let abc="location"
    // console.log(company[abc])

    for(let item in company){
        if(company[item] === "xyx"){
            console.log("hello")
        }
    }
}
module.exports=obj