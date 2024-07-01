import React, { useEffect, useState, useCallback } from "react";
import Bounce from "bounce.js";
import { MainStateProvider } from "@/StateContex";
import styles from "./deposite.module.css";
import { IoMdClose } from "react-icons/io";
import axios from "axios";
import Select, { components } from "react-select";
import { motion } from "framer-motion";
import { IoMdArrowRoundForward } from "react-icons/io";
import { LuAlertTriangle } from "react-icons/lu";
import QRCode from "react-qr-code";
import { MdOutlineAttachMoney } from "react-icons/md";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { FiCopy } from "react-icons/fi";
import { BsFillCheckCircleFill } from "react-icons/bs";
import ReactLoading from "react-loading";
import { CiNoWaitingSign } from "react-icons/ci";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { useSession } from "next-auth/react";

const DepositeModal = () => {
  const { depositeModal, setDepositeModal }: any = MainStateProvider();

  useEffect(() => {
    const bounce = new Bounce();
    bounce.scale({
      from: { x: 0, y: 0 },
      to: { x: 1, y: 1 }
    });
    bounce.applyTo(document.querySelectorAll(".customise_modal"));
  }, []);

  const {data:session} = useSession()

  const OptionTabs = [{ name: "Crypto" }, { name: "Fiat" }, { name: "Momo" }];

  const [activeTab, setActiveTab] = useState("Crypto");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [network, setNetwork] = useState("");

  const [depositAmount, setDepositAmount] = useState("");
  const [qrCodeData, setQrCodeData] = useState("");
  const [qrcodeLoading, setQrCodeLoading] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [minival, setMinival] = useState(false);
  const [transactionData, setTransactionData] = useState(null);

  const addressData = [
    {
      id: "TRX",
      // address: "TPGytw6TPXu9btHKzZHd8QcVjJ28wg5rfa", // aframson
      address:"TJMfzRPw5DWYNMWRn9MMR5iFEfv6Lzt7CQ", // randy
    }
  ];

  const createTransaction = async (currencyId, address) => {
    setLoading(true);
    setError(null);
    const ticker = currencyId.toLowerCase()
    const userId = session?.user?.email;
    const email = 'aframson77@gmail.com';
    const callbackUrl = encodeURIComponent(`https://easyopen1573.com/task/crypto/index.php?user_id=${userId}`);
    const apiUrl = `https://api.cryptapi.io/${ticker}/create/?callback=${callbackUrl}&address=${address}&pending=1&confirmations=1&email=${email}&post=1&json=1&priority=default&multi_token=0&convert=1`;

    try {
      const response = await axios.get(apiUrl);
      setTransactionData(response.data);
      setQrCodeData(response.data.address_in);
      setMinival(response.data.minimum_transaction_coin);
      console.log('flowbit', response.data);
    } catch (error) {
      console.log('flowbit',error)
      setError(error.response ? error.response.data : 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (option) => {
    console.log('flowbit',option,addressData)
    setSelectedOption(option);
    setNetwork(option.name);
    const selectedAddress = addressData.find(addr => addr.id === option.id);
    if (selectedAddress) {
      createTransaction(option.id, selectedAddress.address);
    }
  };

  useEffect(() => {
    if (selectedOption) {
      const selectedAddress = addressData.find(addr => addr.id === selectedOption.id);
      if (selectedAddress) {
        createTransaction(selectedOption.id, selectedAddress.address);
      }
    }
  }, [selectedOption]);

  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: "#0e2955",
      color: "#fff",
      borderColor: "#0e2955",
      "&:hover": {
        borderColor: "#143366"
      }
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "#0e2955"
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#fff",
      display: "flex",
      alignItems: "center"
    }),
    input: (provided) => ({
      ...provided,
      color: "#fff",
      height: 35,
      borderRadius: 10,
      padding: 10,
      "&:hover": {
        cursor: "pointer"
      }
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#888"
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "#305899" : "#0e2955",
      color: state.isSelected ? "#fff" : "#ddd",
      "&:hover": {
        backgroundColor: "#143366",
        color: "#fff"
      }
    })
  };

  const SelectCoinData = [
    {
      id: "TRX",
      name: "TRX (TRON)",
      icon: "https://s3.coinmarketcap.com/static/img/portraits/62837c68ab0e763d5f77e9a6.png"
    }
  ];

  const formatOptionLabel = ({ name, icon }) => (
    <div
      style={{ display: "flex", alignItems: "center" }}
    >
      {icon && (
        <img
          src={icon}
          alt={name}
          style={{ width: 20, height: 20, marginRight: 10 }}
        />
      )}
      {name}
    </div>
  );

  const currencyOptions = SelectCoinData.map((currency) => ({
    id: currency.id,
    value: currency.name,
    label: currency.name,
    icon: currency.icon,
  }));

  const SingleValue = (props) => (
    <components.SingleValue {...props}>
      <div
        style={{ display: "flex", alignItems: "center" }}
      >
        {props.data.icon && (
          <img
            src={props.data.icon}
            alt={props.data.label}
            style={{ width: 30, height: 30, marginRight: 10 }}
          />
        )}
        {props.data.value}
      </div>
    </components.SingleValue>
  );

  useEffect(() => {
    if (isCopied) {
      const timer = setTimeout(() => setIsCopied(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [isCopied]);

  const AnimatedMenu = useCallback(
    (props) => (
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
      >
        <components.Menu {...props} />
      </motion.div>
    ),
    []
  );

  function truncateString(str, num) {
    if (str.length <= num) {
      return str;
    }
    return str.slice(0, num) + "...";
  }

  return (
    <>
      <div
        style={{ display: `${depositeModal ? "block" : "none"}` }}
        className="customise_overlay_deposit"
        onClick={() => { }}
      >
        <div className="customise_cover">
          {loading ? (
            <div id={styles.container} className="customise_modal">
              <div style={{ padding: 30 }}>
                <center>
                  <ReactLoading height={50} width={50} />
                </center>
              </div>
            </div>
          ) : error ? (
            <div id={styles.container} className="customise_modal">
              <div id={styles.error} className={styles.coopa}>
                <LuAlertTriangle />
                <div className={styles.netwna}>
                  An Error has occurred while fetching payment data
                </div>
              </div>
            </div>
          ) : (
            <>
              <div id={styles.container} className="customise_modal">
                <div className={styles.overallhed}>
                  <div className={styles.custom_modal_header}>
                    <div className={styles.title_m}>Deposit</div>
                    <div
                      onClick={() => {
                        setDepositeModal(false)

                      }}
                      className={styles.title}
                    >
                      <IoMdClose
                        className={styles.spin_close_icon}
                        size={21}
                        color="#fff"
                      />
                    </div>
                  </div>
                  <div className={styles.optiontabs}>
                    {OptionTabs.map((item, i) => (
                      <div
                        style={{
                          background: activeTab === item.name ? "#1f437e" : "",
                          fontWeight: activeTab === item.name ? "bold" : ""
                        }}
                        key={i}
                        className={styles.tabsitem}
                        onClick={() => {
                          setActiveTab(item.name);
                        }}
                      >
                        {item.name}
                      </div>
                    ))}
                  </div>
                </div>
                {activeTab == "Crypto" ? (
                  <>
                    <div className={styles.coins}>
                      {SelectCoinData.map((currency, i) => (
                        <div
                          style={{
                            border:
                              selectedOption &&
                                selectedOption.name === currency.name
                                ? "1px solid #ffee00"
                                : ""
                          }}
                          key={i}
                          className={styles.surrbox}
                          onClick={() => handleChange(currency)}
                        >
                          <div className={styles.imagebox}>
                            <img
                              src={currency.icon}
                              alt={currency.name}
                              style={{ width: 15, height: 15 }}
                            />
                          </div>
                          <div className={styles.cureencytxt}>
                            {currency.name}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className={styles.morePopup}>
                      <div className={styles.coop}>
                        <div className={styles.netwn}>Select Currency</div>
                        <Select
                          value={currencyOptions as any}
                          onChange={handleChange}
                          options={SelectCoinData}
                          styles={customStyles}
                          placeholder="Select an option..."
                          classNamePrefix="react-select"
                          formatOptionLabel={formatOptionLabel}
                          components={{ Menu: AnimatedMenu, SingleValue }}
                          menuIsOpen={menuIsOpen}
                          onMenuOpen={() => setMenuIsOpen(true)}
                          onMenuClose={() => setMenuIsOpen(false)}
                        />
                      </div>

                    </div>

                    {qrCodeData !== "" ? (
                      <>
                        <div className={styles.minalert}>
                          <MdOutlineAttachMoney size={18} />
                          <div className={styles.netwna}>
                            Minimum Amount to send:
                          </div>
                          {minival}
                        </div>
                      </>
                    ) : null}

                    {qrCodeData !== "" ? (
                      <div className={styles.qrcodecontainer}>
                        <div className={styles.rty}>
                          <div
                            style={{
                              backgroundColor: "white",
                              padding: 5,
                              height: "auto",
                              maxWidth: 256,
                              width: "fit-content",
                              borderRadius: 5
                            }}
                          >
                            <QRCode
                              size={1556}
                              style={{
                                height: "156px",
                                maxWidth: "100%",
                                width: "156px"
                              }}
                              value={qrCodeData}
                            />
                          </div>
                        </div>
                        <div className={styles.rty}>
                          <div className={styles.depad_title}>
                            Deposite Address
                          </div>
                          <div className={styles.grida}>
                            <div className={styles.depad}>
                              {qrCodeData}
                            </div>
                            <CopyToClipboard
                              text={qrCodeData && qrCodeData}
                              onCopy={() => setIsCopied(true)}
                            >
                              <button className={styles.copy}>
                                {isCopied ? (
                                  <span>
                                    {" "}
                                    <BsFillCheckCircleFill size={23} />{" "}
                                  </span>
                                ) : (
                                  <FiCopy size={23} />
                                )}
                              </button>
                            </CopyToClipboard>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className={styles.ne4contain}>
                        {depositAmount === "" ? null : (
                          <button
                            className={styles.nextbutt}
                          >
                            <div className={styles.txtt}>
                              Proceed to Next Step
                            </div>
                            {qrcodeLoading ? (
                              <div>
                                <ReactLoading
                                  type="spin"
                                  height={20}
                                  width={20}
                                />
                              </div>
                            ) : (
                              <IoMdArrowRoundForward color="white" size={20} />
                            )}
                          </button>
                        )}
                      </div>
                    )}
                    {selectedOption && (
                      <div className={styles.notice}>
                        <IoMdInformationCircleOutline size={24} />
                        <div className={styles.trttc}>
                          Send only {selectedOption && selectedOption.label} to this deposit address. Coins will be deposited automatically after 6 network confirmations.
                        </div>
                      </div>
                    )}
                  </>
                ) : null}
                {activeTab == "Fiat" ?
                  <div className={styles.coming}>
                    <center>
                      <CiNoWaitingSign size={40} />
                      <div className={styles.comming_soon}>
                        Coming Soon
                      </div>
                    </center>
                  </div> : null}
                {activeTab == "Momo" ? <div className={styles.coming}>
                  <center>
                    <CiNoWaitingSign size={40} />
                    <div className={styles.comming_soon}>
                      Coming Soon
                    </div>
                  </center>
                </div> : null}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default DepositeModal;
