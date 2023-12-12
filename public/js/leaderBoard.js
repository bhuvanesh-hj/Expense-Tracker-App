const leaderBoard_body = document.querySelector("#leaderBoard-body");
let token = localStorage.getItem("token");

document.querySelector("#show-leaderBoard-btn").onclick = async () => {
  try {
    const response = await axios("/premium/leaderBoard", {
      headers: { Authentication: token },
    });
    console.log(response);
    leaderBoard_body.innerHTML = "";
    leaderBoard_body.innerHTML += `<div id="leader-table" ><table  class="table table-striped table-hover border">
      <h3>Leader Board</h3>
      <thead>
        <tr>
          <th>Name</th>
          <th>Total Expenses</th>
        </tr>
      </thead>
      <tbody class="leader-list">
      </tbody>
    </table> </div>`;

    response.data.expensesList.map((leader) => {
      document.querySelector(".leader-list").innerHTML += `<tr>
        <td>${leader.username}</td>
        <td>${leader.totalExpenses || 0}</td>
      </tr>`;
    });
  } catch (error) {
    console.log(error);
    error.response.status == 401
      ? ((window.location = "/"), true)
      : alert(error.response.data.message);
  }
};

document.querySelector("#logout-btn").onclick = () => {
  try {
    localStorage.clear();
    (window.location = "/"), true;
  } catch (error) {
    console.log(error);
  }
};
