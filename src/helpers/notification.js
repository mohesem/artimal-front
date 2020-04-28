import React from "react";
import { store } from "react-notifications-component";

export default (msg, type) => {
  store.addNotification({
    // title: "Wonderful!",
    message: (
      <>
        <br />
        <p>{msg}</p>
      </>
    ),
    type: type,
    insert: "bottom",
    container: "bottom-left",
    animationIn: ["animated", "fadeIn"],
    animationOut: ["animated", "fadeOut"],
    dismiss: {
      duration: 5000,
      onScreen: true,
      showIcon: true,
    },
  });
};
