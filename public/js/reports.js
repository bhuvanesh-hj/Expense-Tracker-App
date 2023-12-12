document.querySelector("#logout-btn").onclick = () => {
  try {
    localStorage.clear();
    (window.location = "/"), true;
  } catch (error) {
    console.log(error);
  }
};

//  token

let token = localStorage.getItem("token");

//  Daily
const daily_table = document.querySelector("#daily-table-body");
const daily_table_foot = document.querySelector("#daily-table-foot");

document.querySelector("#daily-btn").onclick = async function getDailyReport(
  e
) {
  e.preventDefault();
  const dateInput = document.querySelector("#date").value;
  const date = new Date(dateInput);
  const formattedDate = `${date.getDate().toString().padStart(2, 0)}-${(
    date.getMonth() + 1
  )
    .toString()
    .padStart(2, 0)}-${date.getFullYear()}`;

  const obj = {
    date: formattedDate,
  };
  const response = await axios.post(
    "/reports/dailyReports",
    obj,
    {
      headers: { Authentication: token },
    }
  );

  if (response.status >= 201) {
    daily_table_foot.innerHTML = "";
    daily_table.innerHTML = `<tr class="text-center"><td colspan="3">${response.data.message}</td></tr>`;
  } else {
    daily_table.innerHTML = "";
    daily_table_foot.innerHTML = "";
    let totalExpenses = 0;
    response.data.response.map((expense) => {
      totalExpenses += expense.amount;
      daily_table.innerHTML += `<tr><td>${expense.description}</td><td>${expense.category}</td><td>${expense.amount}</td></tr>`;
    });
    daily_table_foot.innerHTML = `<tr>
    <td colspan="2">Total Daily Expenses ---></td>
    <td>${totalExpenses}</td>
  </tr>`;
  }
};

// Monthly

const monthly_table = document.querySelector("#monthly-table-body");
const monthly_table_foot = document.querySelector("#monthly-table-foot");

document.querySelector("#monthly-btn").onclick =
  async function getMonthlyReports(e) {
    e.preventDefault();
    const monthInput = document.querySelector("#month").value;

    // console.log(monthInput.split("-").reverse().join("-"));

    const obj = {
      month: monthInput.split("-").reverse().join("-"),
    };

    const response = await axios.post(
      "/reports/monthlyReports",
      obj,
      {
        headers: { Authentication: token },
      }
    );

    if (response.status >= 201) {
      monthly_table_foot.innerHTML = "";
      monthly_table.innerHTML = `<tr class="text-center"><td colspan="3">${response.data.message}</td></tr>`;
    } else {
      monthly_table.innerHTML = "";
      monthly_table_foot.innerHTML = "";
      let totalExpenses = 0;
      response.data.response.map((expense) => {
        totalExpenses += expense.amount;
        monthly_table.innerHTML += `<tr><td>${expense.description}</td><td>${expense.category}</td><td>${expense.amount}</td></tr>`;
      });
      monthly_table_foot.innerHTML = `<tr>
    <td colspan="2">Total Monthly Expenses ---></td>
    <td>${totalExpenses}</td>
  </tr>`;
    }
  };

async function download() {
  try {
    const token = localStorage.getItem("token");
    document.querySelector(
      "#btn-download"
    ).innerHTML += `<div class="spinner-border spinner-border-sm" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>`;
    const response = await axios("/expense/download", {
      headers: { Authentication: token },
    });

    // console.log(response);
    document.querySelector("#btn-download").innerHTML = `Download report`;
    if (response.status == 200) {
      var a = document.createElement("a");
      a.href = response.data.fileURL;
      a.download = "myexpense.csv";
      a.click();
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    console.log(error);
    error.response.status == 401
      ? ((window.location = "/"), true)
      : alert(error.response.data.message);
  }
}

async function showDownloadedLists() {
  try {
    const Expenses = await axios(
      "/expense/downloaded-expenses",
      {
        headers: {
          Authentication: token,
        },
      }
    );
    const list = document.querySelector("#downloaded-list");
    list.innerHTML = "";
    list.innerHTML += `<h4 class="text-center">Downloaded Lists</h4>`;
    // console.log(Expenses);
    if (Expenses.data.downloadedExpenses.length > 0) {
      Expenses.data.downloadedExpenses.map((expense, i) => {
        list.innerHTML += `<li class="list-group-item"><a href="${
          expense.fileUrl
        }">File${i + 1}</a> Downloaded at - ${expense.updatedAt}</li>`;
      });
    } else {
      list.innerHTML += `<p class="text-center">No list found!</p>`;
    }
    document.querySelector("#close-btn").style.display = "inline-block"
  } catch (error) {
    console.log(error);
    error.response.status == 401
      ? ((window.location = "/"), true)
      : alert(error.response.data.message);
  }
}

document.querySelector("#close-btn").onclick = function close(){
  const list = document.querySelector("#downloaded-list");
  list.innerHTML = "";
  document.querySelector("#close-btn").style.display = "none"
}

