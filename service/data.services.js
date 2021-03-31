accountdetails = {

  1000: { acno: 1000, user: "userone", balance: 5000, password: "user0" },
  1001: { acno: 1001, user: "usertwo", balance: 3000, password: "user1" },
  1002: { acno: 1002, user: "userthree", balance: 4500, password: "user2" },
  1003: { acno: 1003, user: "userfour", balance: 4000, password: "user3" },
  1004: { acno: 1004, user: "userfive", balance: 5000, password: "user4" }
}



const register = (acno, user, password) => {
  console.log("register called");
  if (acno in accountdetails) {
    return {
      status: false,
      statusCode: 422,
      message: "user exist pls login"
    }
  }
  accountdetails[acno] = {
    acno, user, balance: 0, password
  }
  // this.saveDetails();
  return {
    status: true,
    statusCode: 200,
    message: "Registration successful"
  }

}

const login = (req, acno, password) => {
  let data = accountdetails;
  if (acno in data) {
    if (password == data[acno]["password"]) {
      req.session.cUser = accountdetails[acno].user;
      // this.saveDetails();
      return {
        status: true,
        statusCode: 200,
        message: "login successful"
      }
    }
    else {
      return {
        status: false,
        statusCode: 422,
        message: "incorrect password"
      }
    }
  }
  else {
    return {
      status: false,
      statusCode: 422,
      message: "User not exist"
    }
  }
}

const deposit = (req, acno, amount, password) => {
  
  let data = accountdetails;
  var amt = parseInt(amount)
  if (acno in data) {

    if (password == data[acno]["password"]) {
      data[acno].balance += amt;
      // this.saveDetails();
      // alert("credit amount : " + amt + " current balance : " + data[acno].balance)
      return {

        status: true,
        statusCode: 200,
        message: "credited",
        balance: data[acno].balance
      }
    }
    else {
      return {
        status: false,
        statusCode: 422,
        message: "incorrect password"
      }
    }
  }
  else {
    return {
      status: false,
      statusCode: 422,
      message: "User not exist"
    }

  }
}
const withdraw = (req, acno, amount, password) => {
  
  let data = accountdetails;
  var amt = parseInt(amount)
  if (acno in data) {

    if (password == data[acno]["password"]) {
      if (data[acno].balance > amt) {

        data[acno].balance -= amt;
        // this.saveDetails();
        // alert("credit amount : " + amt + " current balance : " + data[acno].balance)
        return {

          status: true,
          statusCode: 200,
          message: "Account has bee debited",
          balance: data[acno].balance
        }

      }
      else {
        return {
          status: false,
          statusCode: 422,
          message: "insufficient Balance",
        }
      }

    }
    else {
      return {
        status: false,
        statusCode: 422,
        message: "incorrect password"
      }
    }
  }
  else {
    return {
      status: false,
      statusCode: 422,
      message: "User not exist"
    }

  }
}
module.exports = {
  register, login, deposit, withdraw
}
