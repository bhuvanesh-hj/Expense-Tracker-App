const login_form = document.getElementById("login_form");

const logIn = async (e) => {
  e.preventDefault();
  try {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // console.log(email, password);

    const obj ={
        email,
        password
    }
    
    const response = await axios.post('http://localhost:4001/user/login',obj);
    // console.log(response);
    if(response.status === 200){
        const view = document.querySelector(".error_view");
        view.style.color = "black";
        view.innerHTML = response.data.message;
    }
  } catch (error) {
    // console.log(error);
    const view = document.querySelector(".error_view");
        view.style.color = "red";
        view.innerHTML = error.response.data.error;
  }
};

login_form.addEventListener("submit", logIn);
