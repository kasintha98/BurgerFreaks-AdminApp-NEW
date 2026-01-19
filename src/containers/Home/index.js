import React, { useEffect } from "react";
import { getCustomerOrders } from "../../actions";
import { Jumbotron } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../components/Layouts";

function Home(props) {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const order = useSelector((state) => state.order);

  //get new orders on load and refresh every 5 seconds
  useEffect(() => {
    // Initial call
    dispatch(getCustomerOrders())
      .then(() => {
        console.log("Orders loaded successfully");
      })
      .catch((err) => {
        console.log(err);
      });

    // Set up interval to refresh every 5 seconds
    const interval = setInterval(() => {
      dispatch(getCustomerOrders())
        .then(() => {
          console.log("Orders refreshed successfully");
        })
        .catch((err) => {
          console.log(err);
        });
    }, 5000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  let orderNumbers = 0;

  return (
    <div>
      <Layout sidebar>
        <Jumbotron
          className="text-center"
          style={{ margin: "60px", backgroundColor: "#fff" }}
        >
          <h1>Welcome to Admin Dashboard</h1>
          <h2>
            {auth.authenticate ? (
              <div>{auth.user ? auth.user.fullName : ""} </div>
            ) : null}{" "}
          </h2>
          {order.orders.map((orderItem, index) => (
            <div key={index}>
              {(() => {
                for (var i = 0; i < orderItem.orderStatus.length; i++) {
                  if (
                    orderItem.orderStatus[i].type === "delivered" &&
                    orderItem.orderStatus[i].isCompleted !== true
                  ) {
                    orderNumbers = orderNumbers + 1;
                  }
                }
              })()}
            </div>
          ))}
          <div
            style={{
              marginTop: "50px",
              backgroundColor: "#fcba03",
              border: "2px solid black",
            }}
          >
            <br></br>
            <h2> Not Completed Orders In Queue</h2>
            <h1 className="orderNumberIndicator">
              {orderNumbers ? orderNumbers : 0}
            </h1>
          </div>
        </Jumbotron>
      </Layout>
    </div>
  );
}

export default Home;
