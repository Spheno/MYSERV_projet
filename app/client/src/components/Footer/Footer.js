import React from "react";
import SimpleLink from "../Link/SimpleLink";

class Footer extends React.Component {
  render() {
    return (
      <footer class="bg-gray-200 border border-gray-500 mt-8">
        <div class="container mx-auto px-6 pt-10 pb-6">
          <div class="flex flex-wrap">
            <div class="w-full md:w-1/4 text-center md:text-left">
              <h5 class="uppercase mb-6 font-bold">Links</h5>
              <ul class="mb-4">
                <li class="mt-2">
                  <SimpleLink name="FAQ" />
                </li>
                <li class="mt-2">
                  <SimpleLink name="Help" />
                </li>
                <li class="mt-2">
                  <SimpleLink name="Support" />
                </li>
              </ul>
            </div>
            <div class="w-full md:w-1/4 text-center md:text-left">
              <h5 class="uppercase mb-6 font-bold">Legal</h5>
              <ul class="mb-4">
                <li class="mt-2">
                  <SimpleLink name="Terms" />
                </li>
                <li class="mt-2">
                  <SimpleLink name="Privacy" />
                </li>
              </ul>
            </div>
            <div class="w-full md:w-1/4 text-center md:text-left">
              <h5 class="uppercase mb-6 font-bold">Social</h5>
              <ul class="mb-4">
                <li class="mt-2">
                  <SimpleLink name="Facebook" />
                </li>
                <li class="mt-2">
                  <SimpleLink name="Instagram" />
                </li>
                <li class="mt-2">
                  <SimpleLink name="Twitter" />
                </li>
              </ul>
            </div>
            <div class="w-full md:w-1/4 text-center md:text-left">
              <h5 class="uppercase mb-6 font-bold">Company</h5>
              <ul class="mb-4">
                <li class="mt-2">
                  <SimpleLink name="About Us" />
                </li>
                <li class="mt-2">
                  <SimpleLink name="Contact" />
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
