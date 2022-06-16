
//He we try to sumilate the process of fetching all the scholarship program offered by a certain agence
//And the fetcher all the candidated who applyed to one of the cholar prog of that agency
//Using CALLBACK

let appyers; 

const getAgenceScholar = (id, callback) => {
    console.log(`fetching Agence of id :${id} Scholars from the db...`)
    setTimeout(()=>{
        console.log("returned ", ["Scholar0", "Scholar1", "Scholar2"]);
        callback((["Scholar0", "Scholar1", "Scholar2"])[id]);
    }, 2000);
};

const getScholarApplyers = (scholar, callback) => {
    console.log(`getting all the applyers of scholar : ${scholar} from the db`);
    setTimeout(()=>{
        callback(["Applyer0", "Applyer1", "Applyer2", "Applyer3", "Applyer4"]);
    }, 3000);
}

getAgenceScholar(2, scholar => {
    getScholarApplyers(scholar, cllBckParam => {
        appyers = cllBckParam;
        console.log(appyers);
    });
});