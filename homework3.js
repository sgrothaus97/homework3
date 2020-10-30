/*GIVEN I need a new, secure password
WHEN I click the button to generate a password
THEN I am presented with a series of prompts for password criteria
WHEN prompted for password criteria
THEN I select which criteria to include in the password
WHEN prompted for the length of the password
THEN I choose a length of at least 8 characters and no more than 128 characters
WHEN prompted for character types to include in the password
THEN I choose lowercase, uppercase, numeric, and/or special characters
WHEN I answer each prompt
THEN my input should be validated and at least one character type should be selected
WHEN all prompts are answered
THEN a password is generated that matches the selected criteria
WHEN the password is generated
THEN the password is either displayed in an alert or written to the page*/

//arrays for characters included in password
var SpecialCharacters = ['~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '+', '`', '_', '=', '/', '\\', '[', ']', '?', '.', ',', ':', "'", '<', '>', '|', '{', '}', ';'];
var UppercaseLetters = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Z', 'X', 'C', 'V', 'B', 'N', 'M'];
var LowercaseLetters = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'z', 'x', 'c', 'v', 'b', 'n', 'm'];
var Numbers = ['1','2','3','4','5','6','7','8','9','0'];




//prompt user to begin generating password
function getUserInput() {
  //store length of password
  var length = parseInt(
    prompt('What number of characters would you like to have in your password?')
  );
  //make sure user.input is a number
  if (isNaN(length) === true) {
    alert('Please use a number when inputting password length');
    return;
  }
  //make sure the number is at least 8
  if (length < 8) {
    alert('Password length must be at least 8 characters');
    return;
  }
  //make sure password is no more than 128 characters
  if (length > 128) {
    alert('Password length must be no greater than 128 characters');
    return;
  }
  //confirm inclusion of special characters
  var includesSpecialCharacters = confirm(
    'Click OK to confirm the inclusion of special characters in your password'
  );
  //confirm inclusion of uppercase letters
  var includesUppercaseLetters = confirm(
    'Click OK to confirm the inclusion of uppercase letters in your password'
  );
  //confirm the inclusion of lowercase letters
  var includesLowercaseLetters = confirm(
    'Click OK to confirm the inclusion of lowercase letters in your password'
  );
  //confirm the inclusion of numeric characters
  var includesNumbers = confirm(
    'Click OK to confirm the inclusion of numbers in your password'
  );
  //checks if user doesn't include any character types
    //password generator will end if all variables evaluate to false
  if (
    includesSpecialCharacters === false &&
    includesUppercaseLetters === false &&
    includesLowercaseLetters === false &&
    includesNumbers === false
  ) {
    alert('Error: Must include at least one character type');
    return;
  }

  //object that stores user input
  var UserInput = {
    length: length,
    includesSpecialCharacters: includesSpecialCharacters,
    includesUppercaseLetters: includesUppercaseLetters,
    includesLowercaseLetters: includesLowercaseLetters,
    includesNumbers: includesNumbers
  };
  return UserInput;
}

//function for pulling a random element from an array
function getRandom(array) {
  var randomIndex = Math.floor(Math.random() * array.length);
  var randomElement = array[randomIndex];
  
  return randomElement;
}

//function to generate password with user input
function generatePassword() {
  var input = getUserInput();
  //variable to stor password as it is concatenated
  var passwordInProgress = [];
  //array to store types of characters being included in password
  var potentialCharacters = [];
  //array containing one of each chosen character to make sure they all get used
  var definiteCharacters = [];

  //adds array of special characters into array of potential characters based on user input
  //pushes new random special character to definiteCharacters
  if (input.includesSpecialCharacters) {
    potentialCharacters = potentialCharacters.concat(SpecialCharacters);
    definiteCharacters.push(getRandom(SpecialCharacters));
  }

  //adds array of uppercase letters into array of potential characters based on user input
  //pushes new random uppercase letter to definiteCharacters
  if (input.includesUppercaseLetters) {
    potentialCharacters = potentialCharacters.concat(UppercaseLetters);
    definiteCharacters.push(getRandom(UppercaseLetters));
  }

  //adds array of lowercase letters into array of potential characters based on user input
  //pushes new random lowercase letters to definiteCharacters
  if (input.includesLowercaseLetters) {
    potentialCharacters = potentialCharacters.concat(LowercaseLetters);
    definiteCharacters.push(getRandom(LowercaseLetters));
  }

  //adds array of numbers into array of potential characters based on user input
  //pushes new random numbers to definiteCharacters
  if (input.includesNumbers) {
    potentialCharacters = potentialCharacters.concat(Numbers);
    definiteCharacters.push(getRandom(Numbers));
  }

  //loop to ensure length taken into account when generating password
  for (var i = 0; i < input.length; i++) {
    var potentialCharacter = getRandom(potentialCharacters);
    passwordInProgress.push(potentialCharacter);
  }

  //make passwordinprogress into a string and move into writePassword
  return passwordInProgress.join('');
}

// Assignment Code
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
