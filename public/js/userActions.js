const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");
const eye_sign_in = document.querySelector("#toggle-password-sign-in");
const eye_sign_up = document.querySelector("#toggle-password-sign-up");
// inputs fields
// sign-in-form
const password_sign_in = document.querySelector("#password-sign-in");
const email_sign_in = document.querySelector("#email-sign-in");
// sign-in-form
const password_sign_up = document.querySelector("#password-sign-up");
const email_sign_up = document.querySelector("#email-sign-up");
const username_sign_up = document.querySelector("#username-sign-up");
// forms
const login_form = document.querySelector(".sign-in-form");
const signup_form = document.querySelector(".sign-up-form");

signup_form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const view = document.querySelector(".error-view-sign-up");
  view.innerHTML = "";
  try {
    const email = email_sign_up.value;
    const username = username_sign_up.value;
    const password = password_sign_up.value;

    const obj = {
      username,
      email,
      password,
    };

    const response = await axios.post("http://localhost:4001/signup", obj);
    if (response.status >= 400) {
      const view = document.querySelector(".error-view-sign-up");
      view.style.color = "red";
      view.innerHTML = ` <i class="fas fa-exclamation-triangle"></i> ${error.response.data.message}`;
      // console.log(error.response.data);
    } else {
      console.log("Successfully sing up");
      (() => {
        container.classList.remove("sign-up-mode");
      })();
      email_sign_up.value = "";
      username_sign_up.value = "";
      password_sign_up.value = "";
    }
  } catch (error) {
    console.log(error);
    const view = document.querySelector(".error-view-sign-up");
    view.style.color = "red";
    view.innerHTML = ` <i class="fas fa-exclamation-triangle"></i> ${error.response.data.message}`;
  }
});

login_form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const view = document.querySelector(".error-view-sign-in");
  view.innerHTML = "";
  try {
    const email = email_sign_in.value;
    const password = password_sign_in.value;

    const obj = {
      email,
      password,
    };

    const response = await axios.post("http://localhost:4001/login", obj);

    if (response.status === 200) {
      // alert("user successfully sign in");
      console.log(response.data.token);
      localStorage.setItem("token",response.data.token);
      email_sign_in.value = "";
      password_sign_in.value = "";
      window.location = 'expense', true;
    }
  } catch (error) {
    console.log(error);
    const view = document.querySelector(".error-view-sign-in");
    view.style.color = "red";
    view.innerHTML = ` <i class="fas fa-exclamation-triangle"></i> ${error.response.data.error}`;
  }
});

sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});
let flag_1 = true;
eye_sign_up.addEventListener("click", function () {
  const type =
    password_sign_up.getAttribute("type") === "password" ? "text" : "password";

  password_sign_up.setAttribute("type", type);

  if (flag_1) {
    this.setAttribute("class", "fas fa-eye");
    flag_1 = false;
  } else {
    this.setAttribute("class", "fas fa-eye-slash");
    flag_1 = true;
  }
});
let flag_2 = true;
eye_sign_in.addEventListener("click", function () {
  const type =
    password_sign_in.getAttribute("type") === "password" ? "text" : "password";

  password_sign_in.setAttribute("type", type);

  if (flag_2) {
    this.setAttribute("class", "fas fa-eye");
    flag_2 = false;
  } else {
    this.setAttribute("class", "fas fa-eye-slash");
    flag_2 = true;
  }
});
