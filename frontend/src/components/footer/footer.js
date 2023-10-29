import React from "react";

class Footer extends React.Component {
  render() {
    return (
      <>
        <div className="container-fluid fixed-bottom bg-dark">
          <footer className=" text-center text-lg-start">
            <div className="text-center text-white p-3">
              {"© 2023 Copyright: "}
              <a className="text-white" href="https://vojtechpetrasek.com/">
                Vojtěch Petrásek
              </a>
            </div>
          </footer>
        </div>
      </>
    );
  }
}

export default Footer;
