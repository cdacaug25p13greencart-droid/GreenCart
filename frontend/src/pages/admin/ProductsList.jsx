function ProductsList() {
  const products = [
    { id: 101, name: "Tomato", price: 20, farmer: "Ramesh" },
    { id: 102, name: "Potato", price: 15, farmer: "Suresh" }
  ];

  return (
    <>
      <h2>Products List</h2>
      <table border="1" width="100%">
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Price</th>
          <th>Farmer</th>
        </tr>
        {products.map(p => (
          <tr key={p.id}>
            <td>{p.id}</td>
            <td>{p.name}</td>
            <td>₹{p.price}</td>
            <td>{p.farmer}</td>
          </tr>
        ))}
      </table>
    </>
  );
}

export default ProductsList;
