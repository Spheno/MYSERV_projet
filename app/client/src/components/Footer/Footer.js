import React from "react";
import SimpleLink from "../Link/SimpleLink";

class Footer extends React.Component {
  render() {
    return (
      <footer className="bg-gray-200 border border-gray-500 mt-8 w-full">
        <div className="container mx-auto px-6 pt-10 pb-6">
          <div className="flex flex-wrap">
            <div className="w-full md:w-1/4 text-center md:text-left">
              <h5 className="uppercase mb-6 font-bold">Links</h5>
              <ul className="mb-4">
                <li className="mt-2">
                  <SimpleLink name="FAQ" href="#top" />
                </li>
                <li className="mt-2">
                  <SimpleLink name="Help" href="#top" />
                </li>
                <li className="mt-2">
                  <SimpleLink name="Support" href="#top" />
                </li>
              </ul>
            </div>
            <div className="w-full md:w-1/4 text-center md:text-left">
              <h5 className="uppercase mb-6 font-bold">Legal</h5>
              <ul className="mb-4">
                <li className="mt-2">
                  <SimpleLink name="Terms" href="#top" />
                </li>
                <li className="mt-2">
                  <SimpleLink name="Privacy" href="#top" />
                </li>
              </ul>
            </div>
            <div className="w-full md:w-1/4 text-center md:text-left">
              <h5 className="uppercase mb-6 font-bold">Social</h5>
              <ul className="mb-4">
                <li className="mt-2">
                  <SimpleLink name="Facebook" href="#top" />
                </li>
                <li className="mt-2">
                  <SimpleLink name="Instagram" href="#top" />
                </li>
                <li className="mt-2">
                  <SimpleLink name="Twitter" href="#top" />
                </li>
              </ul>
            </div>
            <div className="w-full md:w-1/4 text-center md:text-left">
              <h5 className="uppercase mb-6 font-bold">Company</h5>
              <ul className="mb-4">
                <li className="mt-2">
                  <SimpleLink name="About Us" href="#top" />
                </li>
                <li className="mt-2">
                  <SimpleLink name="Contact" href="#top" />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
