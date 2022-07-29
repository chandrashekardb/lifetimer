let isDOBOpen=false;
let dateOfBirth;
const settingCogEl=document.getElementById("settingIcon");
const settingContentEl=document.getElementById("settingContent");
const initialTextEl=document.getElementById("initialText");
const afterDOBBtnText=document.getElementById("afterDOBBtnText");
const dobButtonEl=document.getElementById("dobButton")
const dobInputEl=document.getElementById("dobInput");

const yearEl=document.getElementById("year");
const monthEl=document.getElementById("month");
const dayEl=document.getElementById("day");
const hourEl=document.getElementById("hour");
const minuteEl=document.getElementById("minutes");
const secondEl=document.getElementById("seconds");

const makeTwoDigitNumber=(number)=>{
    return number ? number :`0${number}`
}

const toggleDateOfBirthSelector=()=>{
    if(isDOBOpen){
        settingContentEl.classList.add("hide");
    }else{
        settingContentEl.classList.remove("hide")
    }
    isDOBOpen =! isDOBOpen;

    console.log("Toggle", isDOBOpen);
};

const updateAge=()=>{
    const curDate=new Date();
    // console.log({curDate});
    const dateDiff=curDate-dateOfBirth;
    const year=Math.floor(dateDiff/(1000*60*60*24*365))
    const month=Math.floor((dateDiff/(1000*60*60*24*365))%12)
    const day=Math.floor((dateDiff/(1000*60*60*24))%30)
    const hour=Math.floor((dateDiff/(1000*60*60))%24)
    const minutes=Math.floor((dateDiff/(1000*60))%60)
    const seconds=Math.floor(dateDiff/1000)%60;
    
    yearEl.innerHTML=makeTwoDigitNumber(year);
    monthEl.innerHTML=makeTwoDigitNumber(month);
    dayEl.innerHTML=makeTwoDigitNumber(day);
    hourEl.innerHTML=makeTwoDigitNumber(hour);
    minuteEl.innerHTML=makeTwoDigitNumber(minutes);
    secondEl.innerHTML=makeTwoDigitNumber(seconds);    
    // console.log(year,month,day, hour, minutes, seconds);
    }

    const localStorageGetter=()=>{
        const year=localStorage.getItem("year");
    const month=localStorage.getItem("month");
    const date=localStorage.getItem("date");
    if(year && month && date){
        dateOfBirth=new Date(year, month, date)
    }
    updateAge();
    }

    const contentToggler=()=>{
        updateAge();
        if(dateOfBirth){
            initialTextEl.classList.add("hide");
            afterDOBBtnText.classList.remove("hide");
        }
        else{
            afterDOBBtnText.classList.add("hide");
            initialTextEl.classList.remove("hide");
        }
    }

    const setDOBHandler=()=>{
    const dateString=dobInputEl.value; 
    dateOfBirth=dateString ? new Date(dateString): null;
    
    console.log({dateOfBirth});
    if(dateOfBirth){
        localStorage.setItem("year", dateOfBirth.getFullYear());
        localStorage.setItem("month", dateOfBirth.getMonth());
        localStorage.setItem("date", dateOfBirth.getDate());  
    }
    contentToggler();
    setInterval(() => updateAge(),1000);
}

localStorageGetter();
contentToggler();


settingCogEl.addEventListener("click", toggleDateOfBirthSelector);
dobButtonEl.addEventListener("click", setDOBHandler);
