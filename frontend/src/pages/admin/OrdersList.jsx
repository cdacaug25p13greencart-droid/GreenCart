function OrdersList() {
  const orders = [
    { id: 5001, buyer: "Amit", total: 250 },
    { id: 5002, buyer: "Neha", total: 180 }
  ];

  return (
    <>
      <h2>Orders</h2>
      <table border="1" width="100%">
        <tr>
          <th>Order ID</th>
          <th>Buyer</th>
          <th>Total Amount</th>
        </tr>
        {orders.map(o => (
          <tr key={o.id}>
            <td>{o.id}</td>
            <td>{o.buyer}</td>
            <td>₹{o.total}</td>
          </tr>
        ))}
      </table>
    </>
  );
}

export default OrdersList;
