import React from "react";

const ConfirmationModal = ({ handleStatus, modalClose, title }) => {
  return (
    <section>
      <input type="checkbox" id="confirmationPopup" className="modal-toggle" />
      <div className="modal modal-middle">
        <div className="modal-box w-11/12 max-w-[552px]  bg-white px-[64px] pt-[64px] pb-[32px] rounded-3xl">
          <div className="flex flex-col items-center justify-center gap-6">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="150"
              height="150"
              viewBox="0 0 150 150"
              fill="none"
            >
              <path
                opacity="0.4"
                d="M131.75 53.6252V96.375C131.75 103.375 128 109.875 121.938 113.438L84.8127 134.875C78.7502 138.375 71.2501 138.375 65.1251 134.875L28 113.438C21.9375 109.938 18.1875 103.438 18.1875 96.375V53.6252C18.1875 46.6252 21.9375 40.125 28 36.5625L65.1251 15.125C71.1876 11.625 78.6877 11.625 84.8127 15.125L121.938 36.5625C128 40.125 131.75 46.5627 131.75 53.6252Z"
                fill="#FF6B6B"
              />
              <path
                d="M75 85.9375C72.4375 85.9375 70.3125 83.8125 70.3125 81.25V48.4375C70.3125 45.875 72.4375 43.75 75 43.75C77.5625 43.75 79.6875 45.875 79.6875 48.4375V81.25C79.6875 83.8125 77.5625 85.9375 75 85.9375Z"
                fill="#FF6B6B"
              />
              <path
                d="M75 107.812C74.1875 107.812 73.375 107.625 72.625 107.312C71.8125 107 71.1874 106.563 70.5624 106C69.9999 105.375 69.5625 104.687 69.1875 103.937C68.875 103.187 68.75 102.375 68.75 101.562C68.75 99.9374 69.3749 98.3122 70.5624 97.1247C71.1874 96.5622 71.8125 96.125 72.625 95.8125C74.9375 94.8125 77.6876 95.3747 79.4376 97.1247C80.0001 97.7497 80.4374 98.3748 80.7499 99.1873C81.0624 99.9373 81.25 100.75 81.25 101.562C81.25 102.375 81.0624 103.187 80.7499 103.937C80.4374 104.687 80.0001 105.375 79.4376 106C78.2501 107.188 76.6875 107.812 75 107.812Z"
                fill="#FF6B6B"
              />
            </svg>
          </div>
          <div className="text-center">
            <h4 className=" text-errorColor text-4xl font-bold font-poppins ">Delete</h4>
            <p className="text-2xl text-whiteLowEmp mt-2 font-poppins">
              Are you sure to delete this {title}?
            </p>
          </div>
          </div>
          
          <div className="modal-action flex items-center justify-center gap-6 mt-10">
            <label
              htmlFor="confirmationPopup"
              className="btn bg-maincolor hover:bg-maincolor w-52  py-[18px] px-10 rounded-lg capitalize text-white font-semibold font-poppins leading-[19px] h-max"
              data-hs-overlay={modalClose || ""}
            >
              No, Thanks
            </label>
            <label
              htmlFor="confirmationPopup"
              className="btn bg-errorColor  hover:bg-errorColor w-52  py-[18px] px-10 rounded-lg capitalize text-white font-semibold font-poppins leading-[19px] h-max"
              data-hs-overlay={modalClose || ""}
              onClick={handleStatus}
            >
              Yes, Delete
            </label>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConfirmationModal;
