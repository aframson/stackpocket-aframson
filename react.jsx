import React, { useRef, useEffect, useState, useCallback } from "react";
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
import { LuCopyCheck } from "react-icons/lu";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { FiCopy } from "react-icons/fi";
import { BsFillCheckCircleFill } from "react-icons/bs";
import ReactLoading from "react-loading";
import { CiNoWaitingSign } from "react-icons/ci";

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



  const OptionTabs = [{ name: "Crypto" }, { name: "Fiat" }, { name: "Momo" }];

  const [activeTab, setActiveTab] = useState("Crypto");
  const [currencies, setCurrencies] = useState([]);
  const [depositLimits, setDepositLimits] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [network, setNetwork] = useState("");
  const [minAmount, setMinAmount] = useState(null);
  const [maxAmount, setMaxAmount] = useState(null);
  const [depositAmount, setDepositAmount] = useState("");
  const [qrCodeData, setQrCodeData] = useState([]);
  const [qrcodeLoading, setQrCodeLoading] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [minival, setMinival] = useState(false);
  const [maxival, setMaxival] = useState(false);


  const handleChange = (option) => {
    let val = option?.value?.toLowerCase();
    setSelectedOption(option);
    setNetwork(option.network);
    if (depositLimits[val]) {
      setMinAmount(depositLimits[val]?.min_amount);
      setMaxAmount(depositLimits[val]?.max_amount);
    } else {
      setMinAmount(null);
      setMaxAmount(null);
    }
  };

  const handleClick = () => {
    setMenuIsOpen(true);
  };

  const handleProceed = async () => {
    setQrCodeLoading(true);
    const payload = {
      price_amount: parseFloat(depositAmount),
      price_currency: "usd",
      pay_currency: selectedOption?.value?.toLowerCase(),
      ipn_callback_url: "https://nowpayments.io",
      order_id: "RGDBP-21314",
      order_description: "Deposite"
    };

      
      const response = await axios.post(
        "https://api.nowpayments.io/v1/payment",
        payload,
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
      console.log("Payment response:", response.data);
      let data = response.data
      
      if(!response){
        console.error("Payment error:", error.message);
        setQrCodeLoading(false);
        setError(true);
      }else{
        if(data.pay_amount < minAmount){
                setMinival(true)
        }else if(data.pay_amount > maxAmount){
                setMaxAmount(true)
        }else{
          setQrCodeData([response.data]);
          setQrCodeLoading(false);
        }
      }
  };



const Odds = () => {
  const [prizeToCalRebate, setPrizeToCalRebate] = useState(99250);
  const [odds, setOdds] = useState(100000);
  const [prizeToCalFullOdds, setPrizeToCalFullOdds] = useState(1);
  const [prizeUnit, setPrizeUnit] = useState(1);

  
  const [activeGame, setActiveGame] = useState("5D");
  const [activeModule, setActiveModule] = useState("Two Sides");

  function calculateRebate() {
    let rebate = (+prizeToCalRebate * 100) / (+odds * 1) - 85;
    console.log(rebate);
    return rebate;
  }

  function calculateOdds() {
    let rebate = calculateRebate();

    const fullOdds = (prizeToCalFullOdds * 100) / (85 + rebate);

    return fullOdds;
  }

  const calculatePrizeUnit = () => prizeUnit / 2;

  const games = ["5D", "11 x 5", "Fast 3", "Mark 6", "3D", "PK 10", "Happy 8"];
  const modules = ["Standard", "Two Sides", "Many Tables"];
  return (
    <div className={styles.container}>
      <div>
        REBATE
        <br />
        <div>prize to calculate rebate</div>
        <input
          onChange={(e: any) => setPrizeToCalRebate(e.target.value)}
        />{" "}
        <br /> <br />
        <div>odds eg.100,000</div>
        
        <input onChange={(e: any) => setOdds(e.target.value)} />
        <br />
        <br />
        <div>prize to calculate full odds</div>
        <input onChange={(e: any) => setPrizeToCalFullOdds(e.target.value)} />
        <br />
        <br />
        {/* <button style={{ background: "red" }}>calculate rebate</button> */}
        <span>
          <h3>REBATE : </h3>
        </span>{" "}
        {calculateRebate()}
        <span>
          <h3>FULL ODDS : </h3>
        </span>{" "}
        {calculateOdds()}
        <br />
        <br />
        <br />
        <div>dividing prize to one unit</div>
        <input onChange={(e: any) => setPrizeUnit(e.target.value)} />
        <br />
        {calculatePrizeUnit()}
      </div>
      <div>
        <div>
          {games.map((item, i) => (
            <button
              key={i}
              style={{
                ...buttonStyles[0],
                backgroundColor: activeGame === item ? "orange" : "#4CAF50",
              }}
              onClick={() => setActiveGame(item)}
            >
              {item}
            </button>
          ))}
          <br />
          {modules.map((item, i) => (
            <button
              key={i}
              style={{
                ...buttonStyles[1],
                backgroundColor: activeModule === item ? "orange" : "#008CBA",
              }}
              onClick={() => setActiveModule(item)}
            >
              {item}
            </button>
          ))}
        </div>

        <div className={styles.tableContainer}>
          <center>
            <h1>
              {activeGame} {activeModule} Odds Information
            </h1>
          </center>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Id</th>
                <th>Odds</th>
              </tr>
            </thead>
            <tbody>
            
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Odds;


