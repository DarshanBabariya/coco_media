const handleErrors = (err) => {
    let errorData = { firstname : '', lastname : '', email : '', password : ''};
    
    //login error 

    if(err.message == "Incorrect Email"){
        errorData.email = "Please enter a valid Email Address."; 
    } else if(err.message == "Incorrect Password") {
        errorData.password = "Please enter a valid Password.";
    }

    // register error
    if (err.code === 11000) {
        errorData.email = "This Email Address is already registered.";
    }
    else if (err.message.includes('users validation failed')) {
        let errorArray = Object.values(err.errors);
        
        errorArray.forEach(err => {
            errorData[err.properties.path] = err.properties.message;
        });
        
    }

    if(err.message.includes('posts validation failed')){
        let errorArray = Object.values(err.errors);
        
        errorArray.forEach(err => {
            errorData[err.properties.path] = err.properties.message;
        });
    }
   
    return errorData ;

}

module.exports = handleErrors;