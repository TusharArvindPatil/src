/// <reference path="../../../../Batch7/Day10/src/lib/jquery/jquery-3.4.1.min.js"/>

function usersController(userModelPara=null,userContextPara=null){

    let _userModelObj=userModelPara;
    let _userContextObj=userContextPara;

    // Private method
    let getUserCredentialsAsync=async function(){
        try
        {
            return await new Promise((resolve)=>{

                // Model Binding
                _userModelObj.userName=$("#txtUserName").val();
                _userModelObj.password=$("#txtPassword").val();

                return resolve(true);

            });
        }
        catch(ex)
        {
            throw ex;
        }
    }

    let validationUserAsync=async function(){
        let isFlag=undefined; // Boolean
        try
        {
            return await new Promise((resolve)=>{

                if(
                    (_userModelObj.userName==null)
                    &&
                    (_userModelObj.password==null)
                ){
                    $("#validationUser").html("user name & password should not be empty");
                    isFlag=false;
                }
                else
                {
                    isFlag=true;
                }

                return resolve(isFlag);

            });
        }
        catch(ex)
        {
            throw ex;
        }
    }

    let validateUserCredentialsAsync=async function(isValidationDone){
        let response=undefined; // String||boolean
        try
        {
            return await new Promise(async(resolve)=>{
               
                if(isValidationDone===true)
                {
                    response= await _userContextObj.loginValidationAsync(_userModelObj);
                }
                
                
                return resolve(response);
            });
        }
        catch(ex)
        {
            throw ex;
        }

    }

    let redirectToDashboardAsync=async function(response){
        try
        {
            return await new Promise((resolve)=>{

                if(typeof(response)==="boolean"){
                    // Redirect To Dashboard
                }
                else
                {
                    $("#validationUser").html(response);
                }

                return resolve(true);

            });
        }
        catch(ex)
        {
            throw ex;
        }
    }

    // Public Method
    this.onSubmitAsync=async function(){
        try{
            
            return await new Promise(async (resolve)=>{

                // read User credentails from UI
                await getUserCredentialsAsync();

                // Validation Users
               let isValidationDone=await validationUserAsync();

               // Validate User Credentials
               let response=await validateUserCredentialsAsync(isValidationDone);

               // Redirect To Dashboard.
               await redirectToDashboardAsync(response);

                return resolve(true);
            });
            
        }
        catch(ex){
            throw ex;
        }
    }

}

// Non async Mode.
function onSubmitButtonClickEvent(){
    try
    {
        // Create an instance of User Model
        let userModelObj=new userModel();

        // Create an instance of User Repository
        let userRepositoryObj=new userRepository();

        // Create an instance of User Context
        let userContextObj=new userContext(userRepositoryObj);

        // Create an instance of User Controller
        let userControllerObj=new usersController(userModelObj,userContextObj);
        userControllerObj
        .onSubmitAsync()
        .then((resolve)=> console.log(resolve));
    }
    catch(ex)
    {
        console.log(ex.message);
        console.log(ex.stack);
    }
}