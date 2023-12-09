const expense_form = document.querySelector("#expense-form");
const error_view = document.querySelector("#error-view");
const Expense_list = document.querySelector(".list");
const list_body = document.querySelector("#list-body");
const token = localStorage.getItem("token");

function showPremiumMessage() {
  document.getElementById("premium-btn").style.display = "none";
}

function showReportsTab() {
  const reports = document.createElement("a");
  reports.className = "nav-link";
  reports.style.cursor = "pointer";
  reports.innerHTML = `Reports`;
  reports.href = "/reports/getReports";
  document.querySelector(".reports").appendChild(reports);
}

function showLeaderBoard() {
  const anchorTag = document.createElement("a");
  anchorTag.className = "nav-link";
  anchorTag.style.cursor = "pointer";
  anchorTag.innerHTML = `Leader Board`;
  anchorTag.href = "/expense/leaderBoard";
  document.querySelector(".leader-Board").appendChild(anchorTag);
}

// function jwtParser(token) {
//   const base64Url = token.split(".")[1];
//   const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
//   const jsonPayload = decodeURIComponent(
//     window
//       .atob(base64)
//       .split("")
//       .map((x) => "%" + ("00" + x.charCodeAt(0).toString(16)).slice(-2))
//       .join("")
//   );

//   return JSON.parse(jsonPayload);
// }

window.addEventListener("DOMContentLoaded", (e) => {
  // const token = localStorage.getItem("token");
  // const decodedJwt = jwtParser(token);

  // console.log(decodedJwt);
  // if (decodedJwt.isPremiumMember) {
  //   showPremiumMessage();
  // }
  e.preventDefault();
  axios
    .get("http://localhost:4001/expense/getExpenses/1", {
      headers: { Authentication: token },
    })
    .then((res) => {
      if (res.data.user) {
        showPremiumMessage();
        showLeaderBoard();
        showReportsTab();
      }
      res.data.expenses.forEach((expense) => {
        addExpenseToList(expense);
      });

      const ul = document.querySelector("#pagination-list");

      for (let i = 1; i <= res.data.totalPages; i++) {
        ul.innerHTML += `<li class="page-item">
        <button class="page-link" onclick="pagination(${i})">${i}</button>
      </li>`;
      }
    })
    .catch((err) => {
      error_view.textContent = err.message;
    });
});

async function pagination(e) {
  try {
    const response = await axios(
      `http://localhost:4001/expense/getExpenses/${e}`,
      {
        headers: {
          Authentication: token,
        },
      }
    );

    Expense_list.innerHTML = "";

    response.data.expenses.map((expense) => {
      addExpenseToList(expense);
    });
  } catch (error) {
    console.log(error);
  }
}

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
  const newDate = new Date();
  const date = `${newDate.getDate().toString().padStart(2, 0)}-${(
    newDate.getMonth() + 1
  )
    .toString()
    .padStart(2, 0)}-${newDate.getFullYear()}`;

  const obj = {
    date,
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
      showPremiumMessage();
      showLeaderBoard();
      showReportsTab();
      // localStorage.setItem("token", res.data.token);
      alert("you are a premium user now😊💥💥 ");
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

document.querySelector("#logout-btn").onclick = () => {
  try {
    localStorage.clear();
    (window.location = "/"), true;
  } catch (error) {
    console.log(error);
  }
};
