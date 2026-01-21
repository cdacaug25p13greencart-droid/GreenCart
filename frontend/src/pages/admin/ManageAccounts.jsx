function ManageAccounts() {
  const farmers = [
    { id: 1, name: "Ramesh", status: "PENDING" },
    { id: 2, name: "Suresh", status: "APPROVED" }
  ];

  const buyers = [
    { id: 10, name: "Amit" },
    { id: 11, name: "Neha" }
  ];

  return (
    <>
      <h2>Manage Accounts</h2>

      <h3>Farmers</h3>
      <table border="1" width="100%">
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
        {farmers.map(f => (
          <tr key={f.id}>
            <td>{f.id}</td>
            <td>{f.name}</td>
            <td>{f.status}</td>
            <td>
              {f.status === "PENDING" && <button>Approve</button>}
              <button style={{ marginLeft: "10px" }}>Suspend</button>
            </td>
          </tr>
        ))}
      </table>

      <h3>Buyers</h3>
      <table border="1" width="100%">
        <tr>
          <th>ID</th>
          <th>Name</th>
        </tr>
        {buyers.map(b => (
          <tr key={b.id}>
            <td>{b.id}</td>
            <td>{b.name}</td>
          </tr>
        ))}
      </table>
    </>
  );
}

export default ManageAccounts;
