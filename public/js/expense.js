const expense_form = document.querySelector("#expense-form");
const error_view = document.querySelector("#error-view");
const Expense_list = document.querySelector(".list");
const token = localStorage.getItem("token");

window.addEventListener("DOMContentLoaded", () => {
  axios
    .get("http://localhost:4001/expense/getExpense", {
      headers: { Authentication: token },
    })
    .then((res) => {
      res.data.response.forEach((expense) => {
        addExpenseToList(expense);
      });
    })
    .catch((err) => {
      error_view.textContent = err.message;
    });
});

function addExpenseToList(expense) {
  const childElement = document.createElement("tr");
  //   childElement.innerHTML = `Amount : ${expense.amount} Description : ${expense.description} Category : ${expense.category} <button>Delete</button>`;

  childElement.setAttribute("id", `expense-${expense.id}`);

  childElement.innerHTML = `<td>${expense.amount}</td><td>${expense.description}</td><td>${expense.category}</td><td><button type="button"  onClick='deleteExpense(${expense.id})' class="btn btn-outline-danger">Delete</button></td>`;

  Expense_list.appendChild(childElement);
}

function deleteExpense(id) {
  //   console.log(id);
  axios
    .delete(`http://localhost:4001/expense/deleteExpense/${id}`, {
      headers: { Authentication: token },
    })
    .then((res) => {
      error_view.textContent = res.data.message;
      removeList(id);
    })
    .catch((err) => {
      error_view.textContent = err.message;
    });
}

function removeList(id) {
  const expenseListId = `expense-${id}`;

  document.getElementById(expenseListId).remove();
}

const expenseHandler = (e) => {
  e.preventDefault();

  const amount = document.querySelector("#amount").value;
  const description = document.querySelector("#description").value;
  const category = document.querySelector("#category").value;

  const obj = {
    amount,
    description,
    category,
  };

  axios
    .post("http://localhost:4001/expense/addExpense", obj, {
      headers: { Authentication: token },
    })
    .then((res) => {
      error_view.textContent = res.data.message;
      addExpenseToList(res.data.response);
      e.target.reset();
    })
    .catch((err) => {
      error_view.textContent = err.message;
    });
};

expense_form.addEventListener("submit", expenseHandler);

document.getElementById("premium-btn").onclick = async (e) => {
  console.log("Premium");
  const response = await axios.get(
    "http://localhost:4001/purchase/premiumMembership",
    {
      headers: { Authentication: token },
    }
  );

  console.log(response);

  const options = {
    key: response.data.key_id,
    order_id: response.data.order.id,
    handler: async function (response) {
      const res = await axios.post(
        "http://localhost:4001/purchase/updateTransactionStatus",
        {
          order_id: options.order_id,
          payment_id: response.razorpay_payment_id,
        },
        {
          headers: { Authentication: token },
        }
      );

      console.log(res);

      alert("you are a premium user now😊💥💥 ");
      document.getElementById("premium-btn").style.display = "none";
      document.querySelector(".member").innerHTML =
        "You are a premium member😊";
      document.querySelector(".member").style.color = "gold";
    },
  };

  const rzpy = new Razorpay(options);
  rzpy.open();
  e.preventDefault();

  rzpy.on("payment.failed", async function (response) {
    const failedResponse = await axios.post(
      "http://localhost:4001/purchase/updateTransactionStatus",
      {
        order_id: options.order_id,
      },
      {
        headers: { Authentication: token },
      }
    );
    console.log(
      "Razorpay response --->",
      response,
      "Server response ---->",
      failedResponse
    );
    alert(failedResponse.data.message);
  });
};
