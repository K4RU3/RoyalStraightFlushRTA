const originalCard = document.querySelector(".copyCard")
const counterNum = document.querySelector("#count")
const currentTime = document.querySelector("#currentTime")
const originalSe = new Audio("se.mp3")
const hands = document.querySelector(".hands")

let isPlay = false
let startTime

for(let i = 0; i < 5; i++){
    hands.appendChild(createCard("null", ""))
}

const suitsList = ["spade", "club", "diamond", "heart"]
const numList = ["2","3","4","5","6","7","8","9","10","J","Q","K","A"]

/**
 * @param {"spade"|"club"|"diamond"|"heart"|"null"} suit 
 * @param {"A"|"2"|"3"|"4"|"5"|"6"|"7"|"8"|"9"|"10"|"J"|"Q"|"K"|""} num 
 */
function createCard(suit, num){
    let copy = originalCard.cloneNode(true)
    copy.removeAttribute("id")
    const suits = copy.querySelectorAll(".suit")
    for(const elem of suits){
        if(elem.id !== suit){
            elem.parentNode.removeChild(elem)
        }
    }
    copy.querySelector("text").textContent = num
    return copy
}

function roll(){
    if(!isPlay){
        togglePlay()
    }
    count.textContent = parseInt(count.textContent) + 1
    originalSe.cloneNode().play()
    hands.innerHTML = ''
    let nums = []
    for(let i = 0; i < 5; i++){
        let value = randCard(...nums)
        nums.push(value)
    }
    nums.sort((a, b) => a - b)
    console.log(nums)
    for(const value of nums){
        const copy = createCard(suitsList[Math.floor((value-1)/13)], numList[(value%13).toString()])
        hands.appendChild(copy)
        copy.classList.add("animate")
    }
    if(nums[4]%12 === 0 && nums[4] - nums[0] === 4){
        togglePlay()
    }
}

function randCard(...arg){
    let rand = Math.floor(Math.random()*52+1)
    if(arg.includes(rand)){
        rand = randCard(...arg)
    }
    return rand
}

function togglePlay(){
    let interval
    if(!isPlay){
        startTime = Date.now()
        isPlay = true
        interval = setInterval(()=>{
            currentTime.textContent = new Date(Date.now() - startTime).toISOString().slice(11, -1)
        }, 10)
    }else{
        isPlay = false
        clearInterval(interval)
    }
}

document.addEventListener('keydown', (event) => {
    const key = event.key;
    if (key === 'r' || key === 'R' || key === ' ' || key === 'Enter'){
        roll()
    }
});