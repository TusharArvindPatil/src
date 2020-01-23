function userRepository(){

    // Public Method
    this.loginValidationAsync=async function(userModelPara){
        let response=null;
        try{
            return await new Promise((resolve)=>{
                let tempUserName="hello";
                let tempPassword="123";

                if(tempUserName===userModelPara.userName 
                    &&
                    tempPassword===userModelPara.password 
                  )
                  {
                      response=true;
                  }
                  else
                  {
                      response="User Name & Password does not match";
                  }

                return resolve(response);
            });
        }
        catch(ex)
        {
            throw ex;
        }
    }

}