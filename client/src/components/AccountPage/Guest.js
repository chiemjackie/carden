import React from "react";

const Guest = () => {
  const guestRegister = (event) => {
    event.preventDefault();
  };

  return (
    <div>
      <h2>Play as a guest</h2>
      <form onSubmit={guestRegister}>
        <label for="submit">Continue without an account</label>
        <input name="submit" id="submit" type="submit" value="Continue"></input>
        <p>*Note that you will lose all progress upon leaving Carden.</p>
      </form>
    </div>
  );
};

export default Guest;
