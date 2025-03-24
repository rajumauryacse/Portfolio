let passwordLength = 10;
const sliderlength = document.querySelector('[data-lengthslider]');
const lenghtDisplay = document.querySelector('[data-lengthNumber]');

lenghtDisplay.innerHTML = passwordLength;

function displayPassLength()
{
  sliderlength.value = passwordLength;
  lenghtDisplay.innerHTML = passwordLength;

  const min = sliderlength.min;
  const max = sliderlength.max;

  sliderlength.style.backgroundSize = ((passwordLength-min)*100/(max-min)) + "% 100%";
}

const colorIndicator = document.querySelector('[data-indicator]');

function setIndicatorColor1(color)
{
  colorIndicator.style.backgroundColor = color;
  colorIndicator.style.boxShadow = '1px 1px 10px 3px rgb(260, 92, 92)';
  colorIndicator.style.opacity = 1;
}
function setIndicatorColor2(color)
{
  colorIndicator.style.backgroundColor = color;
  colorIndicator.style.boxShadow = '1px 1px 10px 3px rgb(92, 260, 92)';
  colorIndicator.style.opacity = 1;
}

function getRndInterger(min,max)
{
  return Math.floor(Math.random()*(max-min))+min;
}

function getRndUpperCase()
{
  return String.fromCharCode(getRndInterger(65,90));
}

function getRndLowerCase()
{
  return String.fromCharCode(getRndInterger(97,122));
}

function getRndnumber()
{
  return getRndInterger(0,9);
}

const Symbols = "!@#$%^&*-_~<?>/?\.\|<"

function getRndSymbol()
{
  return Symbols.charAt(getRndInterger(1,Symbols.length));
}

const upperCase = document.querySelector('#Uppercase');
const lowerCase = document.querySelector('#Lowercase');
const symbol = document.querySelector('#Symbol');
const number = document.querySelector('#Number');

function calcstrength()
{
  let haslowerCase = false;
  let hasupperCase = false;
  let hasNumber = false;
  let hasSymbol = false;
  
  if(upperCase.checked) hasupperCase = true;
  if(lowerCase.checked) haslowerCase = true;
  if(number.checked) hasNumber = true;
  if(symbol.checked) hasSymbol = true;

  if(hasupperCase && haslowerCase && hasNumber && passwordLength>=5)
  {
    setIndicatorColor2("rgb(126, 204, 9)");
  }

  else if(hasNumber || hasSymbol && haslowerCase || hasupperCase<=5)
  {
    setIndicatorColor1("rgb(249, 5, 5)");
  }

  else if(hasupperCase||haslowerCase&&hasNumber ||hasSymbol && passwordLength>=6)
  {
    setIndicatorColor2("rgb(126, 204, 9)");
  }

  else if(hasNumber && hasSymbol && haslowerCase 
    || hasNumber && hasSymbol && hasupperCase >=6)
  {
    setIndicatorColor1("rgb(126, 204, 9)");
  }

  if(checkcount>=3 && passwordLength>=6)
  {
    setIndicatorColor2("rgb(126, 204, 9)");
  }

  else
  {
    setIndicatorColor1("rgb(249, 5, 5)");
  }

}

//shufflepassword function
// function shufflepassword(array)
// {
//   //Fisher yates method
//   for(let i=array.length;i>0;i--)
//   {
//    const j = Math.floor(Math.random()*(i+1));
//    const temp = array[i];
//    array[i] = array[j];
//    array[j] = array[temp];
//   }
//   let str = "";
//   array.forEach((el) => {str += el});
//   return str;
// }
function shufflepassword(array) {
  //Fisher Yates Method
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  let str = "";
  array.forEach((el) => (str += el));
  return str;
}

let password = '';
let checkcount = 0;
const passwordDisplay = document.querySelector('[data-passwordDisplay');
const copiedMsg = document.querySelector('[data-copyMsg]');

async function copycontent()
{
  try{
    await navigator.clipboard.writeText(passwordDisplay.value);
    copiedMsg.innerHTML = 'copied';
  }

  catch(e)
  {
    copiedMsg.innerHTML = 'failed';
  }

  copiedMsg.classList.add('active');

  setTimeout(() => {
    copiedMsg.classList.remove('active');
  }, 2000);

}

sliderlength.addEventListener('input',(e) => {
  passwordLength = e.target.value;
  displayPassLength();
})

const copyButton = document.querySelector('[data-copy]');

copyButton.addEventListener('click',() =>{
   if (passwordDisplay.value){
    copycontent();
   }
})

const allCheckbox = document.querySelectorAll("input[type=checkbox]");

function handleCheckboxChange(){
  checkcount = 0;  
  allCheckbox.forEach((checkbox) => {
   if(checkbox.checked)
   checkcount++;
  });

  // special condition
  if(checkcount > passwordLength)
  {
    passwordLength = checkcount;
    displayPassLength();
  }
  
}

allCheckbox.forEach((checkbox) => {
  checkbox.addEventListener('change',handleCheckboxChange);
})

const generateButton = document.querySelector('.generateButton');

generateButton.addEventListener('click',() => {
  if(passwordLength <= 0)
   return;

  if(passwordLength < checkcount) {
    passwordLength = checkcount;
  displayPassLength();
  }
  // let's begin the jorney to generate new password

  //remove existed password
  password = '';

  //put the stuff mentioned in checkbox by user

  // if (upperCase.checked)
  // {
  //   password += getRndUpperCase();
  // }

  // if (lowerCase.checked)
  // {
  //   password += getRndLowerCase();
  // }

  // if (number.checked)
  // {
  //   password += getRndnumber();
  // }

  // if (symbol.checked)
  // {
  //   password += getRndSymbol();
  // }
 
  //add compulsory checked number
  const funArr = [];

  if(upperCase.checked)
  {
    funArr.push(getRndUpperCase);
  }

  if(lowerCase.checked)
  {
    funArr.push(getRndLowerCase);
  }

  if(number.checked)
  {
    funArr.push(getRndnumber);
  }

  if(symbol.checked)
  {
    funArr.push(getRndSymbol);
  }

  //comlusary addition
  for(let i=0;i<funArr.length;i++)
  {
    password += funArr[i]();
  }

  //remaining addition
  for(let i =0;i<passwordLength-funArr.length;i++)
  {
    let rndIndex = getRndInterger(0,funArr.length);
    password += funArr[rndIndex]();
  }

  //shuffle password
  password = shufflepassword(Array.from(password));

  //show in UI
  passwordDisplay.value = password;

  //show strenth of password
  calcstrength();

  }) 
