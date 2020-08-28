import React from "react";

const Guest = () => {
  const guestRegister = (event) => {
    event.preventDefault();
    let guestId = document.getElementById("guestName").value;
    console.log(guestId);
  };

  return (
    <div>
      <h2>Guest</h2>
      <form onSubmit={guestRegister}>
        <label for="guestName">Temporary name</label>
        <input
          name="guestName"
          id="guestName"
          type="text"
          placeholder=""
          required
        ></input>
        <input type="submit" value="Continue as guest"></input>
        <p>
          *Note that you will lose your guest credentials upon leaving Carden.
        </p>
      </form>
    </div>
  );
};

export default Guest;
