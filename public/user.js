const form = document.getElementById("signup_form");

const sigUp = async (e) => {
  e.preventDefault();
  try {
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const obj = {
      username,
      email,
      password,
    };
    // console.log(obj);

    const response = await axios.post("http://localhost:4000/user/sigup", obj);
    // console.log(response);
    if (response.status === 207) {
      const view = document.querySelector(".error_view");
      view.style.color = "red";
      view.innerHTML = response.data.message;
    } else {
      document.querySelector(".error_view").innerHTML = response.data.message;
    }
  } catch (error) {
    document.querySelector(".error_view").innerHTML =
      "Some thing went wrong...";
  }
};

form.addEventListener("submit", sigUp);
