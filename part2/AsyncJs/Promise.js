//He we try to sumilate the process of fetching all the scholarship program offered by a certain agence
//And the fetcher all the candidated who applyed to one of the cholar prog of that agency
//Using PROMISES

let applyers, scholars;
const everyThgIsOkay = true;
const getAgenceScholars = (id) => { 
    return new Promise( (resolve, reject) => { // Our function will return the newly created object
        //Here we conducte the async operation
        console.log(`fetchin Scholar of agence of id : ${id} from the db...`);
        setTimeout(()=>{ 
            if(everyThgIsOkay) resolve(["Scholar0", "Scholar1", "Scholar2"]);
            else reject( new Error("An error occured when fetching the db :( ..."));
        },2000);
    });
};

const getApplyer = (scholar) =>{
    console.log(`fetching appleyers to the scholar : ${scholar} ...`);
    return new Promise ((resolve, reject) => {
        setTimeout(()=>{
            if(everyThgIsOkay) resolve(["Applyer0", "Applyer1", "Applyer2", "Applyer3", "Applyer4"]);
            else reject( new Error("An error occured when fetching the db :( ..."))
        }, 2000);
    });
};

const AgenceScholarsPromise = getAgenceScholars(18);//This is a promise object not a list!!
AgenceScholarsPromise
    .then( value => { //listenig to a fullfilment
        scholars = value;
        console.log("fetched scholars : ", scholars);

        //fetching Applyers
        const scholarApplyersPromis = getApplyer(scholars[1]);
        scholarApplyersPromis
            .then(value => {
                console.log("Applyers : ", value);
            })
            .catch(err=>{
                console.log( err.message );
            })
        ;
    })
    .catch( err => { //listening to a rejection
        console.log(err.message);
    })
;